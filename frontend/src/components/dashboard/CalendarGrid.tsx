import React from 'react';

import type { CalendarType } from '../../types/calendar';
import { EmptyState } from './EmptyState';
import { CalendarCard } from './CalendarCard';


interface CalendarGridProps {
  onCalendarClick: (calendarId: string) => void;
  onCreateClick: () => void;
  calendars: CalendarType[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  calendars,
  onCalendarClick,
  onCreateClick,
}) => {

  if (calendars.length === 0) {
    return <EmptyState onCreateClick={onCreateClick} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {calendars.map((calendar) => (
        <CalendarCard
          key={calendar.id}
          calendar={calendar}
          onClick={onCalendarClick}
        />
      ))}
    </div>
  );
}