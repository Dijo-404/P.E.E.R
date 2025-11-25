/**
 * Format a number as percentage
 */
export function formatPercentage(value, decimals = 1) {
    return `${value.toFixed(decimals)}%`;
}
/**
 * Format a score as "X/Y (Z%)"
 */
export function formatScore(score, maxScore) {
    const percentage = (score / maxScore) * 100;
    return `${score}/${maxScore} (${formatPercentage(percentage)})`;
}
/**
 * Capitalize first letter of a string
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/**
 * Truncate string to specified length
 */
export function truncate(str, length) {
    if (str.length <= length)
        return str;
    return str.slice(0, length) + '...';
}
/**
 * Format phone number
 */
export function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}
/**
 * Get initials from name
 */
export function getInitials(name) {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
