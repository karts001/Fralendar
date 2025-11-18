import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Loader2, Plus} from "lucide-react";

import { useCalendars } from "../hooks/useCalendars";
import { authService } from "../services/authService";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { PageHeader } from "../components/dashboard/PageHeader";
import { CalendarGrid } from "../components/dashboard/CalendarGrid";
import { CreateCalendarModal } from "../components/dashboard/CreateCalendarModal";
import type { CreateCalendarDTO } from "../types/calendar";


export default function Home() {
  const [user, setUser] = useState<any>(null);
  const { calendars, loading, error, loadCalendars, createCalendar } = useCalendars();
  const [newCalendar, setNewCalendar] = useState<CreateCalendarDTO>({ name: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();

  const handleCreateCalendar = async () => {
    if (!newCalendar.name.trim()) return;
    setCreating(true);

    try {
      await createCalendar(newCalendar);
      setShowCreateModal(false);
      setNewCalendar({ name: "", description: "" });
      navigate('/');
    } catch(error) {
      // error is handled by the hook
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <DashboardHeader user={user} onLogout={handleLogout} />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader onCreateClick={() => setShowCreateModal(true)} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Calendars Grid */}
        <CalendarGrid
          calendars={calendars}
          onCalendarClick={(calendarId) => navigate(`/calendar/${calendarId}`)}
          onCreateClick={() => setShowCreateModal(true)}
        />
      </main>

      {/* Create Calendar Modal */}
      {showCreateModal && (
        <CreateCalendarModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCalendar}
          calendar={newCalendar}
          onChange={setNewCalendar}
          isCreating={creating}
          error={null}
        />
      )}
    </div>
  );
}