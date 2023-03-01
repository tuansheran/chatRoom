import React, { useEffect, useState } from 'react';

const Chat = ({socket, username, room}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
   
    

    const sendMessage = async () =>{  //
        if(currentMessage !== ""){

            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData)
            setMessageList((list)=>[...list,messageData]);
        }
    }

    //getting data from backend //call back function when you recive a message 
    useEffect(()=>{
        socket.on("recive_message", (data)=>{
            setMessageList((list)=>[...list,data]);
            
           
        });
    }, [socket])

    return (
        <div className='chat' class="bg-white h-5/6  w-5/6 rounded-lg overflow-hidden">

            <div className='chatHeader'>
                <h1 class="text-4xl font-bold py-3 text-center ">Live Chat💬</h1>
            </div>
         
            <div className='chatBody' class=" bg-yellow-200 h-4/5  rounded-md pt-2">
                {messageList.map((message)=>{

                    return( <div>
                        {username === message.author ? (
                            <div className='message' class=" flex items-center justify-between my-2 mx-2">
                                <div class=" bg-blue-500 rounded-t-lg rounded-l-lg px-4 py-2 ml-auto">
                                    <p class=" text-black text-base">{message.message}</p>
                                    <p class="italic text-gray-600 text-xs">You |  {message.time}</p>
                                </div>
                            </div>
                                
                        ) : (
                            <div className='message' class=" flex items-center justify-start my-2 mx-2">
                                <div class=" bg-emerald-400 rounded-t-lg rounded-r-lg px-4 py-2">
                                    <p class=" text-black text-base">{message.message} </p>
                                    <p class="italic text-gray-600 text-xs">{message.author} {message.time}</p>
                                </div>
                            </div>
                        )}
                        </div>)
                       

                })}
            </div>
           {/* <br/> */}
            <div className='chatFooter' class="flex p-4 pb-8 outline-dashed"> 
                <input type='text' class=" flex-grow rounded-md bg-slate-200 focus: outline-blue-400 h-10"
                    onChange={(event)=>{
                        setCurrentMessage(event.target.value);
                }}
                />
                <button onClick={sendMessage} class="rounded-lg">⚡</button>
            </div>
            
        </div>
    );
};

export default Chat;