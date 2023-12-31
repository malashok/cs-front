import { FunctionComponent } from 'react';
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = (props) => {

    return (
        <div className="header-wrapper">
            <nav>
                <ul className="header-nav">
                    <li>
                        <NavLink className="nav-link" to="/products">Продукти</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/groups">Групи</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/stats">Статистика</NavLink>
                    </li>
                </ul>
            </nav>
            <p>{props.user}</p>
        </div>
    );
};

export default Header;
