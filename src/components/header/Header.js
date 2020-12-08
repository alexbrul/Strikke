import React from "react";
import './styles.scss';
import Logo from "../../assets/strikkelogo.png"

const Header = () => {

    return(
    <header className="header">
        <div className="wrap">
            <div className="logo">
                <img src={Logo} alt="company logo"/>
            </div>
        </div>
    </header>
    )
};

export default Header;

