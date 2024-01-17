// 뷰에 노출되는 텍스트가 너무 길면 ...으로 잘라주는 함수입니다
const cuttingText = (str, maxLength) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};

export default cuttingText;
