import { useState } from 'react'
import './App.css'
import Die from './components/Die/Die'
import { nanoid } from "nanoid"


/**
 * Challenge: Update the `holdDice` function to flip
 * the `isHeld` property on the object in the array
 * that was clicked, based on the `id` prop passed
 * into the function.
 * 
 * Hint: as usual, there's > 1 way to accomplish this.
 * I'll be using `dice.map()` and checking for the `id`
 * of the die to determine which one to flip `isHeld` on,
 * but you can do whichever way makes the most sense to you.
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
    const newDiceObjects = diceObjects.map(diceObject => {
      if(diceObject.id === diceId) {
        diceObject.isHeld = !diceObject.isHeld  
      }
      return diceObject
      
    })
    console.log('newDiceObjects: ', newDiceObjects)
    setDiceObjects(newDiceObjects) 
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
