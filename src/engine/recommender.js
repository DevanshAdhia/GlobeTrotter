/**
 * engine/recommender.js
 * Client-side recommendation scoring engine.
 * Ranks catalogue items based on the user's full trip context.
 */

import { allItems } from '../data/ai/catalogue';

const WEIGHTS = {
  destination:   1.0,   // hard filter — only items for this destination
  interest:      0.35,
  travelStyle:   0.25,
  groupSuit:     0.20,
  budget:        0.15,
  popularity:    0.05,
};

/**
 * Score a single item against the trip context.
 * Returns a 0–1 score and a list of matched reasons.
 */
function scoreItem(item, ctx) {
  const { interests = [], travelStyle, group, budgetPP, likedIds = [], skippedIds = [] } = ctx;

  // Hard skip if already skipped or the item is irrelevant
  if (skippedIds.includes(item.id)) return null;

  let score = 0;
  const matchReasons = [];

  // Interest match
  const interestHits = (item.tags || []).filter(t => interests.includes(t));
  if (interestHits.length > 0) {
    const interestScore = Math.min(interestHits.length / Math.max(interests.length, 1), 1);
    score += interestScore * WEIGHTS.interest;
    matchReasons.push(...interestHits.slice(0, 2));
  }

  // Travel style match
  if (travelStyle && (item.travelStyles || []).includes(travelStyle)) {
    score += WEIGHTS.travelStyle;
    matchReasons.push(travelStyle);
  }

  // Group suitability
  if (group && (item.suitableFor || []).includes(group)) {
    score += WEIGHTS.groupSuit;
  }

  // Budget fit (price per person)
  if (budgetPP !== undefined && item.pricePP !== undefined) {
    if (item.pricePP <= budgetPP) {
      score += WEIGHTS.budget;
    } else if (item.pricePP > budgetPP * 1.5) {
      score -= 0.1; // penalty for significantly over budget
    }
  } else {
    score += WEIGHTS.budget; // no budget set → no penalty
  }

  // Popularity (mild bonus, not dominant)
  score += ((item.popularity || 0) / 100) * WEIGHTS.popularity;

  // Boost for liked similar items
  const likedItems = allItems.filter(i => likedIds.includes(i.id));
  const likedTags  = new Set(likedItems.flatMap(i => i.tags || []));
  const likedHits  = (item.tags || []).filter(t => likedTags.has(t)).length;
  if (likedHits > 0) score += likedHits * 0.04;

  return { item, score: Math.min(Math.max(score, 0), 1), matchReasons: [...new Set(matchReasons)] };
}

/**
 * generateRecommendations
 * Returns an object of named sections, each with ranked scored items.
 */
export function generateRecommendations(ctx) {
  const { destinationSlug, skippedIds = [], likedIds = [], savedIds = [] } = ctx;

  // Filter to destination only
  const pool = allItems.filter(item =>
    item.destinationSlug === destinationSlug &&
    !skippedIds.includes(item.id)
  );

  // Score all
  const scored = pool
    .map(item => scoreItem(item, ctx))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  const bestMatches = scored.slice(0, 6);

  const hiddenGems = scored
    .filter(s => s.item.hiddenGem)
    .slice(0, 4);

  const budgetFriendly = scored
    .filter(s => s.item.budgetFriendly && s.item.pricePP <= (ctx.budgetPP ?? Infinity))
    .slice(0, 4);

  const popular = scored
    .filter(s => (s.item.popularity || 0) >= 75)
    .sort((a, b) => (b.item.popularity || 0) - (a.item.popularity || 0))
    .slice(0, 4);

  // Must-visit = high rating + high popularity
  const mustVisit = scored
    .filter(s => s.item.rating >= 4.5 && (s.item.popularity || 0) >= 75)
    .slice(0, 4);

  return { bestMatches, hiddenGems, budgetFriendly, popular, mustVisit, all: scored };
}

/**
 * generateWhyThis
 * Returns a natural-language explanation for a recommendation.
 */
export function generateWhyThis(item, ctx) {
  const { interests = [], travelStyle, group, destinationSlug } = ctx;
  const matchedTags = (item.tags || []).filter(t => interests.includes(t));

  const lines = [];

  if (matchedTags.length > 0) {
    lines.push(`You selected ${joinNatural(matchedTags.slice(0, 3))}, and this is a great match.`);
  }

  if (travelStyle && (item.travelStyles || []).includes(travelStyle)) {
    lines.push(`It suits your ${travelStyle.toLowerCase()} travel style perfectly.`);
  }

  if (group && (item.suitableFor || []).includes(group)) {
    lines.push(`This works especially well for ${group.toLowerCase()} trips.`);
  }

  if (item.hiddenGem) {
    lines.push('This is a lesser-known gem that most tourists miss.');
  }

  if (item.rating >= 4.7) {
    lines.push(`Rated ${item.rating} ⭐ — travellers consistently love it.`);
  }

  if (lines.length === 0) {
    lines.push(`A well-rated ${item.category.toLowerCase()} experience in ${destinationSlug}.`);
  }

  return lines.slice(0, 2).join(' ');
}

function joinNatural(arr) {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`;
}
