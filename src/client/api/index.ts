import axios from 'axios';
import * as crypto from 'crypto-js';

export function createApi() {
  const conn = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
  });
  return {
    user: {
      login: (phone: string, password: string) => {
        const pwd = crypto.SHA1(password).toString();
        return conn.post('/user/login', {
          phone, password: pwd,
        });
      },
    },
    work: {
      getWork: (workId: number) => conn.get(`/work/${workId}`),
      getWorkList: (userId: number) => conn.get(`/work/list/${userId}`),
      updateCode: (codeId: number, content: string) => {
        return conn.post(`/work/code/${codeId}/update`, { content });
      },
      addCode: (workId: number, filename: string, type: string) => {
        return conn.post(`/work/${workId}/code/new`, {
          filename, type,
        });
      },
      deleteCode: (codeId: number) => {
        return conn.post(`/work/code/${codeId}/delete`);
      },
      newWork: (userId: number, name: string) => {
        return conn.post('/work/new', { userId, name });
      },
    },
  };
}
