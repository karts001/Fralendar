import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  message: string | null;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message
}) => {
  return (
    <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg flex items-start">
      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}