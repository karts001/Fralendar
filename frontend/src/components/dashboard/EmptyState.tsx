import { Calendar, Plus } from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
  onCreateClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => (
  <div className="text-center py-12">
    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No calendars yet</h3>
    <p className="text-gray-600 mb-6">Create your first calendar to get started</p>
    <button
      onClick={onCreateClick}
      className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Plus className="w-5 h-5" />
      <span>Create Calendar</span>
    </button>
  </div>
)