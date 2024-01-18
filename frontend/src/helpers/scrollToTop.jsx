import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // 페이지가 로드될 때 스크롤을 최상단으로 이동
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop;
