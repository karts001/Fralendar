import React from 'react';

import type { CalendarDetails } from '../../types/calendar';
import { ArrowLeft, Plus, Users } from 'lucide-react';

interface CalendarHeaderProps {
  calendar: CalendarDetails;
  onBack: () => void;
  onCreateEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  calendar,
  onBack,
  onCreateEvent,
}) => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Left section - Back button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Center section - Calendar name and member count */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {calendar.name}
          </h1>
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{calendar.memberCount} members</span>
          </div>
        </div>

        {/* Right section - New Event button */}
        <button
          onClick={onCreateEvent}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Event</span>
        </button>
      </div>
    </div>
  </div>
);

