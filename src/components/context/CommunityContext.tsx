import React, { createContext, useContext, useState } from 'react';

interface Question {
  id: string;
  avatar: string;
  author: string;
  title: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  tags: string[];
  answers: Answer[];
}

interface Answer {
  id: string;
  questionId: string;
  avatar: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
}

interface CommunityContextType {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'timeAgo' | 'likes' | 'comments' | 'answers'>) => void;
  addAnswer: (questionId: string, answer: Omit<Answer, 'id' | 'timeAgo' | 'likes'>) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (newQuestion: Omit<Question, 'id' | 'timeAgo' | 'likes' | 'comments' | 'answers'>) => {
    const question: Question = {
      id: Math.random().toString(36).substr(2, 9),
      timeAgo: 'Just now',
      likes: 0,
      comments: 0,
      answers: [],
      ...newQuestion,
    };
    setQuestions(prev => [question, ...prev]);
  };

  const addAnswer = (questionId: string, newAnswer: Omit<Answer, 'id' | 'timeAgo' | 'likes'>) => {
    const answer: Answer = {
      id: Math.random().toString(36).substr(2, 9),
      questionId,
      timeAgo: 'Just now',
      likes: 0,
      ...newAnswer,
    };

    setQuestions(prev => prev.map(question => 
      question.id === questionId
        ? { ...question, answers: [...question.answers, answer] }
        : question
    ));
  };

  return (
    <CommunityContext.Provider value={{ questions, addQuestion, addAnswer }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}