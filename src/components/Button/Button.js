import React from "react";

const Button = ({name, styles, showInput}) => {



  return (
    <button className={styles} onClick={() => showInput()}>{name}</button>
  )
};

export default Button;