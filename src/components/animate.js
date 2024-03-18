import { useEffect, useState } from 'react';
import ReactCanvasConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

function Animate({ confetti, setConfetti }) {
  const { width, height } = useWindowSize();
  const isAnimated = (value) => {
    setConfetti(true);
  };

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const showAnimation = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', showAnimation);
    return () => {
      window.removeEventListener('resize', showAnimation);
    };
  }, [dimensions]);

  return (
    <div className="flex justify-center flex-col w-full h-screen bg-gray-900">
      {confetti && (
        <ReactCanvasConfetti
          width={dimensions.width - 10}
          height={dimensions.height - 10}
          opacity={0.6}
        />
      )}
    </div>
  );
}

export default Animate;
