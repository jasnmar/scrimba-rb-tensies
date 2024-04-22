import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die/Die'
import { nanoid } from "nanoid"


/**
 * Challenge:
 * 1. Add new state called `tenzies`, default to false. It
 *    represents whether the user has won the game yet or not.
 * 2. Add an effect that runs every time the `dice` state array 
 *    changes. For now, just console.log("Dice state changed").
 */

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
    console.log('Dice State Change')
  },[diceObjects])

  
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
