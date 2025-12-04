import type React from "react";
import type { CreateEventDTO, EventFormData } from "../../types/event.types";
import { useState, useEffect } from "react";
import { Loader2, Calendar } from "lucide-react";
import { ErrorAlert } from "./shared/ErrorAlert";
import { ModalWrapper } from "./shared/ModalWrapper";
import { EventFormFields } from "./shared/EventFormsField";
import { getDefaultEventTimes, validateEventTimes } from "../../utils/eventHelpers";

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

  const [formData, setFormData] = useState<EventFormData>(() => {
    const {start, end} = getDefaultEventTimes(selectedDate);
    return {
      title: '',
      description: '',
      start: start,
      end: end
    };
  });

  const [validationError, setValidationError] = useState<string | null>();

  // Update times when selectedDate data changes
  useEffect(() => {
    if (selectedDate) {
      const {start, end} = getDefaultEventTimes();
      setFormData(prev => ({
        ...prev,
        start,
        end
      }));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!isOpen) {
      const {start, end} = getDefaultEventTimes();
      setFormData({
        title: '',
        description: '',
        start: start,
        end: end
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const timeError = validateEventTimes(formData.start, formData.end);
  if (timeError) {
    setValidationError(timeError);
    return;
  }

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

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Create Event" maxWidth="md">
      <EventFormFields
        formData={formData}
        onChange={handleChange}
        disabled={isCreating}
      />

      <ErrorAlert message={validationError || error} />

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
    </ModalWrapper>
  )
}