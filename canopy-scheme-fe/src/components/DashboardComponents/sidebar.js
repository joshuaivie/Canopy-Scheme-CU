import React from 'react';
import {  Link } from 'react-router-dom';
import {  MDBNav } from 'mdbreact' 
import * as ROUTES from '../../routes';

export default () => (
    
        <MDBNav className="flex-column side-nav-container">
            
                <Link to={ROUTES.APP}>Profile</Link>
            
            
                <Link to={ROUTES.ALLOCATION}>Allocation</Link>
            
            
                <Link to={ROUTES.SOMETHING}>Something</Link>
            
            
                
            
        </MDBNav>
    
)