import React from 'react';

import type { CalendarDetails } from '../../types/calendar';
import { ArrowLeft, Plus } from 'lucide-react';

interface CalendarHeaderProps {
  calendar: CalendarDetails;
  onBack: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  calendar,
  onBack,
}) => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{calendar.name}</h1>
            <p className="text-sm text-gray-600">
              {calendar.memberCount || 0} members
            </p>
          </div>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Event</span>
        </button>
      </div>
    </div>
  </div>
);

