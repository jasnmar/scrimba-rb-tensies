import { useState } from 'react'
import './App.css'
import Die from './components/Die/Die'


/**
 * Challenge:
 * 
 * Write a function (allNewDice) that returns an array 
 * of 10 random numbers between 1-6 inclusive.
 * 
 * Log the array of numbers to the console for now
 */
function App() {
  const [count, setCount] = useState(0)

  console.log('allNewDice: ', allNewDice(10))
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

  return (
    <main>
      <div className='app--die-container'>
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
      </div>
    </main>
  )
}

export default App
