import React from "react";  
import { useState } from 'react'

const Banned = ({list=[], onClick}) => {
    return (
      <div className="banlist">
        <h3>Features You Have Banned</h3>
            <p>Reminder To Unban Please Click The Feature Button</p>
            {list.map((item, index) => (
                <button key={index} onClick={() => onClick(item)}>{item}</button>
          ))}
      </div>
    );
  };
  
  export default Banned;