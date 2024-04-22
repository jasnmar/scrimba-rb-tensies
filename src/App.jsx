import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die/Die'
import { nanoid } from "nanoid"

function App() {
  const [diceObjects, setDiceObjects] = useState(newDiceObjects())
  const [tenzies, setTensies] = useState(false)

  const diceEls = diceObjects.map((die) => {
    return <Die 
      key={die.id} 
      held={die.isHeld} 
      value={die.value} 
      handleClick={holdDice}
      id={die.id}
    />
  })

  useEffect(() => {
    const losingList = diceObjects.filter(diceObject => {
      if(diceObject.isHeld) {
        if(diceObject.value === diceObjects[0].value) {
          return false
        }
      }
      return true
    })
    if(losingList.length===0) {
      setTensies(true)
      console.log("You won!")
    }
  },[diceObjects])

/**
 * Challenge: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
 */
  
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
      <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='app--die-container'>
        {diceEls}
      </div>
      <button onClick={rollDice} className="btn" id="roll-dice-btn">Roll Dice</button>
    </main>
  )
}

export default App
