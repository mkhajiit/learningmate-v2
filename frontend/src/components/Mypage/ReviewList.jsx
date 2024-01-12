import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 서버에서 유저가 작성한 리뷰 데이터를 가져오는 API 호출
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/user/reviews'); // 실제 API 엔드포인트에 맞게 수정
        setReviews(response.data);
      } catch (error) {
        console.error('리뷰 데이터를 불러오는 중 에러 발생:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h3>내가 작성한 리뷰 목록</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h4>{review.title}</h4>
            <p>{review.content}</p>
            <p>평점: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
