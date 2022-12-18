import './App.css';
import React from 'react'
import DisplayAll from './components/DisplayAll'
import Edit from './components/Edit'
import New from './components/New'
import Delete from './components/Delete'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" default element={<DisplayAll />}/>
          <Route path="/new" element={<New />}/>
          <Route path="/edit/:id" element={<Edit />}/>
          <Route path="/delete/:id" element={<Delete />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
