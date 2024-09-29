export interface MCQQuestion {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    score: number;
  }
  
  export interface MCQCompetitionInterface {
    _id: string;
    competitionTitle: string;
    competitionSummary: string;
    timeLimit: number;
    endDate: string;
    questions: MCQQuestion[];
  }