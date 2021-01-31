import { useCallback } from 'react';
import api from '../../services/api';

const useApi = () => {
  const process = useCallback(async (func, message, callback) => {
    try {
      const response = await func();
      if (message) {
        // TODO
      }
      if (callback) callback();
      return response;
    } catch (error) {
      return { data: null };
    }
  }, []);

  return {
    delete: useCallback(
      (url, message, callback) => {
        return process(() => api.delete(url), message, callback);
      },
      [process],
    ),

    get: useCallback(
      (url, message) => {
        return process(() => api.get(url), message);
      },
      [process],
    ),

    post: useCallback(
      (url, body, message) => {
        return process(() => api.post(url, body), message);
      },
      [process],
    ),

    put: useCallback(
      (url, body, message) => {
        return process(() => api.put(url, body), message);
      },
      [process],
    ),
  };
};

export default useApi;
