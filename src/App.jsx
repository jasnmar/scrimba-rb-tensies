import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die/Die'
import { nanoid } from "nanoid"
import Winner from './components/Winner/Winner'

function App() {
  const [diceObjects, setDiceObjects] = useState(newDiceObjects())
  const [tenzies, setTensies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [lowScore, setLowScore] = useStickyState(100, 'lowScore')

  function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    useEffect(() => {
      const ls = JSON.parse(localStorage.getItem(key))
        ls>value && localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

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
      setRolls(0)
      setLowScore(rolls)
    } else {
      setTensies(false)
    }
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
    if (!tenzies) {
      setRolls((rolls)=> rolls+1)
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
      
      <p className='app--low-score'>Low Score: {lowScore} </p>
      <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='app--die-container'>
        {diceEls}
      </div>
      <button onClick={rollDice} className="btn" id="roll-dice-btn">{tenzies ? "New Game" : "Roll Dice" }</button>
      <p className='app-rolls'>Rolls: <span id="rolls">{rolls}</span></p>
    </main>
  )
}

export default App
