import "./App.css";
import {useEffect, useState} from "react"
import axios from "axios"
const url = 'http://localhost:3000/nouns'
function App() {
  const [nouns, setNouns]=useState([]); 
  useEffect(()=>{
(async () => {
  setNouns((await axios.get(url)).data);
})();
  },[])
    
  //wir sollen in backend erlauben dass unsere front End darauf kommen darf before wir uberhaubt anything displaying
  //cors origin problem

    return (
        <div className="App">
            <div>Testing</div>
            <div>There are {nouns.length} nouns</div>
            <ul>{nouns.map((noun, i) => {
              return <li key={i}>{noun.singular}</li>;
            })}</ul>
        </div>
    );
}

export default App;
