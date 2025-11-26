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

      <p>You may contact us using the information below:</p>

      <ul>
        <li>
          <p>
            <strong>Merchant Legal entity name:</strong>
            {' '}
            KARTAMI FINTECH PRIVATE
            LIMITED
          </p>
        </li>
        <li>
          <p>
            <strong>Registered Address:</strong>
            {' '}
            universal trade tower, sector 49, gurgaon, PIN: 122018
          </p>
        </li>
        <li>
          <p>
            <strong>Operational Address:</strong>
            {' '}
            universal trade tower, sector 49, gurgaon, PIN: 122018
          </p>
        </li>
        <li>
          <p>
            <strong>Email ID:</strong>
            {' '}
            <a href="mailto:info@dreamcricket11.com">info@dreamcricket11.com</a>
          </p>
        </li>
      </ul>

      <p>Thank you for reaching out to us!</p>
      <div style={{ display: 'flex', marginTop: "135px", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p>
          <strong>Designed and Developed by:</strong>
          {' '}
        </p>
        <p>
          KARTAMI FINTECH PRIVATE
          LIMITED
        </p>
      </div>
    </div>
  </div>
);

export default helpAndSupport;
