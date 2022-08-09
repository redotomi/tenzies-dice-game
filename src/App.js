import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';
import Die from "./components/Die";
import RollButton from "./components/RollButton";
import './style.css'

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [rollCount, setRollCount] = useState(0)
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSame = dice.every(die => die.value === firstValue)
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 1; i <= 10; i++) {
      const newDie = generateNewDie()
      newDice.push(newDie);
    }
    return newDice;
  }

  function rollDice() {
    setDice(oldDice => oldDice.map((die) => (
      die.isHeld === true ?
        die :
        generateNewDie()
    )))
    setRollCount(prevCount => prevCount + 1)
  }

  function restartGame() {
    setDice(allNewDice());
    setRollCount(0);
    setTenzies(false)
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map((die) => (
      die.id === id ?
        {
          ...die,
          isHeld: !die.isHeld
        } :
        die
    )))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <p className="instructions count">
        Count: {rollCount}
      </p>
      <div className="die-container">
        {dice.map((die, i) => (
          <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={() => { holdDice(die.id) }}
          />
        ))}
      </div>
      <RollButton
        roll={tenzies ? restartGame : rollDice}
        win={tenzies}
      />
    </main>
  );
}
