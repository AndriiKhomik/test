import React from "react";
import './Main.scss';
import Button from "../../components/Button/Button";
import Carousel from "../../components/Carousel/Carousel";
import {Link} from "react-router-dom";

const Main = ({showInput, hideNameInput}) => {

  return (
    <div className='bg'>
      <div className='btn-wrapper'>
        <Link to='/registration'>
          <Button name='SIGN UP'
                  styles='btn btn-light'
                  showInput={showInput}/>
        </Link>
        <Link to='/registration'>
          <Button name='SIGN IN'
                  styles='btn btn-light'
                  showInput={hideNameInput}/>
        </Link>
        <Link to='/home'>
          <Button name='BROWSE'
                  styles='btn btn-light'
                  showInput={hideNameInput}/>
        </Link>
      </div>
      <Carousel/>
    </div>
  )
};

export default Main;