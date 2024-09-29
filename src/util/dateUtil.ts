import { MessageInterface } from '../interfaces/messageInterface';

const formatMessageDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
  };
  
  export const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  export const groupMessagesByDate = (messages: MessageInterface[]): { [key: string]: MessageInterface[] } => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.createdAt);
      const dateString = formatMessageDate(date);
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(message);
      return groups;
    }, {} as { [key: string]: MessageInterface[] });
  };