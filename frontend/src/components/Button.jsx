import React from 'react';
import { Link } from 'react-router-dom';

function Button ({ to, label }) {
    return (
        <Link to={to} >
            {label}
        </Link>
  );
}
export default Button;