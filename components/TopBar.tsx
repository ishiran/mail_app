import React, { useState, useEffect } from 'react';
import { Apple, Search, Wifi, Battery } from 'lucide-react';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
      };
      setTime(now.toLocaleString('en-US', options).replace(/,/g, ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 w-full bg-white/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm select-none shadow-sm z-50 fixed top-0 left-0 right-0">
      <div className="flex items-center space-x-4 font-medium">
        <Apple size={16} className="fill-current" />
        <span className="font-semibold">Mail</span>
        <span className="hidden sm:inline">File</span>
        <span className="hidden sm:inline">Edit</span>
        <span className="hidden sm:inline">View</span>
        <span className="hidden sm:inline">Mailbox</span>
        <span className="hidden sm:inline">Message</span>
        <span className="hidden sm:inline">Format</span>
        <span className="hidden sm:inline">Window</span>
        <span className="hidden sm:inline">Help</span>
      </div>

      <div className="flex items-center space-x-4">
        <Battery size={18} />
        <Wifi size={16} />
        <Search size={14} />
        <div className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-transparent border-t border-r border-white transform rotate-45 -mt-0.5"></div>
        </div>
        <span className="font-medium min-w-[140px] text-right">{time}</span>
      </div>
    </div>
  );
};