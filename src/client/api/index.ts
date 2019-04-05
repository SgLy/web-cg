import axios from 'axios';
import * as crypto from 'crypto-js';

export function createApi() {
  const conn = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
  });
  const getFile = (url: string, filename: string) => {
    return conn.request({
      url,
      method: 'get',
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(
        new Blob([response.data]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.removeChild(link);
    });
  };
  return {
    assignment: {
      listByUser: () => conn.get('/assignment/list'),
    },
    course: {
      list: (offset: number) => conn.get(`/course/list/${offset}`),
      getAssignments: (courseId: number) => conn.get(`/course/${courseId}/assignments`),
      register: (courseId: number) => conn.post(`/course/${courseId}/register`),
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
      downloadRaw: (workId: number, filename: string) => getFile(
        `/work/${workId}/raw`, filename,
      ),
      downloadCompiled: (workId: number, filename: string) => getFile(
        `/work/${workId}/compiled`, filename,
      ),
    },
  };
}
