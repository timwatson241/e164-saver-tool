
/**
 * Phone Utility Functions
 * 
 * This file contains utility functions for handling phone number formatting
 * and validation according to the E.164 international standard.
 */

/**
 * Default configuration for phone utility functions
 */
export const phoneConfig = {
  // Default country code (North America)
  defaultCountryCode: '1',
  
  // Number of digits in a phone number without country code
  // This is typically 10 for North America
  nationalNumberLength: 10
};

/**
 * Formats a phone number to E.164 format
 * E.164 is the international standard format for phone numbers:
 * - Always starts with a + sign
 * - Followed by the country code (1 for North America)
 * - Then the national number with no spaces, hyphens, or other separators
 * 
 * @param phoneNumber The phone number to format (can include non-numeric characters)
 * @param countryCode Optional country code to use (defaults to configuration value)
 * @returns The formatted phone number in E.164 format (e.g., +14039995825)
 */
export const formatToE164 = (phoneNumber: string, countryCode: string = phoneConfig.defaultCountryCode): string => {
  // Strip all non-numeric characters (spaces, hyphens, parentheses, etc.)
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Handle different input cases:
  if (digits.length === phoneConfig.nationalNumberLength) {
    // CASE 1: If it's a standard national number (without country code)
    // Examples: 4039995825, 403-999-5825, (403) 999-5825
    // Add the country code to the front
    return `+${countryCode}${digits}`;
  } else if (digits.length === phoneConfig.nationalNumberLength + countryCode.length && 
             digits.startsWith(countryCode)) {
    // CASE 2: If it already has the country code
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
 * 1. Standard national number length (typically 10 digits for North America)
 * 2. National number length + country code digits (typically 11 digits for North America)
 * 
 * @param phoneNumber The phone number to validate (can include non-numeric characters)
 * @param countryCode Optional country code to use (defaults to configuration value)
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhoneNumber = (
  phoneNumber: string, 
  countryCode: string = phoneConfig.defaultCountryCode
): boolean => {
  // Strip all non-numeric characters for validation
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Valid formats: 
  // - National number length (without country code)
  // - National number length + country code length (with country code)
  return (digits.length === phoneConfig.nationalNumberLength) || 
         (digits.length === phoneConfig.nationalNumberLength + countryCode.length && 
          digits.startsWith(countryCode));
};

/**
 * Formats a phone number for human-readable display
 * 
 * Takes an E.164 formatted phone number and converts it to a more readable format
 * with appropriate spacing, parentheses, and hyphens.
 * 
 * @param phoneNumber The E.164 formatted phone number to display (e.g., +14039995825)
 * @param countryCode Optional country code to use (defaults to configuration value)
 * @returns Formatted phone number for display (e.g., +1 (403) 999-5825)
 */
export const formatForDisplay = (
  phoneNumber: string, 
  countryCode: string = phoneConfig.defaultCountryCode
): string => {
  // Handle empty or very short input
  if (!phoneNumber || phoneNumber.length < 2) return phoneNumber;
  
  // Remove the + sign for processing
  const withoutPlus = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
  // Strip all non-numeric characters
  const digits = withoutPlus.replace(/\D/g, '');
  
  // Format North American numbers (or any number matching our expected pattern)
  // with a standard format: +[country code] (XXX) XXX-XXXX
  if (digits.length === phoneConfig.nationalNumberLength + countryCode.length && 
      digits.startsWith(countryCode)) {
    
    // Get the national number part (after country code)
    const nationalNumber = digits.substring(countryCode.length);
    
    // For North American numbers, format as: +1 (XXX) XXX-XXXX
    if (countryCode === '1' && nationalNumber.length === 10) {
      return `+${countryCode} (${nationalNumber.substring(0, 3)}) ${nationalNumber.substring(3, 6)}-${nationalNumber.substring(6)}`;
    }
    
    // For other countries, use a simpler format: +[country code] XXXXXXXXXX
    return `+${countryCode} ${nationalNumber}`;
  }
  
  // For any other format, return as is
  // This handles international numbers or non-standard formats
  return phoneNumber;
};

