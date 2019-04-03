import { query } from './index';

export async function get(userId: number) {
  const result = await query(
    'SELECT * FROM user WHERE id = ?',
    [userId],
  );
  if (result.length !== 1) return { success: 0 };
  return {
    success: 1,
    ...result[0],
  };
}

export async function login(phone: string, password: string) {
  const result = await query(
    'SELECT * FROM user WHERE phone = ? AND password = ?',
    [phone, password],
  );
  if (result.length !== 1) return { success: 0 };
  const { id, student_id, nickname, realname, gender } = result[0];
  return {
    success: 1,
    phone, id, student_id, nickname, realname, gender,
  };
}

export async function register(phone: string, password: string) {
  const result = await query(`
    INSERT INTO user
      (phone, password, student_id, nickname, realname, gender)
    VALUES
      (?, ?, '', ?, '', 0)
    `, [phone, password, phone],
  );
  if (result.affectedRows !== 1) return { success: 0 };
  return {
    success: 1,
    id: result.insertId!,
  };
}
