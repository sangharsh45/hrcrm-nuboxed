import React from 'react'
// import {ChatEngine} from 'react-chat-engine';
import DirectChat from './DirectChat';

//Using arrow function component
const LiveMessage = () => {
  return (
    
    // <ChatEngine
    //   userName='Ashok'//Put your userName instead
    //   projectID = '788789'// Your project id goes here
    //   userSecret='dj'// Replace with your secret key
    // />
    <DirectChat/>
   
  )
}
export default LiveMessage;