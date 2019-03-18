import axios from 'axios';

export function createApi() {
  const conn = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  return {
    work: {
      getWork: () => conn.get('/work/get_work/1'),
      updateCode: (code: string) => conn.post('/canvas/update_code', { code }),
    },
  };
}
