import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Position } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constrainToPitch(
  position: Position,
  elementWidth: number = 25,
  elementHeight: number = 25,
  pitchWidth: number = 800,
  pitchHeight: number = 520
): Position {
  return {
    x: Math.max(0, Math.min(position.x, pitchWidth - elementWidth)),
    y: Math.max(0, Math.min(position.y, pitchHeight - elementHeight))
  };
}

export function getPlayerDisplayColor(color: string): string {
  // Convert rgba to hex for better performance and consistency
  if (color.includes('rgba')) {
    const values = color.match(/[\d.]+/g);
    if (values && values.length >= 3) {
      const r = parseInt(values[0]);
      const g = parseInt(values[1]);
      const b = parseInt(values[2]);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return color;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function isColorBright(color: string): boolean {
  // Convert color to RGB values
  let r: number, g: number, b: number;

  if (color.startsWith('#')) {
    // Hex color
    const hex = color.replace('#', '');
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  } else if (color.startsWith('rgb')) {
    // RGB or RGBA color
    const values = color.match(/[\d.]+/g);
    if (!values || values.length < 3) return false;
    r = parseInt(values[0]);
    g = parseInt(values[1]);
    b = parseInt(values[2]);
  } else {
    // Named colors or other formats - default to false (use white text)
    return false;
  }

  // Calculate relative luminance using the formula from WCAG
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // More sensitive threshold - bright colors need dark text
  return luminance > 0.4;
}