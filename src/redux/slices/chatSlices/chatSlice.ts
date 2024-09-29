// src/redux/slices/chatSlices/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageInterface } from '../../../interfaces/messageInterface';
import { UserInterface } from '../../../interfaces/userInterface';

export interface ChatState {
  messages: MessageInterface[];
  users: UserInterface[];
}

const initialState: ChatState = {
  messages: [],
  users: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageInterface[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<MessageInterface>) => {
      state.messages.push(action.payload);
    },
    setUsers: (state, action: PayloadAction<UserInterface[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setMessages, addMessage, setUsers } = chatSlice.actions;
export default chatSlice.reducer;
