export type EventStatus = "upcoming" | "ongoing" | "cancelled" | "completed";

export interface EventSchedule {
  date: string;     
  startTime: string; 
  endTime: string;  
}

export interface Event {
  _id: string;
  image: string;
  title: string;
  status: string;          
  pricePerTicket: number;
  totalTicket: number;
  isActive: boolean;
  eventSchedule: EventSchedule[]; 
}