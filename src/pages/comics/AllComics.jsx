import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { allComicsURL, generalEndpoint1, generalEndpoint2 } from '../../service/endpoints';
import { getInfo, getByTitle } from '../../service/marvelAPIRequest';
import Input from '../../components/Input';
import Button from '../../components/Button';
import '../../styles/Characters.css';

export default function AllCharacters() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameParameter, setNameParameter] = useState('');
  const [actualComic, setActualComic] = useState(null);
  const [att, setAtt] = useState({});
  const history = useHistory();
  const handleClick = () => {
    var count = offset + 10;
    return setOffset(count);
  };
  useEffect(() => {
    const func = async () => {
      const responseAPI = await getInfo(allComicsURL, offset);
      setDataAPI(responseAPI);
      // console.log(responseAPI);
    }
    func();
  }, [offset]);
  useEffect(() => {
    setAtt(actualComic);
  }, [actualComic])

  const searchComicByTitle = async () => {
    const result = await getByTitle(generalEndpoint1, 'comics', nameParameter, generalEndpoint2);
    setActualComic(result);
  }

  const setField = (field, value) => {
    if (field === 'Search Comic') return setNameParameter(value);
  };

  const cleanState = () => {
    setActualComic(null);
    setNameParameter('');
  };

  return (
    <div >
      <h2>Comics</h2>
      <div>
        <Input
          title="Search Comic"
          type="text"
          value={ nameParameter }
          onChange={ setField }
        />
        <Button
          title="Search"
          className="indiv-btn"
          onClick={ async () => await searchComicByTitle() }
        />
        <button type="button" onClick={() => cleanState()}>Get All</button>
      </div>
      {console.log(actualComic)}
      <div>
        {
        actualComic === null ?
        dataAPI.map((comic, index) => (
          <div key={ index }>
            <p>{ comic.title }</p>
            <img
              className="character-pic"
              src={ `${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt="Comic Thumbnail"/>
            <Link to={`/comics/${comic.id}`}>
              <p>More details</p>
            </Link>
          </div>
        )) :
        <div>
          <p>{ actualComic.title }</p>
          <img
            className="character-pic"
            src={ `${actualComic.thumbnail && actualComic.thumbnail.path}.${actualComic.thumbnail && actualComic.thumbnail.extension}`}
            alt="Character Thumbnail"/>
          <Link to={`/comics/${actualComic.id}`}>
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