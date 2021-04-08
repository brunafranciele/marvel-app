import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generalEndpoint1, generalEndpoint2 } from '../../service/endpoints';
import { getById } from '../../service/marvelAPIRequest';
import '../../styles/Characters.css'

export default function CharacterDetails({ match: { params: { id } } }) {
  const [character, setCharacter] = useState([]);
  useEffect(() => {
    const getCharacterId = async () => {
      const result = await getById(generalEndpoint1, 'characters', id, generalEndpoint2);
      setCharacter(result);
    };
    getCharacterId();
  }, [id]);
  const getComicId = (cha) => {
    const splittedId = cha.resourceURI.split('/');
    const rightId = splittedId[6];
    return rightId;
  }
  return (
    <div >
      <h2>Character's Detail</h2>
      <div>
        <h3>{ character.name }</h3>
        <img
          className="character-pic"
          src={ `${character.thumbnail && character.thumbnail.path}.${character.thumbnail && character.thumbnail.extension}`}
          alt="Character Thumbnail"
        />
        <p>{ character.description && character.description }</p>
        <h4>Comics:</h4>
        {character.comics && character.comics.items.map((element, index) => (
          <div key={ index }>
            <Link to={`/comics/${getComicId(element)}`}>{ element.name }</Link>
          </div>
        ))}
        <a href={character.urls && character.urls[1].url}>External information</a>
      </div>
    </div>
  );
}
