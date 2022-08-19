import { MdOutlineCallEnd } from 'react-icons/md';
import { AiOutlineSetting } from 'react-icons/ai';
import { TbScreenShareOff, TbScreenShare } from 'react-icons/tb';
import { BsMicMute, BsMic, BsCameraVideoOff, BsCameraVideo } from 'react-icons/bs';
import SessionInfo from '../SessionInfo';
import AgoraRTC from "agora-rtc-sdk-ng"
import SettingsModal from '../SettingsModal';
import { useEffect } from 'react';


export default function VideoPanelHost() {
  let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
  };

  let options = {
    // Pass your App ID here.
    appId: "cb587ba5fd94498e8b03260bbdec69c4",
    // Set the channel name.
    channel: "test",
    // Pass your temp token here.
    token: "006cb587ba5fd94498e8b03260bbdec69c4IABmjlvsaWlUvUxVfUel6V1F/137//dIx8hn+/8E2e1sHgx+f9gAAAAAEAASvOWQNR39YgEAAQA9Hf1i",
    // Set the user ID.
    uid: Math.floor(Math.random() * 10000),
  };


  const startSession = () => {
    startBasicCall();
  }


  async function startBasicCall() {
    // Create an AgoraRTCClient object.
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    // Join an RTC channel.
    await rtc.client.join(options.appId, options.channel, options.token, options.uid);
    // Create a local audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the RTC channel.
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    // Dynamically create a container in the form of a DIV element for playing the local video track.
    const localPlayerContainer = document.createElement("div");
    // Specify the ID of the DIV container. You can use the uid of the local user.
    localPlayerContainer.id = options.uid;
    localPlayerContainer.textContent = "Local user " + options.uid;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    document.querySelector('#zzz').append(localPlayerContainer);
    // document.body.append(localPlayerContainer);

    // Play the local video track.
    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
    rtc.localVideoTrack.play(localPlayerContainer);
    console.log("publish success!");


    setTimeout(() => {
      getUserPulised()
    }, 2000)








  }

  const sessionLeftHandler = async () => {
    //  Destroy the local audio and video tracks.
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();

    // Traverse all remote users.
    rtc.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV containers.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });

    // Leave the channel.
    await rtc.client.leave();
  }

  function getUserPulised() {
    const localPlayerContainer = document.createElement("div");
    // Specify the ID of the DIV container. You can use the uid of the local user.
    localPlayerContainer.id = options.uid;
    localPlayerContainer.textContent = "Local user " + options.uid;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
    rtc.client.on("user-published", async (user, mediaType) => {
      console.log('VideoPanel :: user-published :: user, mediaType :: ', user, mediaType);
      // Subscribe to the remote user when the SDK triggers the "user-published" event
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");

      // If the remote user publishes a video track.
      if (mediaType === "video") {
        // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const remotePlayerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the uid of the remote user.
        remotePlayerContainer.id = user.uid.toString();
        remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
        remotePlayerContainer.style.width = "640px";
        remotePlayerContainer.style.height = "480px";
        // document.body.append(remotePlayerContainer);
        document.querySelector('#zzz').append(localPlayerContainer);

        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(remotePlayerContainer);
      }

      // If the remote user publishes an audio track.
      if (mediaType === "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        const remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }

      // Listen for the "user-unpublished" event
      rtc.client.on("user-unpublished", user => {
        // Get the dynamically created DIV container.
        const remotePlayerContainer = document.getElementById(user.uid);
        // Destroy the container.
        remotePlayerContainer.remove();
      });
    });

  }

  useEffect(() => {
    
  }, [])


  return (
    <>
      <div className="h-full flex flex-col" >
        <div className='py-4 bg-slate-700'>
          <SessionInfo />
        </div>
        <div className='h-auto flex-1' id='zzz' >
          {/* <video style={{
            height: '100%',
            width: '100%'
          }}>
          </video> */}
        </div>
        <div className='flex items-stretch justify-center py-4 bg-slate-700'>
          <button className='text-2xl rounded-full p-2 mx-3 bg-white'><BsCameraVideoOff className='text-gray-600 font-bold' /> </button>
          <button className='text-2xl rounded-full p-2 mx-3 bg-white'><BsMicMute className='text-gray-600 font-bold' /> </button>
          <button className='text-2xl rounded-full p-2 mx-3 bg-white'><TbScreenShare className='text-gray-600 font-bold' /> </button>
          <button className='text-2xl rounded-full p-2 mx-3 bg-white'><AiOutlineSetting className='text-gray-600 font-bold' /> </button>
          <button className='text-2xl rounded-full p-2 mx-3 bg-white'><MdOutlineCallEnd className='text-gray-600 font-bold' /> </button>
        </div>
      </div>
      <div className='z-10 absolute top-0 left-0 w-full h-full'>
        <div className='flex items-center h-full w-4/6 m-auto' >
          <SettingsModal startSession={startSession} />
        </div>
      </div>
    </>
  )
}
