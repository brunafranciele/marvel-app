import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getComicById, addFavorite } from '../../service/nativeAPIRequest';
import { verifyUser } from '../../utils/localstorage';
import { useHistory } from 'react-router-dom';
import '../../styles/Characters.css'

export default function CharacterDetails({ match: { params: { id } } }) {
  const [comic, setComic] = useState([]);
  const [id_user, setId] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { email, id: id_user } = verifyUser(history);
    setId(id_user)
    if (!email) return null;
    const getComicId = async () => {
      const result = await getComicById(id);
      setComic(result);
    };
    getComicId();
  }, [id, history]);

  const getCharacterId = (cha) => {
    const splittedId = cha.resourceURI.split('/');
    const rightId = splittedId[6];
    return rightId;
  }



  const addFavoriteOnDB = async () => {
    console.log(comic.id, comic.title, comic.image, 'characters', id_user)
    const result = await addFavorite(comic.id, comic.title, comic.image, 'characters', id_user);
    console.log(result, 'resultado api favoritar')
  }

  return (
    <div >
      <h2>Comic's Detail</h2>
      <div>
        <h3>{ comic.title }</h3>
        <img
          className="character-pic"
          src={ comic.image }
          alt="Character Thumbnail"
        />
        <p>{ comic.description && comic.description }</p>
        { comic.characters && comic.characters.length > 0 ? (<h4>Characters:</h4>) : '' }
        {comic.characters && comic.characters.map((element, index) => (
          <div key={ index }>
            <Link to={`/characters/${getCharacterId(element)}`}>{ element.name }</Link>
          </div>
        ))}
        <a href={comic.externalInformation}>External information</a>
        <button type='button' onClick={() => addFavoriteOnDB(comic.id, comic.title, comic.image, 'characters', id_user)}>
          Favorite
        </button> 
      </div>
    </div>
  );
}