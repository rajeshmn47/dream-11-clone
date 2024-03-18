import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => handleClick()}>increase</button>
    </div>
  );
}
