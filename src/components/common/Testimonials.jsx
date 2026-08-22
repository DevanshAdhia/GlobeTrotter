import React from 'react';
import Container from './Container';
import SectionHeader from './SectionHeader';
import { testimonials } from '../../data/testimonials';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  
  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <SectionHeader eyebrow="Testimonials" title="What Our Travellers Say" />
          <div className="flex gap-2 mb-2">
            <button aria-label="Previous testimonials" onClick={scrollPrev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
            <button aria-label="Next testimonials" onClick={scrollNext} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((t) => (
              <div key={t.id} className="flex-none w-full sm:w-1/2 lg:w-1/3 pl-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="flex text-accent mb-4">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-700 italic flex-1 mb-6 text-lg">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-bold text-gray-900">{t.name}</h4>
                      <span className="text-sm text-primary font-medium">{t.trip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Testimonials;