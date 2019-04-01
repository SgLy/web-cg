import { query } from './index';

export async function login(phone: string, password: string) {
  const result = await query(
    'SELECT * FROM user WHERE phone = ? AND password = ?',
    [phone, password],
  );
  if (result.length !== 1) return { success: 0 };
  const { id, email, student_id, nickname, realname, gender } = result[0];
  return {
    success: 1,
    phone, id, email, student_id, nickname, realname, gender,
  };
}
