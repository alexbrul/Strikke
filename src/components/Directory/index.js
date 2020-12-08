import React from "react";
import Utstyr from "./../../assets/utstyr.jpg";
import Garn from "./../../assets/garn.jpg";
import './styles.scss';

const Directory = () => {
  return (
      <div className="directory">
        <div className="wrap">
          <div
            className="item"
            style={{
              backgroundImage: `url(${Utstyr})`,
            }}
          >
            <a>Utstyr</a>

          </div>
          <div
            className="item"
            style={{
              backgroundImage: `url(${Garn})`,
            }}
          >
            <a>Garn</a>
          </div>
        </div>
      </div>
  );
};

export default Directory;
