interface IUser {
  id: number;
  phone: string;
  password: string;
  student_id?: string;
  nickname: string;
  realname: string;
  gender: number;
}

interface ICourse {
  id: number;
  name: string;
  teacher: string;
}

interface ICourseReg {
  id: number;
  user_id: number;
  course_id: number;
}

interface ICourseTA {
  id: number;
  user_id: number;
  course_id: number;
}

interface IAssignment {
  id: number;
  course_id: number;
  name: string;
  deadline: number;
}

interface ISubmission {
  id: number;
  user_id: number;
  work_id: number;
  assignment_id: number;
  submitTime: number;
}

interface IWork {
  id: number;
  user_id: number;
  name: string;
  public: boolean;
}

interface ICode {
  id: number;
  work_id: number;
  filename: string;
  content: string;
  type: string;
}
