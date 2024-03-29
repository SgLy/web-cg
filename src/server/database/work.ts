import { query } from './index';

export async function getWork(id: number) {
  const works = await query(
    'SELECT * FROM work WHERE id = ?',
    [id],
  ) as IWork[];
  if (works.length !== 1) return;
  const ret = {
    id: works[0].id,
    userId: works[0].user_id,
    name: works[0].name,
    public: works[0].public,
    codes: [] as {id: number, filename: string, content: string, type: string}[],
  };

  const codes = await query(
    'SELECT * FROM code WHERE work_id = ?',
    [id],
  ) as ICode[];
  codes.forEach(c => {
    ret.codes.push({
      id: c.id,
      filename: c.filename,
      content: c.content,
      type: c.type,
    });
  });

  return ret;
}

export async function newWork(name: string, userId: number) {
  const result = await query(
    'INSERT INTO work (user_id, name) VALUES (?, ?)',
    [userId, name],
  );
  if (result.affectedRows !== 1) return { success: 0 };
  const id = result.insertId;
  const code = await query(
    'INSERT INTO code (work_id, filename, content, type) VALUES (?, ?, ?, ?)',
    [id, 'index.js', '', 'javascript'],
  );
  return { success: 1, id };
}

export async function makePublic(id: number) {
  const result = await query(
    'UPDATE work SET public = TRUE WHERE id = ?',
    [id],
  );
  if (result.affectedRows === 1) return { success: 1 };
  else return { success: 0 };
}

export async function cancelPublic(id: number) {
  const result = await query(
    'UPDATE work SET public = FALSE WHERE id = ?',
    [id],
  );
  if (result.affectedRows === 1) return { success: 1 };
  else return { success: 0 };
}

export async function addCode(
  workId: number,
  filename: string,
  type: string,
) {
  const result = await query(
    'INSERT INTO code (work_id, filename, type, content) VALUES (?, ?, ?, "")',
    [workId, filename, type],
  );
  if (result.affectedRows === 1) return { success: 1, codeId: result.insertId };
  else return { success: 0 };
}

export async function updateCodeContent(codeId: number, content: string) {
  const result = await query(
    'UPDATE code SET content = ? WHERE id = ?',
    [content, codeId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  else return { success: 0 };
}

export async function updateCodeFilename(codeId: number, filename: string) {
  const result = await query(
    'UPDATE code SET filename = ? WHERE id = ?',
    [filename, codeId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  else return { success: 0 };
}

export async function deleteCode(codeId: number) {
  const result = await query(
    'DELETE FROM code WHERE id = ?',
    [codeId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  else return { success: 0 };
}

export async function getWorkList(userId: number) {
  const result: IWork[] = await query(
    'SELECT * FROM work WHERE user_id = ?',
    [userId],
  );
  return result.map((r: IWork) => ({
    name: r.name,
    id: r.id,
  }));
}
