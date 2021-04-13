import React from 'react';
// import { useHistory } from 'react-router-dom';
import loading from '../images/loading.gif';
import '../styles/loading.css';

export default function Loading() {
  // const history = useHistory();

  // const timeGif = () => {
  //   setTimeout(function () {
  //     history.push('/characters');
  //   }, 1500)
  // }

  // useEffect(() => {
  //   timeGif()
  // }, [])

  return (
    <div className='gif-container'>
      <img className='loading' src={loading} alt='loading' />
    </div>
  )
}