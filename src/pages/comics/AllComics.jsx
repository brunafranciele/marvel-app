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
import Loading from '../../components/Loading';
import '../../styles/pages.css';

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

  const handleClickBack = () => {
    if(offset >=10 ) {
    var count = offset - 10;
    return setOffset(count);
  }
  }

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
    <div className='page-container'>
      <header className='header'>
        <Menu />
      </header>
      <div>
      {dataAPI.length === 0 ? <Loading /> : 
      <div>
      <h1 className='title'>Comics</h1>
      <div className='input-pages'>
        <Input
          title="Search Comic"
          type="text"
          value={titleParameter}
          onChange={setField}
        />
        <Button
          title="Search"
          onClick={async () => await searchComicByTitle()}
        />
        <button type="button" className='button' onClick={() => cleanState()}>Get All</button>
      </div>
      <div className="all-cards">
        {
          actualComic === null ?
            dataAPI.map((comic, index) => (
              <div className='cards' key={index}>
                <h3>{comic.title}</h3>
                <img
                  className="character-pic"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="Comic Thumbnail" />
                <Link className='link' to={`/comics/${comic.id}`}>
                  <p>More details</p>
                </Link>
              </div>
            )) :
            <div className="cards">
              <h3>{actualComic.title}</h3>
              <img
                className="character-pic"
                src={actualComic.image}
                alt="Character Thumbnail" />
              <Link className='link' to={`/comics/${actualComic.id}`}>
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