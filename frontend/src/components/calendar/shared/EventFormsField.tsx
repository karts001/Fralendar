import type React from "react";
import type { EventFormData } from "../../../types/event.types";
import { Clock } from "lucide-react";

interface EventFormFieldsProps {
  formData: EventFormData
  onChange: (field: keyof EventFormData, value: string) => void;
  disabled?: boolean;
}

export const EventFormFields: React.FC<EventFormFieldsProps> = ({
  formData,
  onChange,
  disabled
}) => {
  return (
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
          onChange={(e) => onChange('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Team Meeting"
          disabled={disabled}
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
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={3}
          placeholder="Discuss Q4 goals and strategy..."
          disabled={disabled}
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
          onChange={(e) => onChange('start', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={disabled}
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
          onChange={(e) => onChange('end', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={disabled}
        />
      </div>
    </div>
  );
}