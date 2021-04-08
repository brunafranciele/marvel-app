import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { allCharactersURL } from '../../service/endpoints';
import { getInfo } from '../../service/marvelAPIRequest';
import Input from '../../components/Input';
import Button from '../../components/Button';
import '../../styles/Characters.css';

export default function AllCharacters() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameParameter, setNameParameter] = useState('');
  const history = useHistory();
  const handleClick = () => {
    var count = offset + 10;
    return setOffset(count);
  };
  useEffect(() => {
    const func = async () => {
      const responseAPI = await getInfo(allCharactersURL, offset);
      setDataAPI(responseAPI);
      console.log(responseAPI);
    }
    func();
  }, [offset]);
  return (
    <div >
      <h2>Characters</h2>
      <div>
        <Input
          title="SearchCharacter"
          type="text"
          value={ nameParameter }
          onChange={ ({target}) => setNameParameter(target.value) }
          placeholder="Search character"
        />
        <Button
          title="Search"
          className="indiv-btn"
          onClick={ async () => await  }
        />
      </div>
      <div>
        { dataAPI.length > 0 && dataAPI.map((character, index) => (
          <div key={ index }>
            <p>{ character.name }</p>
            <img
              className="character-pic"
              src={ `${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt="Character Thumbnail"/>
            <Link to={`/character/${character.id}`}>
              <p>More details</p>
            </Link>
          </div>
        ))}
        <button type="button" onClick={() => handleClick()}>Próxima</button>
      </div>
    </div>
  );
}