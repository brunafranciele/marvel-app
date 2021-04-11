import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import {
  Login,
  Register,
  Profile,
  AllComics,
  ComicDetails,
  AllCharacters,
  CharacterDetails,
  Favorite
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/comics" component={ AllComics } />
        <Route exact path="/comics/:id" component={ ComicDetails } />
        <Route exact path="/favorite" component={ Favorite } />
        <Route exact path="/characters" component={ AllCharacters } />
        <Route exact path="/characters/:id" component={ CharacterDetails } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
