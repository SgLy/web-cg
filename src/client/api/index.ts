import axios from 'axios';
import * as crypto from 'crypto-js';

export function createApi() {
  const conn = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
  });
  return {
    course: {
      list: (offset: number) => conn.get(`/course/list/${offset}`),
    },
    user: {
      me: () => conn.get('/user/me'),
      login: (phone: string, password: string) => {
        const pwd = crypto.SHA1(password).toString();
        return conn.post('/user/login', {
          phone, password: pwd,
        });
      },
      register: (phone: string, password: string) => {
        const pwd = crypto.SHA1(password).toString();
        return conn.post('/user/register', {
          phone, password: pwd,
        });
      },
    },
    work: {
      getWork: (workId: number) => conn.get(`/work/${workId}`),
      getWorkList: () => conn.get('/work/list'),
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
      newWork: (name: string) => {
        return conn.post('/work/new', { name });
      },
    },
  };
}
