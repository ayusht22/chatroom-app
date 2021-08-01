import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import './Bar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
     <a href="/" ><CancelIcon style={{fontSize:30,fill:'black'}}/></a>
    </div>
  </div>
);

export default InfoBar;