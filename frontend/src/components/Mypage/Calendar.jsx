import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setEvents, addEvent, updateEvent, deleteEvent } from '../../store/eventStore';
import { serverDomain } from '../../config/config';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const events = useSelector((state) => state.events);
  console.log(events);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${serverDomain}/events/getEvents/${userInfo.userId}`);
      dispatch(setEvents(response.data.data));
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [userInfo.userId]);

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt('새 이벤트의 제목을 입력하세요:');
    if (title) {
      try {
        // 서버에 새 이벤트 추가
        const response = await axios.post(`${serverDomain}/events/insert`, {
          user_id: userInfo.userId,
          title,
          start: moment(start).format('YYYY-MM-DD'),
          end: moment(end).format('YYYY-MM-DD'),
        });
        // Redux 상태 업데이트
        await fetchEvents();
        console.log(events);
      } catch (error) {
        console.error('Error adding new event:', error);
      }
    }
  };

  const handleUpdateEvent = async (id, updatedEvent) => {
    try {
      // 서버에 이벤트 업데이트 요청
      await axios.put(`${serverDomain}/events/update/${id}`, updatedEvent);
      // Redux 상태 업데이트
      await fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = (id) => async (event) => {
    try {
      event.stopPropagation();
      // 서버에 이벤트 삭제 요청
      await axios.delete(`${serverDomain}/events/delete/${id}`);
      // Redux 상태 업데이트
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={(event) => {
          const updatedTitle = window.prompt('이벤트 제목을 수정하세요:', event.title);
          if (updatedTitle) {
            handleUpdateEvent(event.id, { ...event, title: updatedTitle });
          }
        }}
        eventPropGetter={(event, start, end, isSelected) => {
          const backgroundColor = isSelected ? 'red' : event.color;
          return { style: { backgroundColor } };
        }}
        components={{
          event: ({ event }) => (
            <div>
              <strong>{event.title}</strong>
              <button onClick={handleDeleteEvent(event.id)}>삭제</button>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default MyCalendar;
