import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Shared email validation — mirrors the server-side check in the API routes
 * (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, max 254 chars) so client and server agree.
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
    const e = email.trim();
    return e.length > 0 && e.length <= 254 && EMAIL_REGEX.test(e);
}
