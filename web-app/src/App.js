
import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import file from './words.txt';



function WordListItem(props) {
  return <li>{ props.text }</li>;
}

// Create a row of character inputs equal to the wordlength
function WordRow(props) {
  const row = [];
  for (let i = 1; i < (props.wordLength+1); i++) {  
    row.push(
//testing htmlFor vs for
      <label htmlFor={'chk' +i}> 
              <input className='square' type="text" pattern="[a-z]{1}" key={i} maxLength="1"/>                
                
        <br/>
        <input id={'chk' +i} key={((i*100))} type='checkbox' /> 

        
      </label>
          
    );
  }   


 
  return <div> <boxinput> {row} </boxinput> </div>; 
}

function App() {

  const [words, setWords] = useState(''); 
  const [wordlength, setWordlength] = useState(5);
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
          return true;
        }
      }
      return false;
  }

  const include = (word, include) => {
    for(let i = 0; i < include.length; i++) {
      if(!word.includes(include[i]) ) {
        return false;
      }
    }
    return true;
}
  // Get words of wordlength and does not include any excluded character in excludeFilter
  let wordList = words.split('\r\n');

  const results = wordList.filter(word => word.length === wordlength)
  .filter(word => word.startsWith(startFilter))
  .filter(word => word.endsWith(endFilter))
  .filter(word => containsFilter === '' || include (word, containsFilter))
  .filter(word => excludingFilter === '' || !exclude (word, excludingFilter)); //seems to be a bug regarding exlude



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
                onChange={(e) => setStartFilter((e.target.value.toLowerCase()))}
              />
            </label>
            <label>Ends With:
              <input

                type="text"
                defaultValue={endFilter}
                onChange={(e) => setEndFilter((e.target.value.toLowerCase()))}
              />
            </label>
            <label>Contains:
              <input
                type="text"

                defaultValue={containsFilter}
                onChange={(e) => setContainsFilter((e.target.value.toLowerCase()))}
              />
            </label>
            <label>Excluding:
              <input
                type="text"
                defaultValue={excludingFilter}
                onChange={(e) => setExcludingFilter((e.target.valueString.toLowerCase()))}
              />
            </label>
           
              <WordRow wordLength={wordlength} />   
          </form>
          <div style={{maxHeight: 400, overflow: 'auto'}}>
          <ul>
            {results.map((result) => <WordListItem text={result} />)}
          </ul>
          </div>
    </div>
    
  );
}

export default App;
