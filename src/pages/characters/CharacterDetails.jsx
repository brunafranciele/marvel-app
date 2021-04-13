import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCharacterById, addFavorite } from '../../service/nativeAPIRequest';
import { verifyUser } from '../../utils/localstorage';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu';
import Loading from '../../components/Loading';
import '../../styles/details.css'

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
    const resultAPI = await addFavorite(character.id, character.name, character.image, 'comics', id_user);
    console.log(resultAPI)
  }

  return (
    <div className='detail-container'>
      <header>
        <Menu />
      </header>
      <div>
      {character.length === 0 ? <Loading /> : 
        <div>
      <h1 className='title-detail'>Character's Detail</h1>
      <div className='detail'>
        <h2 className="name-detail">{character.name}</h2>
        <img
          className="pic"
          src={character.image && character.image}
          alt="Character Thumbnail"
        />
        <p className="description">{character.description && character.description}</p>
        <h4 className='related'>Comics:</h4>
        {character.comics && character.comics.map((element, index) => (
          <div key={index}>
            <Link className='link' to={`/comics/${getComicId(element)}`}>{element.name}</Link>
          </div>
        ))}
        <a className='external' href={character.externalInformation}>External information</a>
        <button
        className='button'
        type='button'
        onClick={() => addFavoriteOnDB(character.id, character.name, character.image, 'comics', id_user)}
        >
          Favorite
        </button>
      </div>
      </div>
}
      </div>
    </div>
  );
}
