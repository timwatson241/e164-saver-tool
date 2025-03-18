
import React from 'react';
import { Phone, Save } from 'lucide-react';
import { usePhone } from '../context/PhoneContext';
import { isValidPhoneNumber } from '../utils/phoneUtils';

const SaveButton: React.FC = () => {
  const { phoneNumber, savePhoneNumber } = usePhone();
  const isValid = phoneNumber.trim() !== '' && isValidPhoneNumber(phoneNumber);

  return (
    <button
      onClick={savePhoneNumber}
      disabled={!isValid}
      className={`save-button group relative overflow-hidden animate-fade-in ${
        !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm active:shadow-inner'
      }`}
      aria-label="Save phone number"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Save className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
        <span>Save</span>
      </span>
      
      <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
    </button>
  );
};

export default SaveButton;
