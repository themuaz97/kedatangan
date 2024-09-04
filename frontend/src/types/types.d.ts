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
}