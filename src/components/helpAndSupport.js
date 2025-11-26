import './helpAndSupport.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, West, WestSharp } from '@mui/icons-material';

const helpAndSupport = () => (
  <div>
    <div className='navtopbar'>
      <Link to='/' style={{ textDecoration: 'none', color: '#5e5b5b' }}>
        <West style={{ verticalAlign: 'middle', marginRight: '8px' }} />
      </Link>
      <h2>Help and Support</h2>
    </div>
    <div className="help-and-support">
      <h1>Contact Us</h1>

      <p>Contact Us
        Mail : admin@gmail.com
      </p>
    </div>
  </div>
);

export default helpAndSupport;
