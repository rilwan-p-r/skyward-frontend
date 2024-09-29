import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaPaperclip, FaSmile } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface SendMessageFormProps {
  onSendMessage: (message: string, images: File[]) => void;
  onTypingStatus: (isTyping: boolean) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSendMessage, onTypingStatus }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    onTypingStatus(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onTypingStatus(false);
    }, 1000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.filter(file => file.type.startsWith('image/')).slice(0, 4 - selectedImages.length);

    setSelectedImages(prevImages => [...prevImages, ...newImages]);

    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls(prevUrls => [...prevUrls, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prevMessage => prevMessage + emojiData.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() || selectedImages.length > 0) {
      onSendMessage(newMessage.trim(), selectedImages);
      setNewMessage('');
      setSelectedImages([]);
      setImagePreviewUrls([]);
      onTypingStatus(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImagePreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSendMessage} className="mt-auto p-4 bg-gray-100 border-t border-gray-300">
      {imagePreviewUrls.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {imagePreviewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 p-3 bg-white text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={toggleEmojiPicker}
          className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200"
        >
          <FaSmile className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200"
          disabled={selectedImages.length >= 4}
        >
          <FaPaperclip className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200"
        >
          <FaPaperPlane className="w-5 h-5" />
        </motion.button>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </form>
  );
};

export default SendMessageForm;