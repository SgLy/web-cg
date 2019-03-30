import axios from 'axios';

export function createApi() {
  const conn = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  return {
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
