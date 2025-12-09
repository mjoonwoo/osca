import React from 'react';
import './App.css';
import Analyze from './Analyze';
import { Header } from './Header';

function App() {
  const [tab, setTab] = React.useState('analysis'); // 수정: 'analyze' -> 'analysis'

  return (
    <Analyze />
  );
}

export default App;