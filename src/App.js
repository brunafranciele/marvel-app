import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import {
  Login,
  // Register,
  // MainPage,
  // Profile,
  // AllComics,
  // ComicDetails,
  // FavoriteComics,
  // AllCharacters,
  // FavoriteCharacters,
  // CharacterDetails
} from './Pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/register" component={ Register } />
        <Route path="/profile" component={ Profile } />
        <Route path="/main" component={ MainPage } />
        <Route path="/comics" component={ AllComics } />
        <Route exact path="/comics/:id" component={ ComicDetails } />
        <Route exact path="/comics/favorite" component={ FavoriteComics } />
        <Route path="/characters" component={ AllCharacters } />
        <Route exact path="/characters/:id" component={ CharacterDetails } />
        <Route exact path="/characters/favorite" component={ FavoriteCharacters } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
