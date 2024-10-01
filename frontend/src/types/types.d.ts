export {};

declare global {
  export type User = {
    user_id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    username: string;
    email: string;
    phone_no?: string;
    address?: string;
    profile_img?: string;
    gender?: string;
    role?: string;
    company?: string;
    department?: string;
    position?: string;
  };

  export type Company = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  };

  export type Department = {
    id: number;
    name: string;
    company_id: number;
    companies: { 
      id: number
      name: string
    }
  }

  export type AppNotification = {
    id: number;
    message: string;
    notification_type?: string;
    link?: string;
    seen?: boolean;
    read_status?: boolean;
    created_at?: string;
  }
}