// import React from 'react';
// import QRCode from 'qrcode.react';
// import Navbar from "./navbar";

// const Donate = () => {
//   // const donationLink = 'https://www.facebook.com/';

//   return (
//     <>
//       <Navbar />

//       <Img
//         src={`Mefigure11Logo.png`}
//         alt=""
//       />

//     </>
//   );
// };

// export default Donate;

import React from 'react';

function Donate() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="mefigureQR.png"
        alt="Donate Image"
        style={{
          maxWidth: '100%',
          maxHeight: '80%',
          width: 'auto',
          height: 'auto',
        }}
      />
    </div>
  );
}

export default Donate;
