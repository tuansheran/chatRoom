import io from "socket.io-client"
import { useEffect, useState } from "react";
import Chat from "./Chat";


const socket = io.connect("http://localhost:3001");

function App() {

  const [userName, setUserName] = useState();
  const [room, setRoom] = useState();
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if(userName !== "" && room !== ""){
        socket.emit("join__room", room)
        setShowChat(true);
    };

  }

  useEffect(()=>{
    

  }, [socket]);

  return (
    <div className="container" class= "flex justify-center items-center h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 ">
      {!showChat ? (

        <div className="joinRoomContainer" class="bg-slate-50 h-1/2  w-1/3 flex justify-center items-center rounded-md shadow-xl" >

          <div className="joinRoom" class=" bg-slate-50  w-80 h-fit text-center ">

            <h1 class="text-4xl font-bold py-4 text-center">Join Chat</h1>

            <input type="text" placeholder="Name" class="my-3 bg-gray-60 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event)=>{
                setUserName(event.target.value);
                }}
              />

            <br/>
            <br/>
            <input type="text" placeholder="Room..ID"  class="my-3 bg-gray-60 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event)=>{
                setRoom(event.target.value);
            }}
              />
            <br/>
            <br/>

            <button onClick={joinRoom} class="bg-blue-700 text-white rounded-lg p-2 px-3 text-center mx-auto">Join Room</button>

          </div>
          
        </div>) : 
        (<Chat socket={socket} room={room} username={userName}/>
      )}
           
      
    
    </div>
   
    
  );
}

export default App;
