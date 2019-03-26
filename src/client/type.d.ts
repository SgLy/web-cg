interface IWork {
  id: number;
  public: number;
  userId: number;
  codes: ICode[];
}

interface ICode {
  content: string;
  filename: string;
  id: number;
  type: string;
}