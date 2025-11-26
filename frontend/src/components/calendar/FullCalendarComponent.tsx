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


interface FullCalendarComponentProps {
  ref: React.RefObject<any>;
  onDateClick: (arg: any) => void;
  // onEventClick: (arg: any) => void;
}

export const FullCalendarComponent: React.FC<FullCalendarComponentProps> = ({onDateClick}) => {
  const calendarRef = useRef<FullCalendar>(null);
  
  const handleDateClick = (arg:any) => {
    onDateClick(arg.dateStr);
  }

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