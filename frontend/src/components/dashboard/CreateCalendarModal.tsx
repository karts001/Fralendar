import React from 'react';
import { Loader2 } from 'lucide-react';
import type { CreateCalendarDTO } from '../../types/calendar';

interface CreateCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendar: CreateCalendarDTO;
  onChange: (data: CreateCalendarDTO) => void;
  onSubmit: () => void;
  isCreating: boolean;
  error?: string | null;
}

export const CreateCalendarModal: React.FC<CreateCalendarModalProps> = ({
  isOpen,
  onClose,
  calendar,
  onChange,
  onSubmit,
  isCreating,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Calendar</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700 mb-2">
              Calendar Name *
            </label>
            <input
              id="calendar-name"
              type="text"
              value={calendar.name}
              onChange={(e) => onChange({ ...calendar, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Family Calendar"
              disabled={isCreating}
            />
          </div>
          <div>
            <label htmlFor="calendar-description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="calendar-description"
              value={calendar.description}
              onChange={(e) => onChange({ ...calendar, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
              placeholder="A calendar for family events and gatherings"
              disabled={isCreating}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            disabled={isCreating}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isCreating || !calendar.name.trim()}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              'Create'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}