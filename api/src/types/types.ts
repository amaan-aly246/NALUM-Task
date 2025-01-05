export type AuthResponse = {
    success: boolean; 
    token?: string;
    message: string;
  };
  

export type User = {
  name : string,
  email: string,
}