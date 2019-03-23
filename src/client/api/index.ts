import axios from 'axios';

export function createApi() {
  const conn = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  return {
    work: {
      getWork: () => conn.get('/work/get_work/1'),
      updateCode: (codeId: number, content: string) => {
        return conn.post(`/work/update_code/${codeId}`, { content });
      },
      addCode: (workId: number, filename: string, type: string) => {
        return conn.post(`/work/${workId}/new_code`, {
          filename, type,
        });
      },
      deleteCode: (codeId: number) => {
        return conn.post(`/work/delete_code/${codeId}`);
      },
    },
  };
}
