import { EmailData } from './types';

export const MOCK_EMAILS: EmailData[] = [
  {
    id: '1',
    sender: 'nxy',
    senderEmail: 'ishirann@outlook.com',
    subject: '一份迟到的答卷——对“读者借阅率”的思考',
    preview: '柴馆你好，最近工作之余的一些思考做了一个PPT...',
    content: '柴馆你好，最近工作之余的一些思考做了一个PPT，希望你再放松的时候打开看看。',
    date: '10:42 AM',
    read: false,
    avatarColor: 'bg-indigo-500',
    attachment: {
      name: '对“读者借阅率”的思考.ppt',
      type: 'ppt',
      size: '4.2 MB'
    }
  },
  {
    id: '2',
    sender: 'Apple Support',
    senderEmail: 'no_reply@email.apple.com',
    subject: 'Your receipt for Order W481023',
    preview: 'Thank you for your recent purchase. Here is your receipt...',
    content: 'This is a standard receipt email template.',
    date: 'Yesterday',
    read: true,
    avatarColor: 'bg-gray-500'
  },
  {
    id: '3',
    sender: 'Newsletter Weekly',
    senderEmail: 'hello@newsletter.io',
    subject: '5 Tips for Better React Performance',
    preview: 'This week we dive deep into memoization techniques...',
    content: 'Here are the tips...',
    date: 'Monday',
    read: true,
    avatarColor: 'bg-orange-500'
  }
];