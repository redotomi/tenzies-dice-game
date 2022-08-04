import React from "react";
import '../style.css'

export default function Die(props) {
  return (
    <div className="die">
      {props.value}
    </div>
  );
}
