export interface AuthUser {
    id: string;
    email: string;
    name?: string;
  }
  
  export interface AuthResult {
    success: boolean;
    message: string;
    user?: AuthUser;
  }

  export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    role: 'student' | 'teacher';
  }