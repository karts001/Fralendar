import React from 'react';
import { Calendar, Users } from 'lucide-react';
import type { CalendarType } from '../../types/calendar';

interface CalendarCardProps {
  calendar: CalendarType;
  onClick: (calendarId: string) => void;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({ calendar, onClick }) => (

  <div
    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => onClick(calendar.id)}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{calendar.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(calendar.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
    {calendar.description && (
      <p className="text-sm text-gray-600 mb-4">{calendar.description}</p>
    )}
    <div className="flex items-center text-sm text-gray-500">
      <Users className="w-4 h-4 mr-2" />
      <span>{calendar.memberCount || 0} members</span>
    </div>
  </div>
);
  
