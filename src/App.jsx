import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die/Die'
import { nanoid } from "nanoid"
import Winner from './components/Winner/Winner'

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
    } else {
      setTensies(false)
    }
  },[diceObjects])

/**
 * Challenge: Future
 * CSS dots on the dice
 * Track the # of roles
 * Track the amount of time taken
 * Save time / rolls to LS
 * (Mine: Turn a button red if it doesn't match)
 * 
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
    if (!tenzies) {

      setDiceObjects(diceObjects.map(diceObject => {
        if(!diceObject.isHeld) {
          return {...diceObject, value: getRandomInt(6) }
        } 
        return diceObject
      }))
    } else {
      setDiceObjects(newDiceObjects)
    }
  }

  function holdDice(diceId) {
    const newDiceObjects = diceObjects.map(diceObject => {
      if(diceObject.id === diceId) {
        diceObject.isHeld = !diceObject.isHeld  
      }
      return diceObject
      
    })
    setDiceObjects(newDiceObjects) 
  }
  
  return (
    <main>
      {tenzies && <Winner />}
      <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='app--die-container'>
        {diceEls}
      </div>
      <button onClick={rollDice} className="btn" id="roll-dice-btn">{tenzies ? "New Game" : "Roll Dice" }</button>
    </main>
  )
}

export default App
