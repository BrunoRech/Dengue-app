import { useCallback } from 'react';
import { Alert } from 'react-native';
import api from '../../services/api';
import { getObjectDiff } from '../../utils';

const useApi = () => {
  const process = useCallback(async (func, message, callback) => {
    try {
      const response = await func();
      if (message) {
        Alert.alert(message);
      }
      if (callback) callback();
      return response;
    } catch (error) {
      if (error.response.data[0].msg) {
        Alert.alert(error.response.data[0].msg);
      }
      return { data: null, error };
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
      (url, body, oldBody, message) => {
        const diff = getObjectDiff(body, oldBody);
        if (Object.keys(diff).length === 0) {
          return Alert.alert('Nenhuma alteração detectada');
        }
        return process(() => api.put(url, diff), message);
      },
      [process],
    ),
  };
};

export default useApi;
