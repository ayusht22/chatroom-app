import {React,useState,useEffect} from 'react'
import { Redirect } from 'react-router'
import io from 'socket.io-client'
import queryString from 'query-string'
import Bar from './Bar'
import Input from './Input'
import Messages from './Message/Messages'
import SideBar from './SideBar'
import './Chat.css'
let socket;
function Chat({location}) {
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [users,setUsers]=useState('')
    const[message,setMessage]=useState('')
    const[messages,setMessages]=useState([])
    const [loginErr,setLoginErr]=useState('');
    const ENDPOINT='https://chatapplication4.herokuapp.com/';
   
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);
        
        socket=io(ENDPOINT);
        socket.emit('join',{name,room},(error)=>{
        if(error){
            alert(error);
            setLoginErr(true);
        }
        });
        setName(name);
        setRoom(room);
        return ()=>{
           
            socket.off();
        }
    },[ENDPOINT,location.search])

    useEffect(()=>{
    socket.on('message',(message)=>{
        setMessages([...messages,message])
    })
    socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
      return ()=>{
          socket.off()
      }

    },[messages])
    
    
    const sendMessage=(e)=>{
     e.preventDefault();

     if(message){
         socket.emit('sendMessage',message,()=>{
          setMessage('');
         })
     }
    }
    if(loginErr)return <Redirect to="/"/>
    else return (
        <div className="outerContainer">
            <div className="Container">
            <Bar room={room}/>
            <Messages name={name} messages={messages}/>
            <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
            </div>
            <SideBar users={users}/>
        </div>
    )

    
}

export default Chat
