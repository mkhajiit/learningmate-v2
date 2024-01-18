import { useEffect, useState } from 'react';

function TypingEffect({ text }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index));
        index += 1;
      } else {
        clearInterval(interval); // 출력이 완료되면 interval을 멈춥니다.
      }
    }, 50); // 각 글자마다의 간격을 조절할 수 있습니다.

    return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval을 정리합니다.
  }, [text]);

  return <div>{displayedText}</div>;
}

export default TypingEffect;
