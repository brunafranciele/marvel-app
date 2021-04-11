import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { verifyUser } from '../utils/localstorage';
import { getFavoriteByUserId } from '../service/nativeAPIRequest';

export default function Favorite() {
  const [favorite, setFavorite] = useState([]);
  const history = useHistory();

  const verifyTipyOfFavorite = (fav) => {
    if( fav.related === 'comics') return `/characters/${fav.id_favorite}`;
    return `/comics/${fav.id_favorite}`;
  }

  useEffect(() => {
    const { email, id } = verifyUser(history);
    console.log(id, 'id ls')
    if (!email) return null;
    const func = async () => {
      const responseAPI = await getFavoriteByUserId(id);
      setFavorite(responseAPI);
    }
    func();
  }, [history]);

  return (
    <div >
      <h2>Favorite</h2>
      <div>
        {favorite.map((fav, index) => (
          <div key={index}>
            <p>{fav.name}</p>
            <img
              className="character-pic"
              src={fav.url_image && fav.url_image}
              alt="Favorite Thumbnail" />
            <Link to={verifyTipyOfFavorite(fav)}>
              <p>More details</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}