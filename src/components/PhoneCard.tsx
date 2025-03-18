
import React from 'react';
import { Phone, Trash2, Copy } from 'lucide-react';
import { toast } from "sonner";
import { usePhone } from '../context/PhoneContext';
import { formatForDisplay } from '../utils/phoneUtils';

interface PhoneCardProps {
  id: string;
  number: string;
  timestamp: number;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ id, number, timestamp }) => {
  const { deletePhoneNumber } = usePhone();
  const displayNumber = formatForDisplay(number);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(number)
      .then(() => toast.success('Copied to clipboard'))
      .catch(() => toast.error('Failed to copy'));
  };

  return (
    <div className="phone-card group animate-scale-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Phone className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium tracking-wide">{displayNumber}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(timestamp).toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={copyToClipboard}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
            aria-label="Copy phone number"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deletePhoneNumber(id)}
            className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors duration-200"
            aria-label="Delete phone number"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
