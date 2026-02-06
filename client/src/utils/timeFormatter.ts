/**
 * Utility functions for formatting time values
 * Follows Single Responsibility Principle by separating formatting logic
 */

/**
 * Formats milliseconds into MM:SS format
 * @param ms - Time in milliseconds
 * @returns Formatted time string (e.g., "3:45")
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Converts milliseconds to seconds
 * @param ms - Time in milliseconds
 * @returns Time in seconds
 */
export function msToSeconds(ms: number): number {
  return Math.floor(ms / 1000);
}

/**
 * Converts seconds to milliseconds
 * @param seconds - Time in seconds
 * @returns Time in milliseconds
 */
export function secondsToMs(seconds: number): number {
  return seconds * 1000;
}
