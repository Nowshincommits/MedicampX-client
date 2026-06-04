// import React from 'react';
import { NavLink } from 'react-router';

const Logo = () => {
    return (
        <div>
             <NavLink to="/" className="flex items-center">
                      <h1 className="text-2xl font-bold tracking-tight font-poppins">
                        MediCamp
                        <span className="font-extrabold text-primary">X</span>
                      </h1>
                    </NavLink>
        </div>
    );
};

export default Logo;