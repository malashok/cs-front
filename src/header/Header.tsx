import { FunctionComponent } from 'react';
import { NavLink } from "react-router-dom";
import "./header.css";

const Header: FunctionComponent<never> = () => {

    return (
        <div className="header-wrapper">
            <nav>
                <ul className="header-nav">
                    <li>
                        <NavLink className="nav-link" to="/">Продукти</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/groups">Групи</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/stats">Статистика</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="logo-wrapper">
                <img src="src/Images/logo-transparent-bg.png" alt="Logo" />
            </div>
        </div>
    );
};

export default Header;