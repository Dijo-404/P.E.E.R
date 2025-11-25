import { format, formatDistance, formatRelative } from 'date-fns';
/**
 * Format a date to a readable string
 */
export function formatDate(date, formatStr = 'PPP') {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatStr);
}
/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
}
/**
 * Format date relative to now (e.g., "today at 3:00 PM")
 */
export function getRelativeDate(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatRelative(dateObj, new Date());
}
/**
 * Check if a date is in the past
 */
export function isPast(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj < new Date();
}
/**
 * Check if a date is in the future
 */
export function isFuture(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj > new Date();
}
