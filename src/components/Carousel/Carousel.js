import React, {useEffect, useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import {getFilms} from "../../api/filmsApi";
import './Carousel.scss';
import img from '../../assets/Netflix.png';

const MainCarousel = () => {

  const [films, setFilms] = useState([]);

  useEffect(() => {
    getFilms()
      .then(data => {
        const slideItems = data.slice(0, 3);
        setFilms(slideItems)
      })
  }, []);

  const renderFilm = films.map(({title, plot, actors, id, poster}) => {

    const trunkString = string => {
      if (plot.length > 50) {
        const newString = string.slice(0, 47) + '...';
        return newString
      }
      return string;
    };

    return (
      <Carousel.Item key={id}>
        <img
          style={{visibility: 'hidden'}}
          className="d-block w-100"
          src={img}
          alt="film"
        />
        <Carousel.Caption>
          <img
          src={poster}
          alt='poster'/>
          <h3>{title}</h3>
          <h5>Starring: {trunkString(actors)}</h5>
          <p>{trunkString(plot)}</p>
        </Carousel.Caption>
      </Carousel.Item>
    )
  });

  return (
    <Carousel>
      {renderFilm}
    </Carousel>
  )
};

export default MainCarousel;