import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCharacterById, addFavorite } from '../../service/nativeAPIRequest';
import { verifyUser } from '../../utils/localstorage';
import { useHistory } from 'react-router-dom';
import '../../styles/Characters.css'

export default function CharacterDetails({ match: { params: { id } } }) {
  const [character, setCharacter] = useState([]);
  const [id_user, setId] = useState('');
  const history = useHistory();
  
  useEffect(() => {
    const { email, id: id_user } = verifyUser(history);
    setId(id_user)
    if (!email) return null;
    const getCharacterId = async () => {
      const result = await getCharacterById(id);
      setCharacter(result);
    };
    getCharacterId();
  }, [id, history]);

  const getComicId = (cha) => {
    const splittedId = cha.resourceURI.split('/');
    const rightId = splittedId[6];
    return rightId;
  }

  const addFavoriteOnDB = async () => {
    console.log(character.id, character.name, character.image, 'comics', id_user)
    const result = await addFavorite(character.id, character.name, character.image, 'comics', id_user);
    console.log(result)
  }

  return (
    <div >
      <h2>Character's Detail</h2>
      <div>
        <h3>{ character.name }</h3>
        <img
          className="character-pic"
          src={ character.image && character.image }
          alt="Character Thumbnail"
        />
        <p>{ character.description && character.description }</p>
        <h4>Comics:</h4>
        {character.comics && character.comics.map((element, index) => (
          <div key={ index }>
            <Link to={`/comics/${getComicId(element)}`}>{ element.name }</Link>
          </div>
        ))}
        <a href={character.externalInformation}>External information</a>
        <button type='button' onClick={() => addFavoriteOnDB(character.id, character.name, character.image, 'comics', id_user)}>
          Favorite
        </button> 
      </div>
    </div>
  );
}
