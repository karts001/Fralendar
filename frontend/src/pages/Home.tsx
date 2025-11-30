import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCalendars } from "../hooks/useCalendars";
import { useCreateCalendar } from "../hooks/useCreateCalendar";
import { authService } from "../services/authService";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { PageHeader } from "../components/dashboard/PageHeader";
import { CalendarGrid } from "../components/dashboard/CalendarGrid";
import { CreateCalendarModal } from "../components/dashboard/CreateCalendarModal";
import { ErrorAlert } from "../components/common/ErrorAlert";
import type { CreateCalendarDTO } from "../types/calendar";


export default function Home() {
  const [user, setUser] = useState<any>(null);
  const { calendars, loading, error, refetch } = useCalendars();
  const { createCalendar, isCreating, error: createError} = useCreateCalendar(async () => {
    setShowCreateModal(false);
    setNewCalendar({name: '', description: ''});
    await refetch();
  })
  const [newCalendar, setNewCalendar] = useState<CreateCalendarDTO>({ name: '', description: '' });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();

  const handleCreateCalendar = async () => {
    if (!newCalendar.name.trim()) return;

    try {
      await createCalendar(newCalendar);
      navigate('/');
    } catch(error) {
      // error is handled by the hook
    } finally {
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader onCreateClick={() => setShowCreateModal(true)} />
        { error && (<ErrorAlert message={error} />) }
        <CalendarGrid
          calendars={calendars}
          onCalendarClick={(calendarId) => navigate(`/calendar/${calendarId}`)}
          onCreateClick={() => setShowCreateModal(true)}
        />
      </main>
      {showCreateModal && (
        <CreateCalendarModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCalendar}
          calendar={newCalendar}
          onChange={setNewCalendar}
          isCreating={isCreating}
          error={null}
        />
      )}
    </div>
  );
}