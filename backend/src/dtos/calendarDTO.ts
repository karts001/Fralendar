export interface CalendarDTO {
  id: string;
  name: string;
  adminId: string;
  adminName: string | null;
  createdAt: Date;
  memberCount: number;
  eventCount: number;
}

export interface CalendarDetailsDTO {
  id: string;
  adminId: string;
  name: string;
  createdAt: Date;
}
