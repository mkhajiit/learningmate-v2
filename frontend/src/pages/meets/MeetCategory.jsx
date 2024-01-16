import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const categories = ['게임', '요리', '운동', '여행', '취미', '문화예술'];

const CategorySelection = () => {
  const login = useSelector((state) => state.auth.isAuth);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // 선택한 카테고리를 MeetList로 전달하면서 이동
    navigate(`/meets?category=${category}`);
  };

  const rows = [];
  const itemsPerRow = 3;

  for (let i = 0; i < categories.length; i += itemsPerRow) {
    const rowItems = categories.slice(i, i + itemsPerRow).map((category, index) => (
      <div
        key={index}
        style={{
          width: '150px',
          height: '150px',
          margin: '20px',
          border: `1px solid ${selectedCategory === category ? 'black' : 'gray'}`,
          borderRadius: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => handleCategorySelect(category)}
      >
        {category}
      </div>
    ));
    rows.push(
      <div key={i} style={{ display: 'flex' }}>
        {rowItems}
      </div>,
    );
  }

  return (
    <main id='main' style={{ marginLeft: '430px', marginTop: '50px' }}>
      <h2>카테고리를 선택하세요</h2>
      <div style={{ marginLeft: '10px' }}>
        {rows}
        <tr>
          <td colSpan={5} className='text-end'>
            {login && (
              <button
                className='btn btn-primary btn-sm'
                style={{ marginLeft: '415px', marginTop: '20px', marginBottom: '50px' }}
                onClick={() => navigate('/insert')}
              >
                새로운 모임 작성하기
              </button>
            )}
          </td>
        </tr>
      </div>
    </main>
  );
};

export default CategorySelection;
