
import '../mainStyles/mainRoom.css'
import React, { useState, useEffect } from 'react';
// all the icon needed
import enterFullScreen from './toggleVideoIcon/fullscreen.png'
import exitFullScreen from './toggleVideoIcon/exitFullscreen.png'

import { CgScreen } from 'react-icons/cg';
import { FiCameraOff } from 'react-icons/fi';
import { FiCamera } from 'react-icons/fi';
import { BiMicrophoneOff } from 'react-icons/bi';
import { BiMicrophone } from 'react-icons/bi';
import { RiFullscreenFill } from 'react-icons/ri';
import { RiFullscreenExitLine } from 'react-icons/ri';


import { useNavigate } from "react-router-dom";

export default function VideoControl(props) {
    const { rtcClient, tracks, setJoined, videoDiv, trackState, setTrackState, leaveRTMchannel, shareScreenHandler, closeShareScreenHandler, screenShareState } = props;
    const navigate = useNavigate();

    const mute = async (mediaType) => {
        if (mediaType === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState(ps => {
                return { ...ps, audio: !ps.audio };
            });
        }
        if (mediaType === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState(ps => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    const fullScreenHandler = () => {
        if (document.fullscreenElement) {
            videoDiv.exit()
        }
        if (!document.fullscreenElement) {
            videoDiv.enter()
        }
    }

    const leaveChannel = async () => {
        navigate('/room')
        await rtcClient.leave();
        rtcClient.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setJoined(false);
        leaveRTMchannel();
    };

    const toggleScreenShare = async () => {
        if (screenShareState) {
            const shareScreenBtn = document.querySelector("#share-screen")
            shareScreenBtn.classList.remove("screen-sharing");
            if (trackState.video === false) {
                await tracks[1].setEnabled(!trackState.video);
                setTrackState(ps => {
                    return { ...ps, video: !ps.video };
                });
            }
            closeShareScreenHandler();
        }
        if (!screenShareState) {
            if (trackState.video === false) {
                await tracks[1].setEnabled(!trackState.video);
                setTrackState(ps => {
                    return { ...ps, video: !ps.video };
                });
            }
            const shareScreenBtn = document.querySelector("#share-screen")
            shareScreenBtn.classList.add("screen-sharing");
            shareScreenHandler()
        }
    }

    return (
        <>
            <div className="video-action-button camera-btn" onClick={() => mute("video")} title="Camera">
                {trackState.video && <FiCamera />}
                {!trackState.video && <FiCameraOff />}
            </div>
            <div className="video-action-button microphone-btn" onClick={() => mute("audio")} title="Microphone">
                {trackState.audio && <BiMicrophone />}
                {!trackState.audio && <BiMicrophoneOff />}
            </div>
            <div className="video-action-button full-screen-btn" onClick={() => fullScreenHandler()} title="Full screen">
                {document.fullscreenElement && <RiFullscreenExitLine />}
                {!document.fullscreenElement && <RiFullscreenFill />}
            </div>
            <div className="video-action-button" id='share-screen' onClick={() => toggleScreenShare()} title="Share screen">
                <CgScreen />
            </div>
            <button className="video-action-button endcall" onClick={() => leaveChannel()}>Leave</button>
        </>
    )
} 