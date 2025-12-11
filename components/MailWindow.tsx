import React, { useState } from 'react';
import { 
  Search, Edit, Archive, Trash2, Reply, ReplyAll, 
  Forward, ChevronDown, Inbox, Send, File, Clock, AlertCircle,
  FileText
} from 'lucide-react';
import { EmailData } from '../types';

interface MailWindowProps {
  emails: EmailData[];
  selectedEmailId: string | null;
  onClose: () => void;
  onSelectEmail: (id: string) => void;
  onOpenAttachment: () => void;
}

export const MailWindow: React.FC<MailWindowProps> = ({ emails, selectedEmailId, onClose, onSelectEmail, onOpenAttachment }) => {
  const selectedEmail = emails.find(e => e.id === selectedEmailId) || emails[0];
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="fixed top-[10%] left-[5%] right-[5%] bottom-[15%] md:left-[15%] md:right-[15%] md:bottom-[20%] bg-white/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 flex flex-col overflow-hidden animate-popIn origin-center transition-all duration-300 z-40">
      
      {/* Title Bar / Toolbar */}
      <div className="h-14 bg-gray-100/80 border-b border-gray-300 flex items-center justify-between px-4 flex-shrink-0 relative">
        <div className="flex items-center space-x-2 w-1/4">
          <div className="flex space-x-2 group p-2 -ml-2 z-[60]"> 
            {/* Added padding and z-index to ensure clickability */}
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }} 
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-red-900 pb-0.5 pointer-events-none">×</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 flex items-center justify-center shadow-sm cursor-default">
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-yellow-900 pb-0.5 pointer-events-none">−</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 flex items-center justify-center shadow-sm cursor-default">
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-900 pb-0.5 pointer-events-none">↗</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center space-x-4">
           <div className="flex bg-gray-200/50 rounded-md p-0.5">
             <button className="p-1.5 hover:bg-white rounded-sm shadow-sm transition-all"><Archive size={16} className="text-gray-600" /></button>
             <button className="p-1.5 hover:bg-white rounded-sm transition-all"><Trash2 size={16} className="text-gray-600" /></button>
           </div>
           <div className="flex bg-gray-200/50 rounded-md p-0.5">
             <button className="p-1.5 hover:bg-white rounded-sm shadow-sm transition-all"><Reply size={16} className="text-gray-600" /></button>
             <button className="p-1.5 hover:bg-white rounded-sm transition-all"><ReplyAll size={16} className="text-gray-600" /></button>
             <button className="p-1.5 hover:bg-white rounded-sm transition-all"><Forward size={16} className="text-gray-600" /></button>
           </div>
           <button className="p-1.5 hover:bg-gray-200 rounded-md transition-all"><Edit size={16} className="text-gray-500" /></button>
        </div>

        <div className="w-1/4 flex justify-end">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-8 pr-2 py-1 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 w-32 md:w-48 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar - Mailboxes */}
        <div className="hidden md:flex flex-col w-48 bg-gray-50/80 border-r border-gray-200 pt-3 backdrop-blur-xl">
          <div className="px-4 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Favorites</span>
          </div>
          <nav className="space-y-0.5 px-2">
            <SidebarItem icon={<Inbox size={16} />} label="Inbox" count={emails.filter(e => !e.read).length || undefined} active />
            <SidebarItem icon={<Send size={16} />} label="Sent" />
            <SidebarItem icon={<File size={16} />} label="Drafts" />
            <SidebarItem icon={<Clock size={16} />} label="Reminders" />
            <SidebarItem icon={<AlertCircle size={16} />} label="Junk" />
            <SidebarItem icon={<Trash2 size={16} />} label="Trash" />
          </nav>
        </div>

        {/* Message List */}
        <div className="w-full md:w-72 lg:w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Inbox</h2>
             <span className="text-xs text-gray-500">{emails.filter(e => !e.read).length} Unread</span>
          </div>
          <div className="divide-y divide-gray-100">
            {emails.map((email) => (
              <div 
                key={email.id}
                onClick={() => onSelectEmail(email.id)}
                className={`p-3 cursor-pointer transition-colors ${selectedEmailId === email.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-gray-800'}`}
              >
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className={`text-sm font-semibold truncate ${!email.read && selectedEmailId !== email.id ? 'text-blue-600' : ''}`}>
                    {email.read ? '' : '• '}{email.sender}
                  </span>
                  <span className={`text-xs flex-shrink-0 ${selectedEmailId === email.id ? 'text-blue-200' : 'text-gray-400'}`}>
                    {email.date}
                  </span>
                </div>
                <div className={`text-sm mb-1 truncate ${selectedEmailId === email.id ? 'text-white' : 'text-gray-600'}`}>
                  {email.subject}
                </div>
                <div className={`text-xs truncate leading-relaxed ${selectedEmailId === email.id ? 'text-blue-100' : 'text-gray-400'}`}>
                  {email.preview}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reading Pane */}
        <div className="hidden lg:flex flex-1 flex-col bg-white overflow-hidden">
          {selectedEmail ? (
            <>
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-medium ${selectedEmail.avatarColor}`}>
                        {selectedEmail.sender[0].toUpperCase()}
                     </div>
                     <div>
                       <h3 className="font-bold text-gray-900 text-base">{selectedEmail.sender}</h3>
                       <p className="text-sm text-gray-500">{selectedEmail.senderEmail}</p>
                     </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {selectedEmail.date}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedEmail.subject}</h2>
                <div className="text-xs text-gray-500 flex items-center space-x-1">
                  <span>To: Me</span>
                  <ChevronDown size={12} />
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-8 overflow-y-auto bg-white">
                <div className="max-w-3xl text-gray-800 leading-relaxed text-sm whitespace-pre-wrap font-serif">
                  {selectedEmail.content}
                </div>

                {/* Attachments Section */}
                {selectedEmail.attachment && (
                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 mb-3">1 Attachment</p>
                    <div 
                      onClick={onOpenAttachment}
                      className="group flex items-center p-2 rounded-lg border border-gray-200 w-fit cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                        <FileText className="text-orange-500" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{selectedEmail.attachment.name}</p>
                        <p className="text-xs text-gray-400">{selectedEmail.attachment.size}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quick Reply (Cosmetic) */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                 <div className="text-xs text-gray-400 mb-2">Click to reply...</div>
              </div>
            </>
          ) : (
             <div className="flex-1 flex items-center justify-center text-gray-300">
               No Message Selected
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; count?: number; active?: boolean }> = ({ icon, label, count, active }) => (
  <div className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer text-sm ${active ? 'bg-gray-200/80 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-200/50'}`}>
    <div className="flex items-center space-x-2">
      <span className={active ? 'text-blue-600' : 'text-gray-500'}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
      </span>
      <span>{label}</span>
    </div>
    {count && (
      <span className="text-xs text-gray-500 font-medium">{count}</span>
    )}
  </div>
);