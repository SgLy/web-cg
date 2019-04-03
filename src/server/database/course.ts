import { query } from './index';

export async function list(offset: number) {
  const result: ICourse[] = await query(
    'SELECT * FROM course ORDER BY id LIMIT 10 OFFSET ?',
    [offset],
  );
  return {
    success: 1,
    courses: result.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      teacher: r.teacher,
    })),
  };
}

export async function registerCourse(userId: number, courseId: number) {
  const result = await query(
    'INSERT INTO course_reg (user_id, course_id) VALUES (?, ?)',
    [userId, courseId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function unregisterCourse(userId: number, courseId: number) {
  const result = await query(
    'DELETE FROM course_reg WHERE user_id = ? AND course_id = ?',
    [userId, courseId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function setCourseTA(userId: number, courseId: number) {
  const result = await query(
    'INSERT INTO course_ta (user_id, course_id) VALUES (?, ?)',
    [userId, courseId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function unsetCourseTA(userId: number, courseId: number) {
  const result = await query(
    'DELETE FROM course_ta WHERE user_id = ? AND course_id = ?',
    [userId, courseId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function add(name: string, description: string, teacher: string) {
  const result = await query(
    'INSERT INTO course (name, description, teacher) VALUES (?, ?, ?)',
    [name, description, teacher],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function remove(courseId: number) {
  const result = await query(
    'DELETE FROM course WHERE id = ?',
    [courseId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}
