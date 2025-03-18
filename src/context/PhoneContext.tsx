
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { formatToE164, isValidPhoneNumber } from '../utils/phoneUtils';

type SavedPhone = {
  id: string;
  number: string;
  timestamp: number;
};

interface PhoneContextType {
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  savedPhones: SavedPhone[];
  savePhoneNumber: () => void;
  deletePhoneNumber: (id: string) => void;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [savedPhones, setSavedPhones] = useState<SavedPhone[]>([]);

  // Load saved phone numbers from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('savedPhones');
    if (savedData) {
      try {
        setSavedPhones(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to parse saved phones:', error);
      }
    }
  }, []);

  // Save to localStorage whenever savedPhones changes
  useEffect(() => {
    localStorage.setItem('savedPhones', JSON.stringify(savedPhones));
  }, [savedPhones]);

  const savePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      toast.error('Please enter a phone number');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const formattedNumber = formatToE164(phoneNumber);
    
    // Check if this number is already saved
    if (savedPhones.some(phone => phone.number === formattedNumber)) {
      toast.info('This phone number is already saved');
      return;
    }

    const newPhone: SavedPhone = {
      id: crypto.randomUUID(),
      number: formattedNumber,
      timestamp: Date.now()
    };

    setSavedPhones(prev => [newPhone, ...prev]);
    setPhoneNumber('');
    toast.success('Phone number saved');
  };

  const deletePhoneNumber = (id: string) => {
    setSavedPhones(prev => prev.filter(phone => phone.id !== id));
    toast.success('Phone number deleted');
  };

  return (
    <PhoneContext.Provider value={{
      phoneNumber,
      setPhoneNumber,
      savedPhones,
      savePhoneNumber,
      deletePhoneNumber
    }}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = (): PhoneContextType => {
  const context = useContext(PhoneContext);
  if (context === undefined) {
    throw new Error('usePhone must be used within a PhoneProvider');
  }
  return context;
};
