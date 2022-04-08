// Credits:
// React Group Video Chat | simple-peer webRTC: https://www.youtube.com/watch?v=R1sfHPwEH7A&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=3
// Handle User Disconnect in WebRTC Group Video Chat https://www.youtube.com/watch?v=0fWN_q4zAqs&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=10
// WebRTC Screen Sharing Tutorial: https://www.youtube.com/watch?v=X8QHHB7DA90&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=4
// How To Mute Mic or Toggle Cam In WebRTC Video Chat? : https://www.youtube.com/watch?v=Uk5DbEnFNP0&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=14
// React Chat App Using Socket.IO | Socket IO Tutorial: https://www.youtube.com/watch?v=E4V6nbP_NoQ
// Develop Collaborative White Board : Web socket, Node JS & React JS : https://www.youtube.com/watch?v=LZTWYdU4nKk
// Develop Collaborative White Board : Web socket, Node JS & React JS | Part 2 : https://www.youtube.com/watch?v=bQy6WpIXW18
// LETS BUILD A DRAWING APPLICATION USING REACT AND CANVAS API: https://www.youtube.com/watch?v=FLESHMJ-bI0

import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEraser, FaPencilAlt, FaRegCommentAlt, FaRegCommentDots, FaShareSquare, FaVideo, FaVideoSlash, FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Peer from "simple-peer";
import io from "socket.io-client";
import { AuthContext } from '../context/auth';
import "./VideoCall.css";


//Drawing room with all of its attributes and functionalities 
const Drawing_Container = ({ setIsAUserDrawing, isAUserDrawing, isDrawing, socket, roomID }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const timeoutRef = useRef();

    const [ isMouseDown, setIsMouseDown ] = useState(false);
    const [ mode, setMode ]  = useState("drawing");
    const [ color, setColor ] = useState("black");


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width  = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerHeight}px`;
        canvas.style.height = `${window.innerWidth}px`;
        const context = canvas.getContext('2d');
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = 3;
        contextRef.current = context;
        socket.on("get cur board", function(data){
            if(data.drawingBoardData !== undefined && data.roomID === roomID){
                let interval = setInterval(function(){
                    if(isAUserDrawing) return;
                    setIsAUserDrawing(true);
                    clearInterval(interval);
                    let image = new Image();
                    image.src = data.drawingBoardData;
                    image.onload = function(){
                        contextRef.current.drawImage(image, 0, 0);
                        setIsAUserDrawing(false);
                    };
                }, 200);
            }
        });
        socket.on("canvas-data", function(data){
            if(data.roomID === roomID){
                let interval = setInterval(function(){
                    if(isAUserDrawing) return;
                    setIsAUserDrawing(true);
                    clearInterval(interval);
                    let image = new Image();
                    image.src = data.base64ImageData;
                    image.onload = function(){
                        contextRef.current.drawImage(image, 0, 0);
                        setIsAUserDrawing(false);
                    };
                }, 200);
            }
        }); 
        socket.on("clear board", function(){
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        });
    }, []);

    const startDrawing = (synthetic_base_event) => {
        const { offsetX, offsetY } = synthetic_base_event.nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX * 2, offsetY * 2);
        setIsMouseDown(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsMouseDown(false);
    };

    const draw = (synthetic_base_event) => {
        if(!isMouseDown){
            return;
        }
        const { offsetX, offsetY } = synthetic_base_event.nativeEvent;
        contextRef.current.lineTo(offsetX * 2, offsetY * 2);
        contextRef.current.stroke();
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current= setTimeout(function(){
            let base64ImageData = canvasRef.current.toDataURL("image/png");
            socket.emit("canvas-data", { base64ImageData, roomID });
        }, 1000);
    };

    const handleClearBoard = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        socket.emit("clear");
    };

    const handleEraser = () => {
        contextRef.current.strokeStyle = "white";
        setMode("eraser");
    };

    const handleDrawIconPress = () => {
        contextRef.current.strokeStyle = color;
        setMode("drawing");
    };

    return (
        <div className={isDrawing ? 'drawing_container' : "drawing_container_hidden"}>
            <span className='change_color_text'>Change Color:</span> <input className="color-picker" type="color" onChange={(e) => {
                contextRef.current.strokeStyle = e.target.value;
                setColor(e.target.value);
            }} />
            <span className='change_color_text'>Select Brush Size: &nbsp;
                <select defaultValue={3} onChange={(e) => {
                    contextRef.current.lineWidth = e.target.value;
                }}>
                    <option>1</option>
                    <option>3</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>30</option>
                    <option>50</option>
                </select>
            </span> &nbsp; &nbsp;
            <FaEraser onClick={handleEraser} className={mode!=="eraser" ? 'fa_eraser' : 'fa_eraser_chosen'}  size={mode==="eraser" ? 27 : 23} /> &nbsp; &nbsp;
            <FaPencilAlt onClick={handleDrawIconPress} className={mode!=="drawing" ? 'fa_drawing_icon' : 'fa_drawing_icon_chosen'}  size={mode==="drawing" ? 27 : 23} /> &nbsp;
            <button onClick={handleClearBoard} className='clear_board_btn'>Clear Board</button>
            <canvas className='w-100 h-100 border-top border-dark mt-2' onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} ref={canvasRef} />
        </div>
    );
};

//Low navigation bar with all user options
const LowNavBar = ({ socket, peersList, isDrawing, setIsDrawing, videoStream, setShowChat, showChat, isNewMessage, setIsNewMessage }) => {
    const [ isMuted, setIsMuted ] = useState(false);
    const [ isVideoOn, setIsVideoOn ] = useState(true);
    const [ isScreenSharing, setIsScreenSharing ] = useState(false);
    const audioForScreenSharing = useRef();
    const previousUserScreenRef = useRef();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const shareScreen = () => {
        setIsScreenSharing(true);
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
            peersList.forEach(peer => peer.peer.replaceTrack(peer.peer.streams[0].getTracks().find(track => track.kind === "video"), stream.getTracks().find(track => track.kind === "video"), peer.peer.streams[0]));
            previousUserScreenRef.current = videoStream.current.srcObject;
            audioForScreenSharing.current = videoStream.current.srcObject.getTracks().find(track => track.kind === "audio");
            videoStream.current.srcObject = stream;
            stream.getTracks()[0].onended = function(){
                peersList.forEach(peer => peer.peer.replaceTrack(peer.peer.streams[0].getTracks().find(track => track.kind === "video"), previousUserScreenRef.current.getTracks().find(track => track.kind === "video"), peer.peer.streams[0]));
                videoStream.current.srcObject = previousUserScreenRef.current;
                setIsScreenSharing(false);
            };
        });
    };

    const stopScreenShare = () => {
        videoStream.current.srcObject.getTracks().forEach(track => track.stop());
        peersList.forEach(peer => peer.peer.replaceTrack(peer.peer.streams[0].getTracks().find(track => track.kind === "video"), previousUserScreenRef.current.getTracks().find(track => track.kind === "video"), peer.peer.streams[0]));
        videoStream.current.srcObject = previousUserScreenRef.current;
        setIsScreenSharing(false);
    };



    const handleCameraToggle = () => {
        const videoTrack = videoStream.current.srcObject.getTracks().find(Track => Track.kind === 'video');
        if(videoTrack.enabled){
            videoTrack.enabled = false;
        }else{
            videoTrack.enabled = true;
        }
        setIsVideoOn(!isVideoOn);
    };

    const handleAudioToggle = () => {
        let audioTrack;
        if(!isScreenSharing){
            audioTrack =  videoStream.current.srcObject.getTracks().find(Track => Track.kind === 'audio');
        }else{
            audioTrack = audioForScreenSharing.current;
        }
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
            {isNewMessage ?
            <span onClick={() =>  { 
                setShowChat(!showChat);
                setIsNewMessage(false);
            }} className='low_nav_bar_icon' >
                <FaRegCommentDots size={20} />
            </span> :
            <span onClick={() => setShowChat(!showChat)} className='low_nav_bar_icon'>
                <FaRegCommentAlt size={20} />
            </span>
            }

            <span id="screen_share_icon" className="low_nav_bar_icon">
                {!isScreenSharing ?
                <span onClick={shareScreen} className="mr-1">Screen Share </span> :
                <span onClick={stopScreenShare} className="mr-1">Stop Share</span>}
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
            <Button variant="danger" size="sm" className="leave_call_btn" onClick={() => {
                socket.emit("user leaves disconnect", user.username);
                setIsVideoOn(false);
                navigate('/posts');
            } }>Leave</Button>
        </div>
    )
}

//Individual video for a user (either current or peer)
const Video = ({ peerInCall, username }) => {
    let videoRef = useRef();
    peerInCall.on("stream", peerStream => {
        videoRef.current.srcObject = peerStream;
    });

    return (
        <figure>
            <video className="self_video" controls playsInline autoPlay ref={videoRef} />
            <figcaption className='username_text_below_video'>{username}</figcaption>
        </figure>
    );
};



//Main container for the video calls functionality that incopeartes all other related WebRTC components
const VideoCall = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [ isDrawing, setIsDrawing ] = useState(false);
    const [ isAUserDrawing, setIsAUserDrawing ] = useState(false);
    const location = useLocation(); 
    const roomID  = location.state.id;

    const [socketID, setSocketID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [ showChat, setShowChat ] = useState(true);
    const [ isNewMessage, setIsNewMessage ] = useState(false);

    const [showModal, setShowModal] = useState(false);
    

    const [peersList, setPeers] = useState([]);
    const videoStream = useRef();
    const peersListRef = useRef([]);

    let socket = io.connect('https://pcrater.me', {
	path: "/videocall"
    });

    // let socket = io.connect("http://localhost:9000");

    useEffect(() => {
	socket = io.connect('https://pcrater.me', {
		path: "/videocall"
    });
    // socket = io.connect("http://localhost:9000");


    socket.emit("check if user is in room", { "username": user.username, roomID });

    socket.on("user is already in room", () => {
        setShowModal(true);
    }); 

    socket.on("user is not in room yet", () => {
        navigator.mediaDevices.getUserMedia({ video: {
            height: 150,
            width: 330
        }, audio: true }).then(stream => {
        
            videoStream.current.srcObject = stream;
            socket.emit("joining", roomID);
            
            socket.on("socket id", (id) => {
                    setSocketID(id);
            });
    
    
            socket.on("message", (data) => {
                if(data.roomID === roomID){
                    if(data.socketID !== socket.id){
                        setIsNewMessage(true);
                    }
                    setMessages(prevMessages => [...prevMessages, data]);
                }
            });
            
            socket.on("init", (usersList) => {
                socket.emit("get cur board", roomID);
                usersList.forEach(curUser  => {
                    const peerToPush = constructNewPeer(curUser[0], socket.id, stream);
                    peersListRef.current.push({
                        peerID: curUser[0] , 
                        peer: peerToPush,
                        username: curUser[1]
                    });
                    setPeers(old_peers => [...old_peers, {
                        peerID: curUser[0],
                        peer: peerToPush,
                        username: curUser[1]
                    }]);
                });
            });
    
            socket.on("joined room", (data) => {
                const { sig, userOnCallID, username } = data;
                const peerToPush = appendToPeers(sig, userOnCallID, stream);
                peersListRef.current.push({
                    peerID: userOnCallID,
                    peer: peerToPush,
                    username: username
                });
    
    
                setPeers(old_peers => [...old_peers, { peer: peerToPush, peerID: userOnCallID, username }]);
            });
    
            socket.on("receiving", (data) => {
                    const item =  peersListRef.current.find(p => p.peerID === data.id);
                    item.peer.signal(data.signal);
            });
    

            socket.on("user disconnect", function(username){
                const peerObj = peersListRef.current.find(p => p.username === username);
                if(peerObj){
                    peerObj.peer.destroy();
                }
                const peersList = peersListRef.current.filter(p => p.username !== username);
                peersListRef.current = peersList;
                setPeers(peersList);
            });
     
            });
        })
       
    }, []);


    const sendMessage = (e) => {
        e.preventDefault();
        setIsNewMessage(false);
        if(message !== ""){
            socket.emit("sending message", {
                message,
                socketID,
                username: user.username, 
                roomID
            });
            setMessage("");
        }
    }

    const appendToPeers = (sig, userID, stream) => {
        const newPeer = new Peer({
            trickle: false,
            stream: stream
        });
        newPeer.on("signal", returnSignal => {
         socket.emit("returning", { signal: returnSignal, userID });
        });
        newPeer.signal(sig);
 
        return newPeer;
     }
 

    const constructNewPeer = (userID, userOnCallID, stream) => {
       const newPeer = new Peer({
           initiator: true,
           trickle: false,
           stream: stream
       });
       const username = user.username;
       newPeer.on("signal", (sig) => {
        socket.emit("sending", { userID, username, userOnCallID, sig });
       });

       return newPeer;
    }



    return (
        <div>
             <Modal show={showModal} animation={false}>
                    <Modal.Header>
                    <Modal.Title>You cannot join the same video room with the same account</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setShowModal(false);
                        navigate('/posts');
                    }}>
                        Go back to home page
                    </Button>
                    </Modal.Footer>
                </Modal>

            <div className={!isDrawing ? 'videos_container' : 'videos_container_hidden'}>
                <figure>
                    <video controls className={!isDrawing ? "self_video" : "self_video_hidden"} muted ref={videoStream} autoPlay playsInline />
                    <figcaption className='username_text_below_video font-weight-bold'>{user.username} (you)</figcaption>
                </figure>

                {peersList.filter((elmt, index) => { 

                    return peersList.map(peer => peer.peerID).indexOf(elmt.peerID) === index;
                 }).map((peer) => {
                    return (
                        <Video username={peer.username} key={peer.peerID} peerInCall={peer.peer} />
                    );
                })}
            </div>

            {showChat &&
                <div className="chat_container">
                  <div className="messages_container">
                     {messages.map((message, index) => {
                         if(message.socketID === socketID){
                            return (
                                <div className="message_container">
                                    <div className='current_message_username'>{message.username}</div>
                                    <div className="current_user_message">
                                        {message.message}
                                    </div>
                                </div>
                            );
                         }
                         return (
                             <div className="message_container">
                                <div className='other_message_username'>{message.username}</div>
                                <div className="other_user_message">
                                    {message.message}
                                </div>
                             </div> 
                        );
                     })}
                 </div>
                 <form className="send_message_form" onSubmit={sendMessage}>
                     <textarea className="send_message_text_area" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
                     <button className="send_message_btn">Send</button>
                 </form>
             </div>
            }
               
            <Drawing_Container setIsAUserDrawing={setIsAUserDrawing} isAUserDrawing={isAUserDrawing} isDrawing={isDrawing} socket={socket} roomID={roomID} />
            <LowNavBar socket={socket} peersList={peersList} isDrawing={isDrawing} setIsDrawing={setIsDrawing} videoStream={videoStream} showChat={showChat} setShowChat={setShowChat} isNewMessage={isNewMessage} setIsNewMessage={setIsNewMessage} />
        </div>
    );
}

export default VideoCall;
