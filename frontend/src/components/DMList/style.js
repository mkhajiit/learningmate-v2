// import styled from '@emotion/styled';

// const CollapseButton = styled.button`
//   background: transparent;
//   border: none;
//   width: 26px;
//   height: 26px;
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   margin-left: 10px;
//   cursor: pointer;
//   font-size: 16px; /* 아이콘 크기 설정 */

//   ${({ collapse }) =>
//     collapse &&
//     `
//     &::before {
//       content: '▶'; /* 펼쳐진 상태에서의 아이콘 */
//     }
//   `};

//   ${({ collapse }) =>
//     !collapse &&
//     `
//     &::before {
//       content: '▼'; /* 축소된 상태에서의 아이콘 */
//     }
//   `};
// `;

// export default CollapseButton;
// // import styled from '@emotion/styled';
// // // import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

// // const CollapseButton = styled.button`
// //   background: transparent;
// //   border: none;
// //   width: 26px;
// //   height: 26px;
// //   display: inline-flex;
// //   justify-content: center;
// //   align-items: center;
// //   color: white;
// //   margin-left: 10px;
// //   cursor: pointer;
// //   font-size: 16px; /* 아이콘 크기 설정 */

// //   ${({ collapse }) =>
// //     collapse &&
// //     `
// //     & ${FaCaretDown} {
// //       display: none; /* 펼쳐진 상태에서는 기본 아이콘 숨김 */
// //     }
// //   `};

// //   ${({ collapse }) =>
// //     !collapse &&
// //     `
// //     & ${FaCaretDown} {
// //       display: none; /* 축소된 상태에서는 아래쪽 아이콘 숨김 */
// //     }

// //     & ${FaCaretRight} {
// //       display: inline; /* 축소된 상태에서는 오른쪽 아이콘 표시 */
// //     }
// //   `};
// // `;

// // export default CollapseButton;
