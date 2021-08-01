import {React,useState} from 'react';
import {Link} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import './Join.css'
function Join() {
    const [name,setName]=useState('')
    const [room, setRoom]=useState('')
  
    return (
        
          <div class="login-form">
            <form >
                <h2 class="text-center">Join a room</h2>   
                <div class="form-group has-error">
                    <input type="text" class="form-control" placeholder="Username" onChange={e=>setName(e.target.value)}></input>
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" placeholder="room" onChange={e=>setRoom(e.target.value)}></input>
                </div>        
                <div class="form-group">
            
                <Link to={`/chat?name=${name}&room=${room}`} onClick={(e)=>
                    {
                        if(!name||!room)e.preventDefault()
                    }
                    }>
                    <Button variant="primary" type="submit">
                        Join
                    </Button>
                </Link>
                </div>
            </form>

        </div>
   
    )
}

export default Join
