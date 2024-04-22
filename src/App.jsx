import { useState } from 'react'
import './App.css'
import Die from './components/Die/Die'
import { nanoid } from "nanoid"


/**
 * Challenge: Update the `rollDice` function to not just roll
 * all new dice, but instead to look through the existing dice
 * to NOT role any that are being `held`.
 * 
 * Hint: this will look relatively similiar to the `holdDice`
 * function below. When creating new dice, remember to use
 * `id: nanoid()` so any new dice have an `id` as well.
 */

function App() {
  const [diceObjects, setDiceObjects] = useState(newDiceObjects())

  const diceEls = diceObjects.map((die) => {
    return <Die 
      key={die.id} 
      held={die.isHeld} 
      value={die.value} 
      handleClick={holdDice}
      id={die.id}
    />
  })

  
  function newDiceObjects() {
    const dice = []
    for(let i=0; i < 10; i++) {
      const diceObject = {
        value: getRandomInt(6), 
        isHeld: false,
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
    setDiceObjects(diceObjects.map(diceObject => {
      if(!diceObject.isHeld) {
        return {...diceObject, value: getRandomInt(6) }
      } 
      return diceObject
    }))
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
