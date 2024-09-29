import React, { useEffect, useRef } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

interface JitsiMeetProps {
  roomName: string;
  displayName: string;
  email?: string;
  onApiReady?: (api: any) => void;
}

const JitsiMeet: React.FC<JitsiMeetProps> = ({ roomName, displayName, email, onApiReady }) => {
  console.log(roomName);
  const apiRef = useRef<any>(null);
  const handleApiReady = (api: any) => {
    apiRef.current = api;
    if (onApiReady) {
      onApiReady(api);
    }
  };

  useEffect(() => {
    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
    };
  }, []);

  return (
    <JitsiMeeting
      domain="meet.jit.si"
      roomName={roomName}
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: false,
        enableEmailInStats: false,
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      }}
      userInfo={{
        displayName: displayName,
        email: email || '', // Provide an empty string if email is not provided
      }}
      onApiReady={handleApiReady}
      getIFrameRef={(iframeRef) => { iframeRef.style.height = '600px'; }}
    />
  );
};

export default JitsiMeet;