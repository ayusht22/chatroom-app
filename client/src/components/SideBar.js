import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './SideBar.css'
import {Card} from 'react-bootstrap'
function SideBar({users}) {
    return (
    <div className="sideBar">
    
    {
      users
        ? (
         
          <div className="users">
            <h2 className="head">Users in the room </h2>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <Card key={name}  className="mb-2"style={{width:'18rem',background:'#F3F3F3',borderRadius:'8px'}}>
                  <Card.Body>
                    <Card.Title >
                      <FiberManualRecordIcon style={{fill:'green',fontSize:'15',marginRight:'4px'}}/>
                      {name}
                    </Card.Title>
                  </Card.Body>
                  </Card>
                ))}
              </h2>
            </div>
          </div>
          
        )
        : null
    }
  </div>
  
    )
}

export default SideBar
