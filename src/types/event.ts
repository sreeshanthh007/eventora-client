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
  qrCode:string;
  totalTicket: number;
  isActive: boolean;
  eventSchedule: EventSchedule[]; 
}



export interface IEditEventInformation {
  title: string;
  description: string;
  eventSchedule: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  pricePerTicket: number;
  totalTicket: number;
  maxTicketPerUser: number;
  tickets: Array<{
    ticketType: string;
    price: number;
    totalTickets: number;
    maxTicketsPerUser: number;
  }>;
  eventLocation: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  }
  Images: File[] | string[];          // Support both File objects and string URLs

}


export type TEditableEventFields = Partial<
  Pick<
    IEditEventInformation,
    | "title" 
    | "description" 
    | "eventSchedule"
    | "pricePerTicket" 
    | "totalTicket" 
    | "maxTicketPerUser"
    | "tickets"
    | "eventLocation" 
    | "location" 
    | "Images"
       
  >
>;

