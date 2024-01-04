import { useState, useEffect } from 'react';

const useRenderCount = () => {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prevCount => prevCount + 1);
  });

  return renderCount;
};



export default useRenderCount