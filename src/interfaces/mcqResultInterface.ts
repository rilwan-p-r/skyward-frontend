export interface McqResultInterface {
    _id: string;
    studentId: string;
    mcqCompetitionId: string;
    answers: number[];
    score: number; 
    completed: boolean; 
  }
  