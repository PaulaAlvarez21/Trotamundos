// Entidades del dominio (siguiendo modelo mínimo del plan)
export enum TripStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum ReservationType {
  FLIGHT = 'FLIGHT',
  HOTEL = 'HOTEL',
  CAR = 'CAR',
  TRAIN = 'TRAIN',
  BUS = 'BUS',
  OTHER = 'OTHER',
}

export enum ReservationStatus {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
}

export enum ReservationSource {
  MANUAL = 'MANUAL',
  EMAIL = 'EMAIL',
  PROVIDER = 'PROVIDER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  agency_preference_id?: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: TripStatus;
}

export interface Reservation {
  id: string;
  tripId: string;
  userId: string;
  type: ReservationType;
  provider: string;
  bookingRef: string;
  status: ReservationStatus;
  startAt: Date;
  endAt: Date;
  rawData?: any;
  source: ReservationSource;
}

export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  body: string;
  receivedAt: Date;
  userId: string;
}

export interface ItineraryShare {
  id: string;
  tripId: string;
  ownerId: string;
  token: string;
  expiresAt: Date;
  allowedEmails?: string[];
}

export interface Conversation {
  id: string;
  userId: string;
  sessionId: string;
  messages: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'bot';
  content: string;
  intent?: string;
  payload?: any;
  createdAt: Date;
}

export interface DomainEventLog {
  id: string;
  type: string;
  payload: any;
  occurredAt: Date;
}
