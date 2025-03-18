
/**
 * Formats a phone number to E.164 format
 * @param phoneNumber The phone number to format
 * @returns The formatted phone number in E.164 format
 */
export const formatToE164 = (phoneNumber: string): string => {
  // Strip all non-numeric characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Canada's country code is +1
  if (digits.length === 10) {
    // If it's a 10-digit number (without country code), add +1
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    // If it's an 11-digit number starting with 1, add +
    return `+${digits}`;
  } else {
    // Return as is with + prepended if it's not a standard format
    return `+${digits}`;
  }
};

/**
 * Validates if a phone number is in a valid format
 * @param phoneNumber The phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Valid formats: 10 digits (without country code) or 11 digits starting with 1
  return (digits.length === 10) || (digits.length === 11 && digits.startsWith('1'));
};

/**
 * Formats a phone number for display (with proper spacing)
 * @param phoneNumber The E.164 formatted phone number to display
 * @returns Formatted phone number for display
 */
export const formatForDisplay = (phoneNumber: string): string => {
  if (!phoneNumber || phoneNumber.length < 2) return phoneNumber;
  
  // Remove the + sign for processing
  const withoutPlus = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
  const digits = withoutPlus.replace(/\D/g, '');
  
  // Format as +1 (XXX) XXX-XXXX for Canadian numbers
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7)}`;
  }
  
  // Return original if not in standard format
  return phoneNumber;
};
