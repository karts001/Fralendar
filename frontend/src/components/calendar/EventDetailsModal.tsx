import { useState } from "react";
import type { EventFormData, EventType } from "../../types/event.types";
import { formatEventDate, formatEventTime, getDefaultEventTimes, getEventDuration } from "../../utils/eventHelpers";
import { ModalWrapper } from "./shared/ModalWrapper";
import { EventFormFields } from "./shared/EventFormsField";
import { ErrorAlert } from "../common/ErrorAlert";
import { Clock, User, Users, Edit2, Trash2 } from "lucide-react";
import { eventService } from "../../services/eventService";

interface EventDetailsModalProps {
  isOpen: boolean;
  event: EventType;
  selectedDate?: Date;
  onClose: () => void;
  // onUpdate: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  event,
  selectedDate,
  // onUpdate,
  onClose,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editForm, setEditForm] = useState<EventFormData>(() => {
    const { start, end } = getDefaultEventTimes(selectedDate);
    return {
      title: event.title,
      description: event.description,
      start: start,
      end: end
    };
  });

  const handleDelete = async() => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    console.log(event.id);

    try {
      setIsDeleting(true);
      setError(null);
      await eventService.deleteEvent(event.id);
      onDelete();
    } catch(error: any) {
      setError(error instanceof Error ? error.message : 'Failed to delete event');
      setIsDeleting(false);
    }
  }

  const handleUpdate = async() => {
    console.log('placeholder');
  }

  const handleCancelEdit = async() => {
    const { start, end } = getDefaultEventTimes(selectedDate);
    setIsEditing(false);
    setEditForm({
      title: event.title,
      description: event.description,
      start,
      end
    });
    setError(null);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleCancelEdit} title={isEditing ? "Edit Event: " : event.title} maxWidth="2xl">
      {isEditing ? (
        <>
          <EventFormFields
            formData={editForm}
            onChange={(field, value) => setEditForm(prev => ({ ...prev, [field]: value }))}
          />
          <ErrorAlert message={error} />
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleCancelEdit}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={!editForm.title.trim()}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </>
      ) : (
        <>
          {event.description && (
            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {/* Time */}
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">{formatEventDate(new Date(event.startTime).toISOString().slice(0,16))}</div>
                <div className="text-gray-600">
                  {formatEventTime(new Date(event.startTime).toISOString().slice(0,16))} - {formatEventTime(new Date(event.endTime).toISOString().slice(0,16))}
                  <span className="text-gray-400 ml-2">{getEventDuration(new Date(event.startTime).toISOString().slice(0,16), new Date(event.endTime).toISOString().slice(0,16))}</span>
                </div>
              </div>
            </div>

            {/* Created By */}
            {event.createdBy && (
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div className="text-gray-600">
                  Created by <span className="font-medium text-gray-900">
                    {event.createdBy.displayName || event.createdBy.email}
                  </span>
                </div>
              </div>
            )}

            {/* Attendees */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-start">
                <Users className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-2">
                    {event.attendees.length} {event.attendees.length === 1 ? 'Attendee' : 'Attendees'}
                  </div>
                  <div className="space-y-1">
                    {event.attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center text-sm text-gray-600">
                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-indigo-600">
                            {(attendee.user.displayName || attendee.user.email).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {attendee.user.displayName || attendee.user.email}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          { error && (<ErrorAlert message={error} />) }
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </>
      )}      
    </ModalWrapper>
  )
}