import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import AnswerForm from './AnswerForm';

interface Answer {
  id: string;
  questionId: string;
  avatar: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
}

interface DiscussionPostProps {
  id: string;
  avatar: string;
  author: string;
  title: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  tags?: string[];
  answers?: Answer[];
  showAnswerForm?: boolean;
}

const DiscussionPost: React.FC<DiscussionPostProps> = ({
  id,
  avatar,
  author,
  title,
  content,
  timeAgo,
  likes,
  comments,
  tags = [],
  answers = [],
  showAnswerForm = false,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const { addAnswer } = useCommunity();

  const handleAnswer = (content: string) => {
    addAnswer(id, {
      questionId: id,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      author: 'Current User',
      content,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4">
        <img
          src={avatar}
          alt={`${author}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{author} · {timeAgo}</p>
            </div>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-gray-700 mb-4">{content}</p>
          
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-200">
              <ThumbsUp className="w-5 h-5 mr-1" />
              <span>{likes}</span>
            </button>
            <button 
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5 mr-1" />
              <span>{answers.length || comments}</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-200">
              <Share2 className="w-5 h-5 mr-1" />
              <span>Share</span>
            </button>
          </div>

          {showAnswers && answers.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-gray-900">Answers</h4>
              {answers.map((answer) => (
                <div key={answer.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <img
                      src={answer.avatar}
                      alt={`${answer.author}'s avatar`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{answer.author}</p>
                      <p className="text-sm text-gray-600">{answer.timeAgo}</p>
                      <p className="mt-2 text-gray-700">{answer.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showAnswerForm && (
            <div className="mt-6">
              <AnswerForm onSubmit={handleAnswer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionPost;