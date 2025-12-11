export interface Attachment {
  name: string;
  type: 'ppt' | 'pdf' | 'image';
  size: string;
}

export interface EmailData {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
  read: boolean;
  avatarColor: string;
  attachment?: Attachment;
}

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
}