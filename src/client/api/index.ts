import axios from 'axios';

export function createApi() {
  const conn = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  return {
    canvas: {
      getCode: () => conn.get('/canvas/get_code'),
      updateCode: (code: string) => conn.post('/canvas/update_code', { code }),
    },
  };
};
