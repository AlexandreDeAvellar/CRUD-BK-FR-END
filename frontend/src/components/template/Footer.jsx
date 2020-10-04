import React from 'react';
import './Footer.css';

export default props =>
    <footer className="footer">
        <span>
            Desenvolvido com <i className={`${props.libIcon}heart text-danger`}> </i> por
            <strong> Cod<span className="text-danger">3</span>er</strong>
        </span>
    </footer>