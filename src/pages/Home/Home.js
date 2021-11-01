import React, {useEffect, useState} from "react";
import {getFilms} from "../../api/filmsApi";
import './Home.scss';
import {NavLink} from "react-router-dom";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

const Home = ({showInput, hideNameInput}) => {

  const [films, setFilms] = useState([]);
  const [currentList, setCurrentList] = useState(20);
  const [fetching, setFetching] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState(0);

  useEffect(() => {
    if (fetching) {
      getFilms()
        .then(data => {
          const filmsList = data.slice(3, currentList);
          setFilms(filmsList);
          setCurrentList(prevState => prevState + 20)
        })
        .finally(() => setFetching(false))
    }
    // eslint-disable-next-line
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  const scrollHandler = e => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  };

  const toggleModal = (id) => {
    setIsOpen(!isOpen);
    setModalId(id);
  };
  // eslint-disable-next-line
  const showInfoInModal = films.map(item => {
    const {plot, writer, actors, imdbrating} = item;
    if (modalId === item.id) {
      return (
        <div key={modalId}>
          <div>Plot: {plot}</div>
          <div>Writer: {writer}</div>
          <div>Actors: {actors}</div>
          <div>Imdbrating: {imdbrating}</div>
        </div>
      )
    }
  });

  const user = localStorage.getItem('user');

  const filmList = films.map(({id, title, poster, year, genre, director, imdbrating}) => {
    return (
      <li key={id}>
        <img src={poster}
             alt="poster"/>
        <h4>{title}</h4>
        {user ? <div><div>{genre}</div>
          <div>{director}</div>
          <div>{year}</div>
          <button className='btn btn-warning'
                  onClick={() => toggleModal(id)}>show more
          </button>
          {+imdbrating <= 9 ? <span className='icon'>
          <i className="far fa-thumbs-down"></i>
        </span>: null}</div> : null}
      </li>
    )
  });

  const userName = localStorage.getItem('user');

  const handleClickByWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={handleClickByWindow}>
      <div className='btn-wrapper'>
        {(userName === '' || userName === null) ? <div><NavLink to='/registration'>
          <Button name='SIGN UP'
                  styles='btn btn-info'
                  showInput={showInput}/>
        </NavLink>
          <NavLink to='/registration'>
            <Button name='SIGN IN'
                    styles='btn btn-info'
                    showInput={hideNameInput}/>
          </NavLink></div> : <h4>Hello {userName}</h4>}
      </div>
      <ul className='list-items'>
        {filmList}
      </ul>
      <Modal isOpen={isOpen}
             toggleModal={toggleModal}
             films={films}
             showInfoInModal={showInfoInModal}>
        <button className='btn btn-light'
                onClick={toggleModal}>Close
        </button>
      </Modal>
    </div>
  )
};

export default Home;