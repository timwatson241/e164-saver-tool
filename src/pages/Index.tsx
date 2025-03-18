
import React from 'react';
import { PhoneProvider } from '../context/PhoneContext';
import PhoneInput from '../components/PhoneInput';
import SaveButton from '../components/SaveButton';
import PhoneCard from '../components/PhoneCard';
import { usePhone } from '../context/PhoneContext';
import { Phone } from 'lucide-react';

const PhoneNumberList = () => {
  const { savedPhones } = usePhone();

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {savedPhones.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground ml-1 mb-3">Saved Numbers</h2>
          {savedPhones.map((phone) => (
            <PhoneCard
              key={phone.id}
              id={phone.id}
              number={phone.number}
              timestamp={phone.timestamp}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
            <Phone className="w-5 h-5" />
          </div>
          <p>No saved phone numbers yet</p>
        </div>
      )}
    </div>
  );
};

const PhoneFormatter = () => {
  const { phoneNumber, savePhoneNumber } = usePhone();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      savePhoneNumber();
    }
  };

  return (
    <div className="w-full" onKeyPress={handleKeyPress}>
      <PhoneInput />
      <div className="flex justify-center mt-6">
        <SaveButton />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <PhoneProvider>
      <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 animate-slide-down">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse-subtle">
              <Phone className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">E.164 Phone Formatter</h1>
            <p className="mt-2 text-muted-foreground">
              Format phone numbers to international E.164 standard
            </p>
          </div>
          
          <div className="bg-card shadow-sm border border-border rounded-xl p-6 animate-fade-in">
            <PhoneFormatter />
          </div>
          
          <PhoneNumberList />
          
          <footer className="mt-16 text-center text-xs text-muted-foreground animate-fade-in">
            <p>Designed with simplicity in mind.</p>
          </footer>
        </div>
      </div>
    </PhoneProvider>
  );
};

export default Index;
