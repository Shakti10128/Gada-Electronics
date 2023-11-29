import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js'
import {BrowserRouter as Router} from "react-router-dom"
import webfont from 'webfontloader';



function App() {

  useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])

  return (
    <Router>
      <Header/>
    </Router>
  );
}

export default App;
