import { Plus } from 'lucide-react';
import React from 'react';

interface PageHeaderProps {
  onCreateClick: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onCreateClick }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">My Calendars</h2>
      <p className="text-gray-600 mt-1">Manage and view all your calendars</p>
    </div>
    <button
      onClick={onCreateClick}
      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Plus className="w-5 h-5" />
      <span>New Calendar</span>
    </button>
  </div>
);
