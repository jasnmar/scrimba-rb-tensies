import { useState } from 'react'
import './App.css'
import Die from './components/Die/Die'


/**
 * Challenge: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 * 
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
 */

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice(10))

  const diceEls = diceArray.map((die) => {
    return <Die value={die} />
  })

  function allNewDice(numberToGenerate) {
    const dice = []
    for(let i=0; i < numberToGenerate; i++) {
      dice.push(getRandomInt(6))
    }
    return dice
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }

  function rollDice() {
    setDiceArray(allNewDice(10))
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
