
/**
 * Phone Utility Functions
 * 
 * This file contains utility functions for handling phone number formatting
 * and validation according to the E.164 international standard.
 */

/**
 * Formats a phone number to E.164 format
 * E.164 is the international standard format for phone numbers:
 * - Always starts with a + sign
 * - Followed by the country code (1 for North America)
 * - Then the national number with no spaces, hyphens, or other separators
 * 
 * @param phoneNumber The phone number to format (can include non-numeric characters)
 * @returns The formatted phone number in E.164 format (e.g., +14039995825)
 */
export const formatToE164 = (phoneNumber: string): string => {
  // Strip all non-numeric characters (spaces, hyphens, parentheses, etc.)
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Handle different input cases:
  if (digits.length === 10) {
    // CASE 1: If it's a 10-digit number (without country code)
    // Examples: 4039995825, 403-999-5825, (403) 999-5825
    // Add +1 (North American country code) to the front
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    // CASE 2: If it's an 11-digit number starting with 1
    // Examples: 14039995825, 1-403-999-5825, 1 (403) 999-5825
    // Add + to the front to make it E.164 compliant
    return `+${digits}`;
  } else {
    // CASE 3: For all other cases (international numbers or non-standard formats)
    // Simply add + to ensure it's at least somewhat E.164-like
    // This may not be fully compliant but preserves user input
    return `+${digits}`;
  }
};

/**
 * Validates if a phone number is in a valid format
 * 
 * For this application, we consider two formats valid:
 * 1. 10 digits (standard North American number without country code)
 * 2. 11 digits starting with 1 (North American number with country code)
 * 
 * @param phoneNumber The phone number to validate (can include non-numeric characters)
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Strip all non-numeric characters for validation
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Valid formats: 
  // - 10 digits (without country code), e.g., 4039995825
  // - 11 digits starting with 1 (with country code), e.g., 14039995825
  return (digits.length === 10) || (digits.length === 11 && digits.startsWith('1'));
};

/**
 * Formats a phone number for human-readable display
 * 
 * Takes an E.164 formatted phone number and converts it to a more readable format
 * with appropriate spacing, parentheses, and hyphens.
 * 
 * @param phoneNumber The E.164 formatted phone number to display (e.g., +14039995825)
 * @returns Formatted phone number for display (e.g., +1 (403) 999-5825)
 */
export const formatForDisplay = (phoneNumber: string): string => {
  // Handle empty or very short input
  if (!phoneNumber || phoneNumber.length < 2) return phoneNumber;
  
  // Remove the + sign for processing
  const withoutPlus = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
  // Strip all non-numeric characters
  const digits = withoutPlus.replace(/\D/g, '');
  
  // Format North American numbers (country code 1) with a standard format:
  // +1 (XXX) XXX-XXXX
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7)}`;
  }
  
  // For any other format, return as is
  // This handles international numbers or non-standard formats
  return phoneNumber;
};
