import type React from "react";
import type { CreateEventDTO } from "../../types/event.types";
import { useState, useEffect } from "react";
import { X, Clock, Loader2, Calendar } from "lucide-react";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: CreateEventDTO) => Promise<void>;
  calendarId: string;
  selectedDate?: Date;
  isCreating?: boolean;
  error: string | null;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  calendarId,
  selectedDate,
  isCreating,
  error
}) => {
  // Get default times
  const getDefaultTimes = () => {
    const base = selectedDate ? new Date(selectedDate.getTime()): new Date();

    const start = new Date(base);

    // Round to next hour
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() + 1);

    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    return {
      start: start.toISOString().slice(0,16),
      end: end.toISOString().slice(0,16)
    };
  };

  const [formData, setFormData] = useState(() => {
    const {start, end} = getDefaultTimes();
    return {
      title: '',
      description: '',
      start: start,
      end: end
    };
  });

  // Update times when selectedDate data changes
  useEffect(() => {
    if (selectedDate) {
      const {start, end} = getDefaultTimes();
      setFormData(prev => ({
        ...prev,
        start,
        end
      }));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!isOpen) {
      const {start, end} = getDefaultTimes();
      setFormData({
        title: '',
        description: '',
        start: start,
        end: end
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;

    try {
      await onSubmit({
        title: formData.title,
        description: formData.description,
        startTime: formData.start,
        endTime: formData.end,
        calendarId 
      });

      onClose();

    } catch(error) {
      console.error('Submit failed: ', error);
    }
  };

  // Validate dates
  const start = new Date(formData.start);
  const end = new Date(formData.end);

  // if (start > end) {
  //   alert('End time msut be after start time');
  //   return;
  // }



  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Create Event</h3>
          <button
            onClick={onClose}
            disabled={isCreating}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              id="event-title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Team Meeting"
              disabled={isCreating}
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="event-description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
              placeholder="Discuss Q4 goals and strategy..."
              disabled={isCreating}
            />
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="event-start" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Start Time *
              </div>
            </label>
            <input
              id="event-start"
              type="datetime-local"
              value={formData.start}
              onChange={(e) => handleChange('start', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isCreating}
            />
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="event-end" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                End Time *
              </div>
            </label>
            <input
              id="event-end"
              type="datetime-local"
              value={formData.end}
              onChange={(e) => handleChange('end', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isCreating}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              disabled={isCreating}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isCreating || !formData.title.trim()}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Event
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}