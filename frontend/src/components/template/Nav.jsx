import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* 
                Refatorar para que essa referência de 'a' não se repita.
                Anotado dia: 03-10-20 às 10:52
                Feito ? Não
            */}
            <Link to="/"><i className="fa fa-home"></i> Início </Link>
            <Link to="/users"><i className="fa fa-users"></i> Usuários </Link>
        </nav>
    </aside>