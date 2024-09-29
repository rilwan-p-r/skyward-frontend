export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    score: number;
  }
  
  export interface MCQFormValueInterface {
    competitionTitle: string;
    competitionSummary: string;
    timeLimit: number;
    endDate: string;
    questions: Question[];
  }