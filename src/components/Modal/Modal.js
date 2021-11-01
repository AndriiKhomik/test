import React from "react";
import './Modal.scss';

const Modal = ({isOpen, toggleModal, showInfoInModal, children}) => {

  return (
    <>
      <div onClick={() => toggleModal}
           className={isOpen ? 'modal-container active' : 'modal-container'}>
        <div className='modal-info'
             onClick={(e) => e.stopPropagation()}>
          <h4 className='title'>Film details</h4>
          {showInfoInModal}
          {children}
        </div>
      </div>
    </>
  )
};

export default Modal;