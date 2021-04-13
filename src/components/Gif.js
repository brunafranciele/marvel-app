import React, {  useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import estalo from '../images/estalo.gif';
import '../styles/gif.css';

export default function Gif() {
  const history = useHistory();

  const timeGif = () => {
    setTimeout(function () {
      history.push('/characters');
    }, 1500)
  }

  useEffect(() => {
    timeGif()
  }, [])

  return (
    <div className='gif-container'>
      <img className='gif' src={estalo} alt='iron man' />
    </div>
  )
}