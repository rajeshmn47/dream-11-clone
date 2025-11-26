import './helpAndSupport.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { West } from '@mui/icons-material';

const HelpAndSupport = () => (
  <div>
    <div className='navtopbar'>
      <Link to='/' style={{ textDecoration: 'none', color: '#5e5b5b' }}>
        <West style={{ verticalAlign: 'middle', marginRight: '8px' }} />
      </Link>
      <h2>Help & Support</h2>
    </div>

    <div className="help-and-support">
      <h1>Contact Us</h1>

      <p>If you need assistance or have any questions, feel free to reach out to us:</p>

      <p>
        <strong>Email : </strong>  
        <a href="mailto:admin@gmail.com" style={{ color: '#1976d2', textDecoration: 'none' }}>
          admin@gmail.com
        </a>
      </p>

      <p>We usually respond within 24–48 hours.</p>
    </div>
  </div>
);

export default HelpAndSupport;
