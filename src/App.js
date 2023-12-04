import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Listing from './components/Listing.js';
import { websites } from './components/Websites.js';

// import './App.css';

const grantsPage = "http://localhost:8000/grants";

const App = () => {
  const [grants, setGrants] = useState(null);

  const [huntBtn, setHuntBtn] = useState(1);

  const [boxesChecked, setBoxesChecked] = useState([true, true, true]);

  const checkBoxesChecked = (checkedState) => {
    setBoxesChecked(checkedState);
    console.log("Checked state from Header.js: ", checkedState);
  }

  const huntBtnPressed = (btnState) => {
    setHuntBtn(btnState);
    console.log("Pressed the hunt button");
    getGrants();
  }

  const getGrants = () => {
    console.log("Attempting to retrieve grants now!");
    try {
      const answer = axios.get(grantsPage).then(response => {
        const code = response.data;
        var grantsToShow = [];
        for(var i = 0; i < boxesChecked.length; i++){
          for(var j = 0; j < code.length; j++){
            if(boxesChecked[i] && code[j].page === websites[i]) grantsToShow.push(code[j]);
          }
        }
        setGrants(grantsToShow);
        console.log("Grants found!");
        return grantsToShow;
      });
    } catch(err) {
      console.error(err);
    }
    console.log("Attempting scroll...");
    var headerElement = document.getElementById('headerComponent');
        window.scrollBy({ 
          top: headerElement.offsetHeight, // Scroll the the end of the table's height
          behavior: 'smooth' 
        });
        console.log("Scroll complete!");
  }

  // useEffect(() => {
  //   getGrants();
  // }, [grants]);

  return (
    <div class="app">
      <Header checkBoxesChecked={checkBoxesChecked} huntBtnPressed={huntBtnPressed}/>
      <div class='feed'>
        {grants?.map(grant => <Listing key={grant.title} info={grant}/>)}
      </div>
    </div>
  );
}

export default App;
