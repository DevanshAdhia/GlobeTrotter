from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, JSON, String, Text, func
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class Report(Base, TimestampMixin):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    reporter_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    entity_type = Column(String(50), nullable=False)  # user | trip | activity | review
    entity_id = Column(Integer, nullable=False)
    reason = Column(Text, nullable=False)
    status = Column(String(20), nullable=False, default="pending")  # pending | resolved | dismissed

    __table_args__ = (
        Index("ix_reports_status_created", "status", "created_at"),
        Index("ix_reports_entity", "entity_type", "entity_id"),
    )

    # Relationships
    reporter = relationship("User", back_populates="reports")


class AdminActivityLog(Base):
    __tablename__ = "admin_activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(50), nullable=True)
    entity_id = Column(Integer, nullable=True)
    metadata_json = Column("metadata", JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    admin = relationship("User")
