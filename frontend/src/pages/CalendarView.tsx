import { useNavigate, useParams } from 'react-router-dom';

import { CalendarHeader } from '../components/calendar/CalendarHeader'
import { FullCalendarComponent } from '../components/calendar/FullCalendarComponent';
import { useCalendarDetails } from '../hooks/useCalendarDetails';
import { useRef } from 'react';

export const CalendarView = () => {
  const { calendarId } = useParams<{ calendarId: string }>();
  const calendarRef = useRef(null);

  if (!calendarId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Calendar not found</div>
      </div>
    );
  }
  const navigate = useNavigate();
  
  const { calendar, error, loading, refetch } = useCalendarDetails(calendarId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading calendar...</div>
      </div>
    );
  }

  if (!calendar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  const handleDateClick = (arg: any) => {
    console.log('Date clicked: ', arg.dateStr);
  }

  // const handleEventClick = (arg: any) => {
  //   console.log('Event clicked: ', arg.event.id);
  // }

  const handleBack = () => {
    navigate('home');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader
        calendar={calendar}
        onBack={handleBack}
      ></CalendarHeader>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></main>
        <FullCalendarComponent
          ref={calendarRef}
          onDateClick={handleDateClick}
        ></FullCalendarComponent>
    </div>
  );
};