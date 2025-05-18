import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, MicOff, Camera, CameraOff, Users, MessageSquare, X } from 'lucide-react';

interface LiveClassroomProps {
  title: string;
  onClose: () => void;
}

export function LiveClassroom({ title, onClose }: LiveClassroomProps) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const mockParticipants = [
    { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  useEffect(() => {
    startCamera();
    
    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setError('');
    } catch (err) {
      setError('Failed to access camera: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setIsCameraOn(false);
      setIsMicOn(false);
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOn;
        setIsCameraOn(!isCameraOn);
      }
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 flex">
          <div className={`flex-1 ${showChat ? 'w-3/4' : 'w-full'} bg-gray-900 p-4`}>
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-gray-800 rounded-lg relative overflow-hidden">
                {error ? (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <p className="text-red-400 text-center p-4">{error}</p>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                  You
                </div>
              </div>
              {mockParticipants.map(participant => (
                <div key={participant.id} className="bg-gray-800 rounded-lg relative">
                  <img 
                    src={participant.avatar} 
                    alt={participant.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                    {participant.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {showChat && (
            <div className="w-1/4 border-l flex flex-col">
              <div className="p-4 border-b">
                <h4 className="font-semibold">Class Chat</h4>
              </div>
              <div className="flex-1 p-4 space-y-4 overflow-auto">
                <div className="flex items-start space-x-2">
                  <img src="https://i.pravatar.cc/150?img=1" alt="" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-sm text-gray-600">Can you explain that last part again?</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <img src="https://i.pravatar.cc/150?img=2" alt="" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-sm text-gray-600">Great explanation, thanks!</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full ${
                isMicOn ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-white" />}
            </button>
            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full ${
                isCameraOn ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5 text-white" />}
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300">
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}