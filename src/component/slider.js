import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import './slider.css';
import { fetchData } from './fetch';

function SSlider({ setImageID }) {
  const [dataslider, setDataslider] = useState([]);
  const [data, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);

  useEffect(() => {
    fetchData().then((images) => {
      setData(images);
    });
  }, []);

  useEffect(() => {
    recently();
  }, [data]);

  const mostLike = () => {
    const filteredData = data.filter((item) => item.num_likes > 0);
    const sortedObjects = filteredData.sort((a, b) => b.num_likes - a.num_likes);
    setDataslider(sortedObjects.slice(0, 20));
  };

  const recently = async () => {
    const sortedData = await data.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  
    const firstTenItems = sortedData.slice(0, 20);
    setDataslider(firstTenItems);
  };

  const byadmin = async () => {
    const filteredData = data.filter((element) => element.isAdminLiked === true);
    const firstTenItems = filteredData.slice(0, 20);
    setDataslider(firstTenItems);
  };

  const convertDateFormat = (isoDate) => {
    const dates = new Date(isoDate);
    const day = dates.getDate();
    const month = dates.getMonth() + 1; // Adding 1 because months are zero-indexed
    const year = dates.getFullYear();

    // Padding single digit day/month with a leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const getIDOfImage = (id) => {
    setImageID(id);
    localStorage.setItem('newElementID', id);
    // go to panel ID
  };

  return (
    <div style={{ width: 'auto', height: 500 }}>
      <div id=" text-start" className="mb-4 mt-5  m-auto">
        <div className="buttons mt-3  d-flex justify-content-start">
          <button type="button" className="btn btn-light colored-btn" onClick={recently}>
            Recently
          </button>
          <button type="button" className="btn btn-light colored-btn" onClick={mostLike}>
            Most likes
          </button>
          <button type="button" className="btn btn-light colored-btn" onClick={byadmin}>
            Liked By Admin
          </button>
        </div>
        <div className="ms-1  slides d-flex justify-content-start align-items-center" id="slides">
          {dataslider &&
            dataslider?.map((item, index) => (
              <LazyLoad key={item.id} height={200} offset={100}>
                <div
                  className={`card shadow-lg col-4 ${
                    index === activeSlide ? 'active' : index === nextSlide ? 'next' : ''
                  }`}
                  key={item.id}
                  style={{ width: '15rem', height: '17rem', margin: '10px'}}
                >
                  <div className="imagecard">
                    <div className="w-fit h-100">
                      <a href="#panelID">
                        <LazyLoad height={200} offset={100}>
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt={item.title}
                            onClick={() => getIDOfImage(item.id)}
                            style={{ width: 'fit-content', manWidth: '100%' }}
                          />
                        </LazyLoad>
                      </a>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush px-2 py-2">
                    <li className="list-group-item text-start" style={{ color: '#F29222' }}>
                      Email: <span style={{ color: '#bdb9b9' }}>{item.author}</span>
                    </li>
                    <li className="list-group-item text-start" style={{ color: '#F29222' }}>
                      Title: <span style={{ color: '#bdb9b9' }}>{convertDateFormat(item.created_at)}</span>{' '}
                    </li>
                    <li className="list-group-item text-start" style={{ color: '#F29222' }}>
                      Likes: <span style={{ color: '#bdb9b9' }}>{item.num_likes}</span>
                    </li>
                  </ul>
                </div>
              </LazyLoad>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SSlider;
