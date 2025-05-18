import React from 'react';
import { Users, MessageCircle, Video } from 'lucide-react';

const peers = [
  {
    id: 1,
    name: "Sarah Johnson",
    subject: "Physics",
    status: "online",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    subject: "Chemistry",
    status: "studying",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    subject: "Mathematics",
    status: "offline",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  }
];

export default function PeerCollaboration() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Study Buddies</h2>
        <Users className="w-6 h-6 text-indigo-600" />
      </div>

      <div className="space-y-4">
        {peers.map(peer => (
          <div key={peer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={peer.avatar}
                  alt={peer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  peer.status === 'online' ? 'bg-green-500' :
                  peer.status === 'studying' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{peer.name}</h3>
                <p className="text-sm text-gray-500">{peer.subject}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        Find Study Partners
      </button>
    </div>
  );
}