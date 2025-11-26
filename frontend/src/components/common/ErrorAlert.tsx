import React from 'react';

interface ErrorAltertProps {
  message: string | null;
}

export const ErrorAlert: React.FC<ErrorAltertProps> = ({ message }) => (
  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
    {message}
  </div>
)
