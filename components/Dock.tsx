import React from 'react';
import { Mail, Music, Calendar, Settings, Chrome, Terminal, Folder } from 'lucide-react';

interface DockProps {
  onMailClick: () => void;
  isMailOpen: boolean;
  unreadCount?: number;
}

export const Dock: React.FC<DockProps> = ({ onMailClick, isMailOpen, unreadCount = 0 }) => {
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-end space-x-2 px-4 pb-2 pt-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl h-16 sm:h-20">
        
        <DockItem icon={<Folder className="text-blue-400" />} label="Finder" />
        <DockItem icon={<Chrome className="text-yellow-500" />} label="Browser" />
        
        {/* Mail Icon with active indicator and badge */}
        <div className="group relative flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-2 hover:scale-110 duration-200" onClick={onMailClick}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg text-white relative">
            <Mail size={24} fill="white" strokeWidth={1.5} />
            
            {/* Red Notification Badge */}
            {unreadCount > 0 && (
              <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 h-5 min-w-[20px] rounded-full flex items-center justify-center border-2 border-white/20 shadow-sm z-20 animate-bounce-subtle">
                {unreadCount}
              </div>
            )}
          </div>
          
          {isMailOpen && (
            <div className="w-1 h-1 bg-black/50 dark:bg-white/80 rounded-full mt-1"></div>
          )}
          <span className="absolute -top-10 bg-gray-800/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Mail
          </span>
        </div>

        <DockItem icon={<Calendar className="text-red-500" />} label="Calendar" />
        <DockItem icon={<Music className="text-pink-500" />} label="Music" />
        <DockItem icon={<Terminal className="text-gray-800" />} label="Terminal" />
        
        <div className="w-[1px] h-10 bg-white/20 mx-2"></div>
        
        <DockItem icon={<Settings className="text-gray-400" />} label="Settings" />
      </div>
    </div>
  );
};

const DockItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="group relative flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-2 hover:scale-110 duration-200">
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
      {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
    </div>
    <span className="absolute -top-10 bg-gray-800/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </div>
);