export interface Day {
  id: number;
  title: string;
  nepaliTitle: string;
  description: string;
  nepaliDescription: string;
  lessonContent: string;
  nepaliLessonContent: string;
  referenceLink: string;
  vocabulary?: { word: string; definition: string; nepaliWord: string; nepaliDefinition: string }[];
  keyPoints?: { point: string; nepaliPoint: string }[];
  isGenerated?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  nepaliQuestion: string;
  options: string[];
  nepaliOptions: string[];
  correctAnswer: number; // index of options
}

export interface Phase {
  id: number;
  title: string;
  nepaliTitle: string;
  bannerImage: string;
  summary: string;
  nepaliSummary: string;
  days: Day[];
  quizzes: QuizQuestion[];
  resources: {
    title: string;
    nepaliTitle: string;
    url: string;
    type: 'doc' | 'video';
  }[];
  isQuizzesGenerated?: boolean;
}
