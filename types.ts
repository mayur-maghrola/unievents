
export interface User {
  email: string;
  fullName?: string;
  institute?: string;
  department?: string;
  enrollmentId?: string;
  registrationCompleted: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  registrationLimit?: number;
  registrationDeadline?: string;
  createdBy: string; // email of the creator
  registeredCount: number;
}

export interface Registration {
  id: string;
  eventId: string;
  userEmail: string;
  registeredAt: string;
}

export type Page = 'landing' | 'login' | 'register-step-1' | 'otp-verification' | 'register-step-2' | 'dashboard' | 'all-events' | 'my-registered-events' | 'my-events' | 'create-event' | 'edit-event';
