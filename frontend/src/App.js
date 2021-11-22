import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import { API } from './api-service';
import PatternList from './components/pattern-list';
import PatternDetails from './components/pattern-details';
import PatternForm from './components/pattern-form';

function App() {

  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [editPattern, setEditPattern] = useState(null);
  const [token] = useCookies(['craftingnexus'])


  useEffect(() => {
    API.loadPatterns(token['craftingnexus'])
      .then(resp => setPatterns(resp))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (!token['craftingnexus']) window.location.href = '/'
  }, [token])

  const loadPattern = pattern => {
    setSelectedPattern(pattern)
    setEditPattern(null)
  }

  const editPatternClicked = pattern => {
    setEditPattern(pattern)
    setSelectedPattern(null)
  }

  const deletePatternClicked = pattern => {
    const newPatterns = patterns.filter(pat => pat.id !== pattern.id)
    setPatterns(newPatterns)
  }

  const updatedPattern = pattern => {
    const newPatterns = patterns.map(pat => {
      if (pat.id === pattern.id) {
        return pattern
      }
      return pat
    })
    setPatterns(newPatterns)
    loadPattern(pattern)
  }

  const newPattern = () => {
    setEditPattern({})
    setSelectedPattern(null)
  }

  const createPattern = pattern => {
    const newPatterns = [...patterns, pattern];
    setPatterns(newPatterns)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crafting Nexus</h1>
      </header>
      <div className="layout">
        <div>
          <button onClick={newPattern}>Add New Pattern</button>
          <PatternList
            patterns={patterns}
            patternClicked={loadPattern}
            editPatternClicked={editPatternClicked}
            deletePatternClicked={deletePatternClicked} />
        </div>
        <PatternDetails pattern={selectedPattern} updatePattern={updatedPattern} />
        {editPattern ?
          <PatternForm pattern={editPattern} updatedPattern={updatedPattern} createPattern={createPattern} />
          : null}
      </div>
    </div>
  );
};

export default App;
