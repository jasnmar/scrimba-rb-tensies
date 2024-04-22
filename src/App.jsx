import { useState } from 'react'
import './App.css'
import Die from './components/Die/Die'


/**
 * Challenge: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 * 
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */

function App() {
  //const [diceArray, setDiceArray] = useState(allNewDice(10))
  const [diceObjects, setDiceObjects] = useState(newDiceObjects(10))

  const diceEls = diceObjects.map((die) => {
    return <Die value={die.value} />
  })

  function newDiceObjects(numberToGenerate) {
    const dice = []
    for(let i=0; i < numberToGenerate; i++) {
      const diceObject = {value: getRandomInt(6), isHeld: false }
      dice.push(diceObject)
    }
    return dice
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }

  function rollDice() {
    setDiceObjects(newDiceObjects(10))
  }

  return (
    <main>
      <div className='app--die-container'>
        {diceEls}
      </div>
      <button onClick={rollDice} className="btn" id="roll-dice-btn">Roll Dice</button>
    </main>
  )
}

export default App
