import React, { useLayoutEffect, useRef, useState } from 'react';

function Cracker({ isAnimated }) {
  const [animation, setAnimation] = useState(false);

  const RightRocket = useRef();
  const LeftRockets = useRef();

  useLayoutEffect(() => {
    if (RightRocket.current && LeftRockets.current) {
      RightRocket.current.style.bottom = '3rem';
      LeftRockets.current.style.bottom = '3rem';
    }
  }, [animation]);

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      {!animation && (
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => {
            setAnimation(true);
            isAnimated(true);
          }}
        >
          Let's celebrate this diwali
        </button>
      )}
    </section>
  );
}

export default Cracker;
