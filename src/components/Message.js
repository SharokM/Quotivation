import React, { useEffect } from "react";

const Message = ({messageText, removeMessage}) => {

    useEffect(() => {
        const setTimerRemove = setTimeout(() => {
            removeMessage()
        }, 2000)

        window.setTimeout(setTimerRemove)
        return () => window.clearInterval(setTimerRemove);
    });

    return (
        <div className="message">
            <p> {messageText}</p>
            <span className="close-message" onClick={removeMessage}>X</span>
        </div>

    )
}

export default Message; 



      // const timeInterval = window.setInterval(() => {
      //   setTime(new Date());
      //   console.log("in timeInterval");
      //   // console.log("intvl");
      // }, 1000);
      // return () => window.clearInterval(timeInterval);