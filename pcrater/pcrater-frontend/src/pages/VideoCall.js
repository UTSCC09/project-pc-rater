//Credits:
//React Group Video Chat | simple-peer webRTC: https://www.youtube.com/watch?v=R1sfHPwEH7A&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=3


import React, { useState, useEffect, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import {useLocation} from 'react-router-dom';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import "./VideoCall.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaVolumeDown } from "react-icons/fa";  
import { FaVolumeMute } from "react-icons/fa";  
import { FaVideo } from "react-icons/fa";  
import { FaVideoSlash } from "react-icons/fa";  
import { FaShareSquare } from "react-icons/fa";



const LowNavBar = ({ peers, isDrawing, setIsDrawing, userVideo }) => {
    const [ isMuted, setIsMuted ] = useState(false);
    const [ isVideoOn, setIsVideoOn ] = useState(true);

    const shareScreen = () => {
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
            peers.forEach(peer => peer.peer.replaceTrack(peer.peer.streams[0].getTracks().find(track => track.kind === "video"), stream.getTracks().find(track => track.kind === "video"), peer.peer.streams[0]));
            let previousUserScreen = userVideo.current.srcObject;
            userVideo.current.srcObject = stream;
            const screenTrack = stream.getTracks()[0];
            screenTrack.onended = function(){
                peers.forEach(peer => peer.peer.replaceTrack(peer.peer.streams[0].getTracks().find(track => track.kind === "video"), previousUserScreen.getTracks().find(track => track.kind === "video"), peer.peer.streams[0]));
                userVideo.current.srcObject = previousUserScreen;
                handleCameraToggle();
            };
        });
    };



    const handleCameraToggle = () => {
        const videoTrack = userVideo.current.srcObject.getTracks().find(Track => Track.kind == 'video');
        if(videoTrack.enabled){
            videoTrack.enabled = false;
        }else{
            videoTrack.enabled = true;
        }
        setIsVideoOn(!isVideoOn);
    };

    const handleAudioToggle = () => {
        const audioTrack = userVideo.current.srcObject.getTracks().find(Track => Track.kind == 'audio');
        if(audioTrack.enabled){
            audioTrack.enabled = false;
        }else{
            audioTrack.enabled = true;
        }
        setIsMuted(!isMuted);
    };

    return (
        <div className="d-flex low_nav_bar">
            <span onClick={() => handleAudioToggle()} id="low_nav_bar_icon_first" className='low_nav_bar_icon'> 
                {!isMuted ?
                <FaVolumeDown size={20} /> :
                <FaVolumeMute size={20} />
                }
            </span>
            <span onClick={() => handleCameraToggle()} className='low_nav_bar_icon'> 
                {isVideoOn ?
                <FaVideo size={20} /> :
                <FaVideoSlash size={20} />
                }
            </span>
            <span onClick={shareScreen} id="screen_share_icon" className="low_nav_bar_icon">
                <span className="mr-1">Screen Share </span>
                <FaShareSquare size={20} />
            </span>
            {isDrawing ?
            <span onClick={() => setIsDrawing(false)} id="first_low_nav_bar_text" className='low_nav_bar_text'> Video Room</span> :
            <span onClick={() => setIsDrawing(false)}  id="first_low_nav_bar_text" className='low_nav_bar_text selected_nav_bar_text'> Video Room</span>
            }
            {!isDrawing ?
                <span onClick={() => setIsDrawing(true)} className='low_nav_bar_text'> Drawing </span> :
                <span onClick={() => setIsDrawing(true)} className='low_nav_bar_text selected_nav_bar_text'> Drawing </span>
            }
        </div>
    )
}

const Video = (props) => {


    const ref = useRef();
    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        });
    }, []);

    return (
        <video  className="self_video" playsInline autoPlay ref={ref} />
        // <video className={props.isDrawing ? "self_video" : "self_video_hidden"} playsInline autoPlay ref={ref} />
    );
};


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};



const VideoCall = (props) => {
    const [ isDrawing, setIsDrawing ] = useState(false);
    const location = useLocation(); 
    const roomID  = location.state.id;

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const senders = useRef([]);

    useEffect(() => {
        const socket = io.connect('http://localhost:8000/');
        socketRef.current = socket;

        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
           
           userVideo.current.srcObject = stream;
           socketRef.current.emit("join room", roomID);
           socketRef.current.on("all users", users => {
               let peers = [];
               users.forEach(userID  => {
                   const peer = createPeer(userID , socketRef.current.id, stream);
                   peersRef.current.push({
                       peerID: userID , 
                       peer
                   });
                   peers.push({
                       peerID: userID,
                       peer,
                   });
                });
                setPeers(peers);
           });

           socketRef.current.on("user joined", payload => {
               const peer = addPeer(payload.signal, payload.callerID, stream);
               peersRef.current.push({
                   peerID: payload.callerID,
                   peer
               });

               const peerObj = {
                   peer,
                   peerID: payload.callerID,
                };

               setPeers(users => [...users, peerObj]);
           });

           socketRef.current.on("receiving returned signal", payload => {
                const item =  peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
           });

           socketRef.current.on("user left", function(id){
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if(peerObj){
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
           });

        });
    }, []);

    function createPeer(userToSignal, callerID, stream) {
       const peer = new Peer({
           initiator: true,
           trickle: false,
           stream
       });
       peer.on("signal", signal => {
           socketRef.current.emit("sending signal", { userToSignal, callerID, signal });
       });

       return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
       const peer = new Peer({
           initiator: false,
           trickle: false,
           stream
       });
       peer.on("signal", signal => {
           socketRef.current.emit("returning signal", { signal, callerID });
       });
       peer.signal(incomingSignal);

       return peer;
    }
    return (
        <div>
            <div className={!isDrawing ? 'videos_container' : 'videos_container_hidden'}>
                <video  className={!isDrawing ? "self_video" : "self_video_hidden"} muted ref={userVideo} autoPlay playsInline />
                {/* <video className="self_video" muted ref={userVideo} autoPlay playsInline /> */}
                {peers.map((peer) => {
                    return (
                        // <Video isDrawing={isDrawing} key={peer.peerID} peer={peer.peer} />
                        <Video key={peer.peerID} peer={peer.peer} />
                    );
                })}
            </div>
            <div className={isDrawing ? 'drawing_container' : "drawing_container_hidden"}>Drawing room</div>
            {/* <div className='drawing_container'>Drawing room</div> */}
            <LowNavBar peers={peers} isDrawing={isDrawing} setIsDrawing={setIsDrawing} userVideo={userVideo} />
        </div>
    );
}

export default VideoCall;