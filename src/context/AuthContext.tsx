import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
  avatar: string;
  phone: string;
  location: string;
  bio: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  register: (newUser: Omit<User, 'id'>) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'teacher@edu.com',
      password: 'teacher123',
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      phone: '1234567890',
      location: 'New York, USA',
      bio: 'Experienced teacher with a passion for education.'
    },
    {
      id: '2',
      name: 'Rahul Sharma',
      email: 'student1@edu.com',
      password: 'student123',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      phone: '0987654321',
      location: 'Los Angeles, USA',
      bio: 'Enthusiastic learner and aspiring developer.'
    },
    {
      id: '3',
      name: 'Priya Verma',
      email: 'student2@edu.com',
      password: 'student456',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      phone: '1122334455',
      location: 'Chicago, USA',
      bio: 'Passionate about technology and innovation.'
    },
    {
      id: '4',
      name: 'Anusha',
      email: 'anu@gmail.com',
      password: 'anu123',
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      phone: '2233445566',
      location: 'San Francisco, USA',
      bio: 'Dedicated educator with a focus on student success.'
    },
    {
      id: '5',
      name: 'Arpitha G',
      email: 'arpi@gmail.com',
      password: 'arpi123',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      phone: '3344556677',
      location: 'Seattle, USA',
      bio: 'Curious mind with a love for learning.'
    },
    {
      id: '6',
      name: 'ankitha H',
      email: 'anki@gmail.com',
      password: 'anki123',
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
      phone: '4455667788',
      location: 'Austin, USA',
      bio: 'Innovative teacher with a background in technology.'
    },
    {
      id: '7',
      name: 'Ankitha Reddy',
      email: 'ankitha@gmail.com',
      password: 'student987',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
      phone: '5566778899',
      location: 'Boston, USA',
      bio: 'Lifelong learner with a passion for science.'
    },
    {
      id: '8',
      name: 'Arpitha N',
      email: 'arpitha@gmail.com',
      password: 'student159',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7',
      phone: '6677889900',
      location: 'Miami, USA',
      bio: 'Aspiring engineer with a knack for problem-solving.'
    }
  ]);

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (newUser: Omit<User, 'id'>) => {
    const existingUser = users.find(u => u.email === newUser.email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    const newUserWithId: User = {
      ...newUser,
      id: (users.length + 1).toString()
    };

    setUsers(prev => [...prev, newUserWithId]);
    setUser(newUserWithId); // Optional: auto login after registration

    return { success: true, message: 'Registration successful' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
//           </p>