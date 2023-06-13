import React, { useEffect, useState } from 'react';

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleSize);
    handleSize();

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  useEffect(() => {
    if (windowSize.width >= 768) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }, [windowSize]);

  return [isDesktop, setDesktop];
};
