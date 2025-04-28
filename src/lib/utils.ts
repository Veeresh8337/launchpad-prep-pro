
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple encryption for demo purposes
export function encryptData(data: string, secretKey: string = "LAUNCHPAD_SECRET_KEY"): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decryptData(encryptedData: string, secretKey: string = "LAUNCHPAD_SECRET_KEY"): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Generate simple JWT-like token
export function generateToken(email: string): string {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };
  
  const payload = {
    email,
    exp: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7 days expiry
    iat: new Date().getTime()
  };
  
  const headerStr = btoa(JSON.stringify(header));
  const payloadStr = btoa(JSON.stringify(payload));
  
  // Simple signature for demo
  const signature = encryptData(`${headerStr}.${payloadStr}`);
  
  return `${headerStr}.${payloadStr}.${signature}`;
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp > new Date().getTime();
  } catch (error) {
    return false;
  }
}

// Calculate user level based on activities
export function calculateUserLevel(activities: Record<string, number>): number {
  const { quizzesCompleted = 0, interviewsCompleted = 0, materialsCompleted = 0 } = activities;
  
  // Formula: 1 level per 5 activities with a minimum of level 1
  const level = Math.floor((quizzesCompleted + interviewsCompleted + materialsCompleted) / 5) + 1;
  return level;
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
