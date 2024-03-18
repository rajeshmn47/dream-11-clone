import './helpAndSupport.css';

import React from 'react';

const helpAndSupport = () => (
  <div className="help-and-support">
    <h1>Contact Us</h1>

    <p>You may contact us using the information below:</p>

    <ul>
      <li>
        <p>
          <strong>Merchant Legal entity name:</strong>
          {' '}
          MEFIGURE CELEB PRIVATE
          LIMITED
        </p>
      </li>
      <li>
        <p>
          <strong>Registered Address:</strong>
          {' '}
          32B Grahi Nova bad,
          Muzaffarnagar, Uttar Pradesh, PIN: 251309
        </p>
      </li>
      <li>
        <p>
          <strong>Operational Address:</strong>
          {' '}
          32B Grahi Nova bad,
          Muzaffarnagar, Uttar Pradesh, PIN: 251309
        </p>
      </li>
      <li>
        <p>
          <strong>Email ID:</strong>
          {' '}
          <a href="mailto:mefigure11@gmail.com">mefigure11@gmail.com</a>
        </p>
      </li>
    </ul>

    <p>Thank you for reaching out to us!</p>
  </div>
);

export default helpAndSupport;
