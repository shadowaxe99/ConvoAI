import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/send-message', { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
