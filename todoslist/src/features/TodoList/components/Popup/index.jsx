import React from "react";
import "./popup.css"
function PopupScreen(props) {
  const { trigger, setTrigger, content } = props;
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="button-close-popup" onClick={()=>setTrigger(false)}>Close</button>
        <p className="popup-content">Nội dung</p>
          <p>{content}</p>
  
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupScreen;
