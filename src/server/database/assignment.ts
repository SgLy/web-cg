import { query } from './index';

export async function add(courseId: number, name: string, deadline: number) {
  const result = await query(
    'INSERT INTO assignment (course_id, name, deadline) VALUES (?, ?, ?)',
    [courseId, name, deadline],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function remove(assignmentId: number) {
  const result = await query(
    'DELETE FROM assignment WHERE id = ?',
    [assignmentId],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function submit(userId: number, workId: number, assignmentId: number, timestamp: number) {
  await query(
    'DELETE FROM submission WHERE user_id = ? AND assignment_id = ?',
    [userId, assignmentId],
  );
  const result = await query(
    'INSERT INTO submission (user_id, work_id, assignment_id, submit_time) VALUES (?, ?, FROM_UNIXTIME(?))',
    [userId, workId, assignmentId, timestamp],
  );
  if (result.affectedRows === 1) return { success: 1 };
  return { success: 0 };
}

export async function listByUser(userId: number) {
  const result: any[] = await query(`
    SELECT
      id AS assignment_id,
      course_id,
      name AS assignment_name,
      deadline
    FROM assignment
    RIGHT JOIN (
      SELECT course_id FROM course_reg
      WHERE user_id = ?
    ) AS my_course
    ON my_course.course_id = assignment.course_id
    LEFT JOIN course
    ON course.id = assignment.course_id`, [userId],
  );
  return {
    success: 1,
    assignments: result.map(r => ({
      id: r.assignment_id,
      courseId: r.course_id,
      name: r.assignment_name,
      deadline: r.deadline,
      courseName: r.name,
      courseDescription: r.description,
      teacher: r.teacher,
    })),
  };
}

export async function listByCourse(courseId: number) {
  const result: IAssignment[] = await query(
    'SELECT * FROM assignment WHERE course_id = ?',
    [courseId],
  );
  return {
    success: 1,
    assignments: result.map(r => ({
      id: r.id,
      name: r.name,
      deadline: r.deadline,
    })),
  };
}
