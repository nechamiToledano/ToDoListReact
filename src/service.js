import axios from 'axios';

// הגדרת כתובת ה-API כברירת מחדל
axios.defaults.baseURL = "http://localhost:5258";

// הוספת interceptor לתפיסת שגיאות
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/items');    
    return result.data;
  },

  addTask: async (name) => {
    try {
      const result = await axios.post('/items', { name });
      return result.data;
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`/items/${id}`, { isComplete });
      return result.data;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`/items/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  }
};
