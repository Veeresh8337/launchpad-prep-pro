
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { encryptData, decryptData, generateToken, isTokenValid } from "@/lib/utils";

interface User {
  email: string;
  name: string;
  profilePicture?: string;
  skills: string[];
  achievements: string[];
  activitiesCompleted: {
    quizzesCompleted: number;
    interviewsCompleted: number;
    materialsCompleted: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
  updateActivities: (type: 'quiz' | 'interview' | 'material') => void;
  addAchievement: (achievement: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('launchpad_token');
    
    if (isTokenValid(token)) {
      const storedUser = localStorage.getItem('launchpad_user');
      
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to parse user data", error);
          localStorage.removeItem('launchpad_token');
          localStorage.removeItem('launchpad_user');
        }
      }
    } else if (token) {
      // Token expired
      localStorage.removeItem('launchpad_token');
      localStorage.removeItem('launchpad_user');
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('launchpad_users') || '{}');
    
    // Check if user exists
    if (!users[email]) {
      setIsLoading(false);
      return false;
    }
    
    // Check if password is correct
    try {
      const decryptedPassword = decryptData(users[email].password);
      
      if (password !== decryptedPassword) {
        setIsLoading(false);
        return false;
      }
      
      // Generate token and store user data
      const token = generateToken(email);
      localStorage.setItem('launchpad_token', token);
      localStorage.setItem('launchpad_user', JSON.stringify(users[email].userData));
      
      // Update state
      setUser(users[email].userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Failed to login", error);
      setIsLoading(false);
      return false;
    }
  };
  
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('launchpad_users') || '{}');
    
    // Check if user already exists
    if (users[email]) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      email,
      name,
      skills: [],
      achievements: [],
      activitiesCompleted: {
        quizzesCompleted: 0,
        interviewsCompleted: 0,
        materialsCompleted: 0
      }
    };
    
    // Store user
    users[email] = {
      password: encryptData(password),
      userData: newUser
    };
    
    localStorage.setItem('launchpad_users', JSON.stringify(users));
    
    // Generate token and store user data
    const token = generateToken(email);
    localStorage.setItem('launchpad_token', token);
    localStorage.setItem('launchpad_user', JSON.stringify(newUser));
    
    // Update state
    setUser(newUser);
    setIsAuthenticated(true);
    setIsLoading(false);
    return true;
  };
  
  const logout = () => {
    localStorage.removeItem('launchpad_token');
    localStorage.removeItem('launchpad_user');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    
    // Update localStorage
    localStorage.setItem('launchpad_user', JSON.stringify(updatedUser));
    
    // Update users store
    const users = JSON.parse(localStorage.getItem('launchpad_users') || '{}');
    if (users[user.email]) {
      users[user.email].userData = updatedUser;
      localStorage.setItem('launchpad_users', JSON.stringify(users));
    }
    
    // Update state
    setUser(updatedUser);
  };
  
  const updateActivities = (type: 'quiz' | 'interview' | 'material') => {
    if (!user) return;
    
    const updatedUser = { 
      ...user, 
      activitiesCompleted: {
        ...user.activitiesCompleted,
        [type === 'quiz' ? 'quizzesCompleted' : 
         type === 'interview' ? 'interviewsCompleted' : 
         'materialsCompleted']: (user.activitiesCompleted[
           type === 'quiz' ? 'quizzesCompleted' : 
           type === 'interview' ? 'interviewsCompleted' : 
           'materialsCompleted'
         ] || 0) + 1
      }
    };
    
    // Update localStorage
    localStorage.setItem('launchpad_user', JSON.stringify(updatedUser));
    
    // Update users store
    const users = JSON.parse(localStorage.getItem('launchpad_users') || '{}');
    if (users[user.email]) {
      users[user.email].userData = updatedUser;
      localStorage.setItem('launchpad_users', JSON.stringify(users));
    }
    
    // Update state
    setUser(updatedUser);
  };
  
  const addAchievement = (achievement: string) => {
    if (!user) return;
    
    // Check if achievement already exists
    if (user.achievements.includes(achievement)) return;
    
    const updatedUser = {
      ...user,
      achievements: [...user.achievements, achievement]
    };
    
    // Update localStorage
    localStorage.setItem('launchpad_user', JSON.stringify(updatedUser));
    
    // Update users store
    const users = JSON.parse(localStorage.getItem('launchpad_users') || '{}');
    if (users[user.email]) {
      users[user.email].userData = updatedUser;
      localStorage.setItem('launchpad_users', JSON.stringify(users));
    }
    
    // Update state
    setUser(updatedUser);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        updateUserProfile,
        updateActivities,
        addAchievement
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
