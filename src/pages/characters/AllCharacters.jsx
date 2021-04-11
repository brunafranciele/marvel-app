import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { allCharactersURL } from '../../service/endpoints';
import { getInfo } from '../../service/marvelAPIRequest';
import { getCharacterByName } from '../../service/nativeAPIRequest';
import { verifyUser } from '../../utils/localstorage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import '../../styles/Characters.css';

export default function AllCharacters() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameParameter, setNameParameter] = useState('');
  const [actualCharacter, setActualCharacter] = useState(null);
  const [att, setAtt] = useState({});
  const history = useHistory();

  const handleClick = () => {
    var count = offset + 10;
    return setOffset(count);
  };

  useEffect(() => {
    const { email } = verifyUser(history);
    if (!email) return null;
    const func = async () => {
      const responseAPI = await getInfo(allCharactersURL, offset);
      setDataAPI(responseAPI);
    }
    func();
  }, [offset, history]);

  useEffect(() => {
    setAtt(actualCharacter);
  }, [actualCharacter])

  const searchCharacterByName = async () => {
    const result = await getCharacterByName(nameParameter);
    setActualCharacter(result);
  }

  const setField = (field, value) => {
    if (field === 'Search Character') return setNameParameter(value);
  };

  const cleanState = () => {
    setActualCharacter(null);
    setNameParameter('');
  };
  
  return (
    <div >
      <h2>Characters</h2>
      <div>
        <Input
          title="Search Character"
          type="text"
          value={ nameParameter }
          onChange={ setField }
        />
        <Button
          title="Search"
          className="indiv-btn"
          onClick={ async () => await searchCharacterByName() }
        />
        <button type="button" onClick={() => cleanState()}>Get All</button>
      </div>
      {console.log(actualCharacter)}
      <div>
        {
        actualCharacter === null ?
        dataAPI.map((character, index) => (
          <div key={ index }>
            <p>{ character.name }</p>
            <img
              className="character-pic"
              src={ `${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt="Character Thumbnail"/>
            <Link to={`/characters/${character.id}`}>
              <p>More details</p>
            </Link>
          </div>
        )) :
        <div>
          <p>{ actualCharacter.name }</p>
          <img
            className="character-pic"
            src={ actualCharacter.image && actualCharacter.image }
            alt="Character Thumbnail"/>
          <Link to={`/characters/${actualCharacter.id}`}>
            <p>More details</p>
          </Link>
        </div>
        }
      </div>
      <div>
        <button type="button" onClick={() => handleClick()}>Next</button>
      </div>
    </div>
  );
}