interface IUser {
  id: number;
  phone: string;
  email: string;
  password: string;
  role: number;
  id_number: string;
  nickname: string;
  name: string;
  gender: number;
}

interface ISchool {
  id: number;
  name: string;
  city: string;
  approve: boolean;
  applicant: number;
  application_time: number,
}

interface ISchoolManager {
  id: number;
  user_id: number;
  school_id: number;
  approve: boolean;
  application_time: number,
}

interface IContest {
  id: number;
  name: string;
  start_date: string;
  location: string;
}

interface IContestant {
  id: number;
  contest_id: number;
  user_id: number;
  examination_id: string;
  school_id: number;
  level: number;
  grade: number;
  formal: boolean;
  delegate: boolean;
  approve: boolean;
  application_time: number;
  judge_application_id: number;
}

interface IContestantApplication {
  id: number;
  approve: boolean;
  application_time: number,
  submit_user_id: number;
}

interface IMessage {
  id: number;
  user_id: number;
  read: boolean;
  content: string;
}
