export type Category = 'All' | 'Computer Science' | 'AI & ML' | 'Quantum Physics' | 'Neuroscience' | 'Philosophy' | 'Astrophysics';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz?: QuizQuestion;
  completed?: boolean;
}

export interface Chapter {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: Category;
  level: Difficulty;
  duration: string;
  image: string;
  author: string;
  rating: number;
  enrolledCount: number;
  chapters: Chapter[];
  progress?: number; // 0 to 100
  isBookmarked?: boolean;
  completed?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  completedCourses: string[]; // course ids
  bookmarkedCourses: string[]; // course ids
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    earned: boolean;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}
