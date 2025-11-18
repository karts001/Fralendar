import React from 'react';
import { Calendar, LogOut } from 'lucide-react';
import type { User } from '../../types/user.types';

interface DashboardHeaderProps {
  user?: User | null;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout }) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Calendar className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Fralendar</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </header>
);