import { useState } from 'react'
import './App.css'
import Die from './components/Die/Die'


/**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 */
function App() {
  const [diceArray, setDiceArray] = useState(allNewDice(10))

  console.log('allNewDice: ', allNewDice(10))

  const diceEls = diceArray.map((die) => {
    console.log('running')
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

  return (
    <main>
      <div className='app--die-container'>
        {diceEls}
      </div>
    </main>
  )
}

export default App
