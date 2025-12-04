import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Import css files
import '@fullcalendar/core';
import '@fullcalendar/daygrid';
import '@fullcalendar/timegrid';
import '../../styles/fullcalendar-custom.css';
import type { EventType } from '../../types/event.types';


interface FullCalendarComponentProps {
  ref: React.RefObject<any>;
  events: EventType[];
  onDateClick: (arg: any) => void;
  onEventClick: (event: EventType) => void;
  onEventDelete?: (eventId: string) => void;
}

export const FullCalendarComponent: React.FC<FullCalendarComponentProps> = (
  {
    events,
    onDateClick,
    onEventClick,
    onEventDelete,
  }) => {
  const calendarRef = useRef<FullCalendar>(null);
  
  const handleDateClick = (arg:any) => {
    const date = new Date(arg.dateStr);
    onDateClick(date);
  }

  const handleEventClick = (info: any) => {
    const eventId = info.event.id;
    const originalEvent = events.find(e => e.id === eventId);

    if (originalEvent) {
      onEventClick(originalEvent);
    } else {
      console.error('Error event not found');
    }
  }

  const handleEventDelete = (info: any) => {
    if (onEventDelete) {
      const eventId = info.event.id;
      onEventDelete(eventId);
    }
  }
  // Transform EventType into FullCalendar format
  const fullCalendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.startTime,
    end: event.endTime,
    extendedProps: {
      description: event.description,
      calendarId: event.calendarId,
      createdById: event.createdById
    }
  }));


  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={fullCalendarEvents}
        eventClick={handleEventClick}
        eventRemove={handleEventDelete}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        dateClick={handleDateClick}
        height="auto"
        nowIndicator={true}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
      >
      </FullCalendar>
    </div>
  );
};