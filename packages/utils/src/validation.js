/**
 * Validate email address
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Validate phone number (10 digits)
 */
export function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
}
/**
 * Validate roll number format
 */
export function isValidRollNumber(rollNumber) {
    return rollNumber.length > 0 && rollNumber.length <= 20;
}
/**
 * Check if value is empty
 */
export function isEmpty(value) {
    if (value === null || value === undefined)
        return true;
    if (typeof value === 'string')
        return value.trim().length === 0;
    if (Array.isArray(value))
        return value.length === 0;
    if (typeof value === 'object')
        return Object.keys(value).length === 0;
    return false;
}
