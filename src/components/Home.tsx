import { observer } from 'mobx-react';
import React from "react";
import { Chord, ChordType } from '../models/chord';


const Line = () => {
  const chords = [
    new Chord(0, ChordType.major),
    new Chord(3, ChordType.major),
    new Chord(4, ChordType.minor),
    new Chord(0, ChordType.empty),
  ]

  const renderChords = () => (
    chords.map((chord, index) => (
      <span key={index}>{ chord.isEmpty ? '' : chord.label } |</span>
    ))
  )

  return (
    <div className='line'>
      || { renderChords() } ||
    </div>
  )
}

const Song = () => {

  return (
    <div className='song'>
      <Line/>
    </div>
  )
}

const Home = () => {

  return (
    <div>
      <Song/>
    </div>
  );
}

export default observer(Home);
