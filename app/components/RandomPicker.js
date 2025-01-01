"use client"

import { useState, useRef } from 'react';
import Papa from 'papaparse';
import styles from '../RandomPicker.module.css';
import { Video } from './Video';

export default function RandomPicker() {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [counter, setCounter] = useState(0);
  const fileInput = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setParticipants(results.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  };

  const pickWinner = () => {
    if (participants.length === 0) return;
    
    setIsSpinning(true);
    setCounter(0);
    
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setWinner(participants[randomIndex]);
      setCounter(prev => prev + 1);
      
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      const finalIndex = Math.floor(Math.random() * participants.length);
      setWinner(participants[finalIndex]);
      setIsSpinning(false);
    }, 29000);
  };

  return (
    <div className={styles.container}>
     <video   preload="true" visible="false" className={styles.video2} >
        <source src="/tamboula.mp4" type="video/mp4" />
      
        Your browser does not support the video tag.
      </video>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInput}
        className={styles.fileInput}
      />
      
      <button 
        onClick={ pickWinner } 
        disabled={participants.length === 0}
        className={styles.pickButton}
      >
        Choisir un gagnant
      </button>

      <div className={styles.counterContainer}>
        Tirages: {counter}
      </div>
      
      {winner && (
        <div className={styles.winnerContainer}>
          <Video />
        <div className={`${styles.winner} ${isSpinning ? styles.spinning : ''}`}>
          
          <h2>Gagnant:</h2>
          <p>Nom: {winner.name}</p>
          <p>Email: {winner.email}</p>
          <p>ID: {winner.id}</p>
        </div>
        </div>
      )}
    </div>
  );
}