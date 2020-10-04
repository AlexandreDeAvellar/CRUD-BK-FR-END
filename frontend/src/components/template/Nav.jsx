import React from 'react';
import './Nav.css';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* 
                Refatorar para que essa referência de 'a' não se repita.
                Anotado dia: 03-10-20 às 10:52
                Feito ? Não
            */}
            <a href="#/"><i className="fa fa-home"></i> Início </a>
            <a href="#/users"><i className="fa fa-users"></i> Usuários </a>
        </nav>
    </aside>