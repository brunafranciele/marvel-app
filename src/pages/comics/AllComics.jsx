import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { allComicsURL } from '../../service/endpoints';
import { getInfo } from '../../service/marvelAPIRequest';
import { getComicByTitle } from '../../service/nativeAPIRequest';
import { verifyUser } from '../../utils/localstorage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import '../../styles/Characters.css';

export default function AllCharacters() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [titleParameter, setTitleParameter] = useState('');
  const [actualComic, setActualComic] = useState(null);
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
      const responseAPI = await getInfo(allComicsURL, offset);
      setDataAPI(responseAPI);
    }
    func();
  }, [offset, history]);

  useEffect(() => {
    setAtt(actualComic);
  }, [actualComic])

  const searchComicByTitle = async () => {
    const result = await getComicByTitle(titleParameter);
    setActualComic(result);
  }

  const setField = (field, value) => {
    if (field === 'Search Comic') return setTitleParameter(value);
  };

  const cleanState = () => {
    setActualComic(null);
    setTitleParameter('');
  };

  return (
    <div >
      <header>
        <Menu />
      </header>
      <h2>Comics</h2>
      <div>
        <Input
          title="Search Comic"
          type="text"
          value={titleParameter}
          onChange={setField}
        />
        <Button
          title="Search"
          className="indiv-btn"
          onClick={async () => await searchComicByTitle()}
        />
        <button type="button" onClick={() => cleanState()}>Get All</button>
      </div>
      {console.log(actualComic)}
      <div>
        {
          actualComic === null ?
            dataAPI.map((comic, index) => (
              <div key={index}>
                <p>{comic.title}</p>
                <img
                  className="character-pic"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="Comic Thumbnail" />
                <Link to={`/comics/${comic.id}`}>
                  <p>More details</p>
                </Link>
              </div>
            )) :
            <div>
              <p>{actualComic.title}</p>
              <img
                className="character-pic"
                src={actualComic.image}
                alt="Character Thumbnail" />
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