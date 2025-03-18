
import React, { useState } from 'react';
import { usePhone } from '../context/PhoneContext';
import { Input } from "@/components/ui/input";

const PhoneInput: React.FC = () => {
  const { phoneNumber, setPhoneNumber } = usePhone();
  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits, spaces, parentheses, hyphens, and plus
    const value = e.target.value.replace(/[^\d\s()+-]/g, '');
    setPhoneNumber(value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background effect div - moved to be BEHIND the input with pointer-events-none */}
      <div 
        className={`absolute inset-0 bg-primary/5 rounded-lg transform transition-all duration-300 pointer-events-none ${
          isFocused ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
        }`}
      ></div>
      
      <label 
        htmlFor="phone-input" 
        className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1 transition-all duration-200 animate-fade-in"
      >
        Phone Number
      </label>
      
      {/* Making sure the input has position relative and proper z-index to be interactive */}
      <div className="relative z-10">
        <Input
          id="phone-input"
          type="tel"
          className="text-xl tracking-wider relative z-10"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Enter phone number"
          maxLength={16}
          autoComplete="tel"
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2 ml-1 animate-fade-in">
        Enter 10 digits (4039995825) or 11 digits with country code (14039995825)
      </p>
    </div>
  );
};

export default PhoneInput;
