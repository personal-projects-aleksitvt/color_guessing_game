import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [colorChoices, setColorChoices] = useState<string[]>([])
  const [answer, setAnswer] = useState<string>()
  const [result, setResult] = useState<Result | undefined>(undefined)

  enum Result {
    Correct,
    Wrong,
  }

  const shuffle = (array: string[]): string[] => { //Fisher-Yates sorting algorithm
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  const getRandomHexColor = (): string => {
    let hexNumber = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + hexNumber.slice(0, 6)
  }

  const generateColors = () => {
    let correctColor: string = getRandomHexColor()
    setAnswer(correctColor)
    setColorChoices( 
      shuffle([correctColor, getRandomHexColor(), getRandomHexColor()])
    )
  }

  useEffect(() => {
    generateColors()
  }, [])

  const handleChoiceClicked = (choice: string): void => {
    if(choice === answer){
      setResult(Result.Correct)
      generateColors()
    } else {
      setResult(Result.Wrong)
    }
  }

  return (
    <div className="App">
      <div>
        <div className="answerDisplayBox" style={{ backgroundColor: answer}}></div>
        {colorChoices.map((hexColor) => (
          <button
            key={hexColor}
            onClick={() => {handleChoiceClicked(hexColor)}}
          >{hexColor}</button>
        ))}
        {result === Result.Wrong && <div className="wrongAnswer">Wrong answer</div>}
        {result === Result.Correct && <div className="correctAnswer">Correct answer</div>}
      </div>
    </div>
  );
}

export default App;
