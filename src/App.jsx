import { useState } from 'react'
import './App.css'
import Die from './components/Die/Die'
import { nanoid } from "nanoid"


/**
 * Challenge: Create a function `holdDice` that takes
 * `id` as a parameter. For now, just have the function
 * console.log(id).
 * 
 * Then, figure out how to pass that function down to each
 * instance of the Die component so when each one is clicked,
 * it logs its own unique ID property. (Hint: there's more
 * than one way to make that work, so just choose whichever
 * you want)
 * 
 */

function App() {
  const [diceObjects, setDiceObjects] = useState(newDiceObjects(10))

  const diceEls = diceObjects.map((die) => {
    return <Die 
      key={die.id} 
      held={die.isHeld} 
      value={die.value} 
      handleClick={holdDice}
      id={die.id}
    />
  })

  function newDiceObjects(numberToGenerate) {
    const dice = []
    for(let i=0; i < numberToGenerate; i++) {
      const diceObject = {
        value: getRandomInt(6), 
        isHeld: true,
        id: nanoid() 
      }
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


  function holdDice(diceId) {
    console.log('diceId: ', diceId)
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
