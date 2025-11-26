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

export interface CalendarDetails {
  id: string;
  name: string;
  createdAt: Date;
  adminId: string;

  // Counts
  memberCount: number;
  eventCount: number;

  // Admin info
  admin: {
    id: string,
    email: string,
    displayName?: string
  };

  // Members list
  members: CalendarMember[];
}

export interface CalendarMember {
  id: string;
  userId: string;
  calendarId: string;
  

}