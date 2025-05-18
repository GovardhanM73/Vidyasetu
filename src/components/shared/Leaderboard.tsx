import React from 'react';

interface LeaderboardUser {
  rank: number;
  avatar: string;
  name: string;
  points: number;
}

interface LeaderboardProps {
  title: string;
  users: LeaderboardUser[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, users }) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-600';
      case 2:
        return 'bg-gray-100 text-gray-600';
      case 3:
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-indigo-50 text-indigo-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`${getRankColor(user.rank)} w-8 h-8 rounded-full flex items-center justify-center font-semibold`}>
                {user.rank}
              </div>
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <span className="text-sm text-gray-600">{user.points.toLocaleString()} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;