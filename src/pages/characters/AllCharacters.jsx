import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCharacterByName, getAllCharacters } from '../../service/nativeAPIRequest';
import { verifyUser } from '../../utils/localstorage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Menu from '../../components/Menu';
import '../../styles/pages.css';

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

  const handleClickBack = () => {
    if (offset >= 10) {
      var count = offset - 10;
      return setOffset(count);
    }
  }

  useEffect(() => {
    const { email } = verifyUser(history);
    if (!email) return null;
    const func = async () => {
      const responseAPI = await getAllCharacters(offset);
      console.log(responseAPI, 'response api')
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
    <div className='page-container'>
      <header className='header'>
        <Menu />
      </header>
      <div>
      {dataAPI.length === 0 ? <Loading /> : 
        <div>
          <h2 className='title'>Characters</h2>
          <div className='input-pages'>
            <Input
              title="Search Character"
              type="text"
              value={nameParameter}
              onChange={setField}
            />
            <div className='buttons-search'>
              <Button
                title="Search"
                onClick={async () => await searchCharacterByName()}
              />
              <button className='button' type="button" onClick={() => cleanState()}>Get All</button>
            </div>
          </div>
          {console.log(actualCharacter)}
          <div className="all-cards">
            {
              actualCharacter === null ?
                dataAPI.map((character, index) => (
                  <div className='cards' key={index}>
                    <h3 >{character.name}</h3>
                    <img
                      className="character-pic"
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt="Character Thumbnail" />
                    <Link className='link' to={`/characters/${character.id}`}>
                      <p>More details</p>
                    </Link>
                  </div>
                )) :
                <div className='cards'>
                  <h3>{actualCharacter.name}</h3>
                  <img
                    className="character-pic"
                    src={actualCharacter.image && actualCharacter.image}
                    alt="Character Thumbnail" />
                  <Link className='link' to={`/characters/${actualCharacter.id}`}>
                    <p>More details</p>
                  </Link>
                </div>
            }
          </div>
          <div className='back-next'>
            <Button
              title='Back'
              type="button"
              onClick={() => handleClickBack()}
            />
            <button className='button' type="button" onClick={() => handleClick()}>Next</button>
          </div>
        </div>
}
      </div>
    </div>
  );
}