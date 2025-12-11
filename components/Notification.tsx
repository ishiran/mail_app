import React, { useEffect, useState } from 'react';
import { Mail, X } from 'lucide-react';

interface NotificationProps {
  sender: string;
  subject: string;
  preview: string;
  onClick: () => void;
  onDismiss: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ sender, subject, preview, onClick, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay for entrance animation
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed top-12 right-4 w-80 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-3 z-50 cursor-pointer transition-all duration-500 transform ${visible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'} hover:bg-white/90`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
          <Mail size={20} className="text-white fill-current" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold text-gray-900 truncate">Mail</h4>
            <span className="text-xs text-gray-500">now</span>
          </div>
          <p className="text-sm font-medium text-gray-900 mt-0.5 truncate">{sender}</p>
          <p className="text-xs text-gray-700 truncate">{subject}</p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{preview}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
            setTimeout(onDismiss, 300); // Allow animation to finish
          }}
          className="absolute -top-2 -left-2 bg-gray-200 hover:bg-gray-300 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {/* Close button usually hidden until hover on real mac, but simpler here just to be clickable area */}
        </button>
      </div>
    </div>
  );
};