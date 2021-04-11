import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getComicById } from '../../service/nativeAPIRequest';
import { verifyUser } from '../../utils/localstorage';
import { useHistory } from 'react-router-dom';
import '../../styles/Characters.css'

export default function CharacterDetails({ match: { params: { id } } }) {
  const [comic, setComic] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const { email } = verifyUser(history);
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
      </div>
    </div>
  );
}