
import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import file from './words.txt';





function WordListItem(props) {
  return <li key={props.text}>{ props.text }</li>;
}



function App() {

  const [wordlength, setWordlength] = useState(5);

  const [inputFields, setInputFields] = useState(
    [
      [
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false}
      ],
      [
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false}
      ],
      [
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false}
      ],
      [
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false}
      ],
      [
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false},
        {letter: '', checked: false}
      ]


    ]
    
    );

  const handleFormChange = (idx, index, event) => {
    let data = [...inputFields]
    data[idx][index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  //function WordLetter(props) {
    //return (<label > 
        //<input className='square' type="text" pattern="[a-z]{1}" key={props.keyId} maxLength="1"/>     
        //<br/>
        //<input type='checkbox' /> 
      //</label>);
  //}
  // Create a row of character inputs equal to the wordlength
  function WordRow(props) {
    //const row = [...Array(props.wordLength).keys()].map(a=>a+1);
    const idx = props.idx;
    const row = props.inputs.map((input, index) => {
      return (
        <div key={index}>
          <label > 
            <input name='letter' className='square' type="text" pattern="[a-z]{1}" value={input.letter} maxLength="1" onChange={event => handleFormChange(idx, index, event)}/>     
            <br/>
            <input name='checked' type='checkbox' value={input.checked} onChange={event => handleFormChange(idx, index, event)} /> 
          </label>
        </div>
      )
    });
   
    return <div className='boxinput'>  {row} </div>; 
  }

  const [words, setWords] = useState(''); 
  
  const [startFilter, setStartFilter] = useState('');
  const [endFilter, setEndFilter] = useState('');
  const [containsFilter, setContainsFilter] = useState('');
  const [excludingFilter, setExcludingFilter] = useState('');

  const filetext = async file => {
      const response = await fetch(file)
      const text = await response.text()
      return text;
  }

  if(words === '') {
    const text = filetext(file).then(text =>  setWords(text));
  }
  
const exclude = (word, excluded) => {
      for(let i = 0; i < excluded.length; i++) {
        if(word.includes(excluded[i]) ) {
          return false;
        }
      }
      return true;
  }

  const include = (word, include) => {
    for(let i = 0; i < include.length; i++) {
      if(!word.includes(include[i]) ) {
        return false;
      }
    }
    return true;
  }

  const wordleLogic = (word, include) => {
    for(let i = 0; i < include.length; i++) {
      if(include[i].letter == '') {
        continue;
      } else if( include[i].letter != word[i]) {
        return false;
      }
    }
    return true;
  }

  // Get words of wordlength and does not include any excluded character in excludeFilter
  let wordList = words.replaceAll('\r\n','\n').split('\n');

  const results = wordList.filter(word => word.length === wordlength)
  .filter(word => word.startsWith(startFilter))
  .filter(word => word.endsWith(endFilter))
  .filter(word => wordleLogic(word, inputFields[0] ))
  .filter(word => wordleLogic(word, inputFields[1] ))
  .filter(word => wordleLogic(word, inputFields[2] ))
  .filter(word => wordleLogic(word, inputFields[3] ))
  .filter(word => wordleLogic(word, inputFields[4] ))
  .filter(word => containsFilter === '' || include (word, containsFilter))
  .filter(word => excludingFilter === '' || exclude (word, excludingFilter)); //seems to be a bug regarding exlude

  return (
    <div className="App">

          <form>
            <label>Enter Length:
              <input
                type="text" 
                defaultValue={wordlength}
                onChange={(e) => setWordlength(parseInt(e.target.value))}
              />
            </label> 
            <label>Starts With:
              <input
                type="text" 
                defaultValue={startFilter}
                onChange={(e) => setStartFilter((e.target.value?.toLowerCase()))}
              />
            </label>
            <label>Ends With:
              <input

                type="text"
                defaultValue={endFilter}
                onChange={(e) => setEndFilter((e.target.value?.toLowerCase()))}
              />
            </label>
            <label>Contains:
              <input
                type="text"

                defaultValue={containsFilter}
                onChange={(e) => setContainsFilter((e.target.value?.toLowerCase()))}
              />
            </label>
            <label>Excluding:
              <input
                type="text"
                defaultValue={excludingFilter}
                onChange={(e) => setExcludingFilter((e.target.value?.toLowerCase()))}
              />
            </label>
           
              <WordRow idx={0} inputs={inputFields[0]} />   
              <WordRow idx={1} inputs={inputFields[1]} />   
              <WordRow idx={2} inputs={inputFields[2]} />   
              <WordRow idx={3} inputs={inputFields[3]} />   
              <WordRow idx={4} inputs={inputFields[4]} />   
          </form>
          <div style={{maxHeight: 400, overflow: 'auto'}}>
          <ul>
            {results.map((result) => <WordListItem key={result} text={result} />)}
          </ul>
          </div>
    </div>
    
  );
}

export default App;



