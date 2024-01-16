import styled from '@emotion/styled';

const CollapseButton = styled.button`
  background: transparent;
  border: none;
  width: 26px;
  height: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 20px; /* 아이콘 크기 설정 */

  ${({ collapse }) =>
    collapse &&
    `
    &::before {
      content: '▶'; /* 펼쳐진 상태에서의 아이콘 */
    }
  `};

  ${({ collapse }) =>
    !collapse &&
    `
    &::before {
      content: '▼'; /* 축소된 상태에서의 아이콘 */
    }
  `};
`;

export default CollapseButton;
