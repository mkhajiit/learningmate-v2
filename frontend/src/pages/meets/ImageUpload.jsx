// /* eslint-disable no-console */
// import React, { useState } from 'react';
// import axios from 'axios';
// import { localDomain } from '../../config/config';

// const FileInputComponent = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('image', file);

//       // 업로드할 이미지를 포함한 FormData를 서버로 전송
//       await axios.post(`${localDomain}/meets/insert`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('이미지 업로드 성공');
//     } catch (error) {
//       console.error('이미지 업로드 실패', error);
//     }
//   };

//   return (
//     <div>
//       <input type='file' onChange={handleFileChange} />
//       <button onClick={handleUpload}>업로드</button>
//     </div>
//   );
// };

// export default FileInputComponent;
