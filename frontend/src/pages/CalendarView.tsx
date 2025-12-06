import { useNavigate, useParams } from 'react-router-dom';

import { CalendarHeader } from '../components/calendar/CalendarHeader'
import { FullCalendarComponent } from '../components/calendar/FullCalendarComponent';
import { useCalendarDetails } from '../hooks/useCalendarDetails';
import { useRef, useState } from 'react';
import { useCreateEvents } from '../hooks/useCreateEvent';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import type { CreateEventDTO, EventType } from '../types/event.types';
import { CreateEventModal } from '../components/calendar/CreateEventModal';
import { EventDetailsModal } from '../components/calendar/EventDetailsModal';

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
  
  const { calendar, error: calendarError, loading: calendarLoading  } = useCalendarDetails(calendarId);
  const { events, loading: eventsLoading, refetch} = useCalendarEvents(calendarId);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventDetailsModal, setShowEventsDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  // Create event hook
  const { createEvent, isCreating, error: createError } = useCreateEvents(() => {
    console.log('Event creation error: ', createError);
    setShowCreateModal(false);
    refetch(); // Refresh events after creation
  });

  // Loading state
  const loading = calendarLoading || eventsLoading;
  // const error = calendarError || eventsError;

  // Handlers
  const handleBack = () => {
    navigate('/');
  };

  const handleCreateEventClick = () => {
    setSelectedDate(undefined);
    setShowCreateModal(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowCreateModal(true);
  };

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setShowEventsDetailsModal(true);
  };

  const handleCreateEventSubmit = async (eventData: CreateEventDTO) => {
    createEvent(eventData);
    refetch();
  };

  const handleEventDelete = async () => {
    setShowEventsDetailsModal(false);
    setSelectedEvent(null);
    refetch();
  }

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
        <div className="text-red-600">{calendarError}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader
        calendar={calendar}
        onCreateEvent={handleCreateEventClick}
        onBack={handleBack}
      ></CalendarHeader>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></main>
        <FullCalendarComponent
          ref={calendarRef}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}

        ></FullCalendarComponent>

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateEventSubmit}
          calendarId={calendarId}
          selectedDate={selectedDate}
          isCreating={isCreating}
          error={createError}
        ></CreateEventModal>

        {/* Event details Modal */}
        {selectedEvent && (
          <EventDetailsModal
            isOpen={showEventDetailsModal}
            event={selectedEvent}
            onClose={() => setShowEventsDetailsModal(false)}
            onDelete={handleEventDelete}
          />
        )}
    </div>
  );
};