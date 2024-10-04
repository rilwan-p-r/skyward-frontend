import { BatchInterface } from "./BatchInterface";
import { MessageInterface } from "./messageInterface";

export interface SocketContextType {
    messages: MessageInterface[];
    batchDetails: BatchInterface | null;
    sendMessage: (text: string | null, images: File[]) => void;
    sendTypingStatus: (isTyping: boolean) => void;
    deleteMessages: (messageIds: string[]) => void;
    typingUsers: string[];
    connectedUsers: string[];
    isVideoCallActive: boolean;
    videoCallInitiator: string | null;
    jitsiLink: string | null;
    startVideoCall: () => void;
    endVideoCall: () => void;
  }