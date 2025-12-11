import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { Notification } from './components/Notification';
import { MailWindow } from './components/MailWindow';
import { PPTViewer } from './components/PPTViewer';
import { MOCK_EMAILS } from './constants';
import { EmailData } from './types';

const App: React.FC = () => {
  // State for emails to track read/unread status
  const [emails, setEmails] = useState<EmailData[]>(MOCK_EMAILS);
  
  const [isMailOpen, setMailOpen] = useState(false);
  const [isPPTOpen, setPPTOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>('1');
  const [hasNewMailArrived, setHasNewMailArrived] = useState(false);

  // Calculate unread count for Dock badge
  // We only show the badge if the "new mail" has officially "arrived" via the notification timer
  const unreadCount = hasNewMailArrived ? emails.filter(e => !e.read).length : 0;

  // Trigger notification after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMailOpen && !notificationDismissed) {
        setShowNotification(true);
        setHasNewMailArrived(true);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isMailOpen, notificationDismissed]);

  const handleMarkAsRead = (id: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, read: true } : email
    ));
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    setMailOpen(true);
    // Ensure the new email is selected and marked as read
    setSelectedEmailId('1');
    handleMarkAsRead('1');
  };

  const handleDockMailClick = () => {
    setMailOpen((prev) => !prev);
    // If opening via dock and notification is still up, dismiss it
    if (!isMailOpen) {
      setShowNotification(false);
    }
  };

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    handleMarkAsRead(id);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-cover bg-center select-none font-sans"
         style={{
           // macOS Monterey/Big Sur style abstract gradient
           backgroundImage: 'linear-gradient(135deg, #feb5e3 0%, #a044ff 40%, #5a1cff 100%)'
         }}>
      
      {/* Background Overlay for depth */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      <TopBar />

      <main className="relative w-full h-full pt-8 pb-24">
        {/* The Desktop Area */}
        
        {showNotification && (
          <Notification 
            sender={emails[0].sender}
            subject={emails[0].subject}
            preview={emails[0].preview}
            onClick={handleNotificationClick}
            onDismiss={() => {
              setShowNotification(false);
              setNotificationDismissed(true);
            }}
          />
        )}

        {isMailOpen && (
          <MailWindow 
            emails={emails}
            selectedEmailId={selectedEmailId}
            onSelectEmail={handleSelectEmail}
            onClose={() => setMailOpen(false)}
            onOpenAttachment={() => setPPTOpen(true)}
          />
        )}

        {isPPTOpen && (
          <PPTViewer onClose={() => setPPTOpen(false)} />
        )}
      </main>

      <Dock 
        onMailClick={handleDockMailClick}
        isMailOpen={isMailOpen}
        unreadCount={unreadCount}
      />
      
    </div>
  );
};

export default App;