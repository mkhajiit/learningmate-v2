import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarContainer = styled.div`
  display: ${(props) => (props.isCalendarOpen ? 'block' : 'none')};
  position: fixed; /* fixed로 변경 */
  top: 50%; /* 상단 정렬 대신 중앙 정렬 */
  left: 50%; /* 좌측 정렬 대신 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 변형 추가 */
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  color: #555;
`;

const CalendarTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const MyCalendar = ({ isCalendarOpen, targetElement, onChange, onClose, onDateClick }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const calendarRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (targetElement && calendarRef.current) {
        const rect = targetElement.getBoundingClientRect();
        const top = rect.bottom + window.scrollY;
        const left = rect.left + window.scrollX;
        setPosition({ top, left });
      }
    };

    const handleDateClick = (date) => {
      onChange(date);
      onClose();
      onDateClick(date);
    };

    if (isCalendarOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isCalendarOpen, targetElement]);

  return (
    <CalendarContainer isCalendarOpen={isCalendarOpen} position={position} ref={calendarRef}>
      {isCalendarOpen && (
        <>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <CalendarTitle>Select a Date</CalendarTitle>
          <StyledCalendar onChange={onChange} prev2Label={null} next2Label={null} />
        </>
      )}
    </CalendarContainer>
  );
};

export default MyCalendar;
