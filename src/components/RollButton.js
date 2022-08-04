import React from "react";
import '../style.css'

export default function RollButton(props) {
  return (
    <button
      className="roll-button"
      onClick={props.roll}
    >
      Roll
    </button>
  );
}
