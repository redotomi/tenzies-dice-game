import React, { useState } from "react";
import Die from "./components/Die";
import RollButton from "./components/RollButton";
import './style.css'

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 1; i <= 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);
      const newDie = {
        value: randomNumber,
        isHeld: false
      }
      newDice.push(newDie);
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice())
  }

  return (
    <main>
      <div className="die-container">
        {dice.map((die, i) => (
          <Die
            value={die.value}
            key={i}
          />
        ))}
      </div>
      <RollButton
        roll={rollDice}
      />
    </main>
  );
}
