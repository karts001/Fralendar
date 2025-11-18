export interface CalendarType {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  adminId: string;
  memberCount?: number;
}

export interface CreateCalendarInput {
  name: string;
  description?: string;
}

export interface CreateCalendarDTO {
  name: string;
  description?: string;
}