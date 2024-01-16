CREATE TABLE chat_room (
  channel_id INT             NOT NULL       AUTO_INCREMENT,
  meet_id    INT,
  CONSTRAINT chat_room_channel_id_pk PRIMARY KEY(channel_id),
  CONSTRAINT chat_room_meet_id_fk FOREIGN KEY(meet_id) REFERENCES meets(meet_id) 
  ON UPDATE CASCADE
  ON DELETE SET NULL
);


CREATE TABLE chat_history (
  chat_history_id INT             NOT NULL       AUTO_INCREMENT,
  channel_id      INT,
  sender_user_id  INT,
  content         TEXT            NULL,
  sent_time       DATETIME        NOT NULL       DEFAULT NOW(),
  CONSTRAINT chat_history_id_pk PRIMARY KEY(chat_history_id),
  CONSTRAINT channel_id_fk FOREIGN KEY(channel_id) REFERENCES chat_room(channel_id) ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT sender_user_id_fk FOREIGN KEY(sender_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL
);


-- 사용자가 생성한 모임(meet)의 ID를 사용하여 chat_room에 데이터를 삽입합니다.
INSERT INTO chat_room (meet_id)
VALUES (20)

-- chat_room 테이블에 description 컬럼 추가
ALTER TABLE chat_room
ADD COLUMN description VARCHAR(255);

-- chat_room 테이블에 participant_id 컬럼 추가
ALTER TABLE chat_room
ADD COLUMN participant_id INT,
ADD CONSTRAINT fk_participant
FOREIGN KEY (participant_id)
REFERENCES meet_participants(participant_id);

AlTER TABLE chat_room
DROP FOREIGN KEY participant_id


-- channel_id가 1인 행의 description 값을 업데이트
UPDATE chat_room
SET description = '공지사항'
WHERE channel_id = 4;

UPDATE chat_room
SET description = '자유게시판'
WHERE channel_id = 5;

UPDATE chat_room
SET description = '질문게시판'
WHERE channel_id = 6;

UPDATE chat_room
SET participant_id = 4
WHERE channel_id = 2;





-- sender_user_id가 15인 사람의 channel_id가 1번인 경우에 대한 chat_history 데이터 삽입
INSERT INTO chat_room (meet_id, description)
VALUES (19, '채널추가중');

UPDATE chat_history
SET content = '하하하'
WHERE channel_id = 1;

SELECT cr.meet_id, cr.channel_id, mp.participant_id, u.nickname 
                FROM chat_room cr JOIN meet_participants mp 
                ON cr.meet_id = mp.meet_id JOIN
                users u ON mp.user_id = u.user_id WHERE mp.status = 1
                AND mp.manager = 1; // 모임에 참여 승인 받은 사람들

SELECT cr.meet_id, cr.channel_id, u.nickname, ch.sent_time, ch.content FROM chat_room cr
              JOIN meet_participants mp ON cr.meet_id = mp.meet_id
              JOIN chat_history ch ON cr.channel_id = ch.channel_id 
              JOIN users u ON mp.user_id = u.user_id
              WHERE mp.manager = TRUE AND mp.status = TRUE AND cr.description = '공지사항'
              ORDER BY ch.sent_time;   // 모임별 채팅방 입장 시 보여질 공지사항 방(공지사항 방이 기본으로 뜹니다.)




SELECT cr.meet_id, cr.channel_id, u.nickname
                FROM chat_room cr
                JOIN meet_participants mp ON cr.meet_id = mp.meet_id
                JOIN users u ON mp.user_id = u.user_id
                WHERE cr.description = '공지사항' AND mp.meet_id = 19

SELECT 
                  m.title, 
                  cr.channel_id, 
                  cr.description as channel_description, 
                  u.nickname as user_nickname, 
                  ch.content as chat_content, 
                  ch.sender_user_id as chat_sender_user_id, 
                  ch.sent_time as chat_sent_time
                FROM chat_room cr
                JOIN meet_participants mp ON cr.meet_id = mp.meet_id
                JOIN users u ON mp.user_id = u.user_id
                JOIN meets m ON cr.meet_id = m.meet_id
                LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
                WHERE cr.description = '공지사항' AND mp.meet_id = 19 AND mp.status = 1
                ORDER BY ch.sent_time ASC


SELECT 
  mp.meet_id,
  cr.channel_id,
  u.nickname
FROM meet_participants mp
JOIN users u ON mp.user_id = u.user_id
JOIN chat_room cr ON mp.meet_id = cr.meet_id
WHERE mp.meet_id = 19 AND mp.status = 1;



SELECT 
  m.title as meet_title,
  cr.channel_id,
  u.nickname as user_nickname,
  ch.content as chat_content,
  ch.sender_user_id as chat_sender_user_id,
  ch.sent_time as chat_sent_time
FROM chat_room cr
JOIN meet_participants mp ON cr.meet_id = mp.meet_id
JOIN users u ON mp.user_id = u.user_id
JOIN meets m ON cr.meet_id = m.meet_id
LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
WHERE cr.meet_id = 19 AND mp.status = 1 AND cr.description = '공지사항'
ORDER BY ch.sent_time ASC;


SELECT 
                  m.title, 
                  cr.channel_id, 
                  cr.description as channel_description, 
                  u.nickname as user_nickname, 
                  ch.content as chat_content, 
                  ch.sender_user_id as chat_sender_user_id, 
                  ch.sent_time as chat_sent_time
                FROM chat_room cr
                JOIN meet_participants mp ON cr.meet_id = mp.meet_id
                JOIN users u ON mp.user_id = u.user_id
                JOIN meets m ON cr.meet_id = m.meet_id
                LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
                WHERE cr.description = '공지사항' AND mp.meet_id = 19 AND mp.status = 1
                ORDER BY ch.sent_time ASC



                SELECT
                  channel_id,
                  description as channel_description
                FROM chat_room
                WHERE meet_id = 19



                SELECT 
                  m.title, 
                  cr.channel_id, 
                  cr.description as channel_description, 
                  u.nickname as user_nickname, 
                  ch.content as chat_content, 
                  ch.sender_user_id as chat_sender_user_id, 
                  ch.sent_time as chat_sent_time
                FROM chat_room cr
                JOIN meet_participants mp ON cr.meet_id = mp.meet_id
                JOIN users u ON mp.user_id = u.user_id
                JOIN meets m ON cr.meet_id = m.meet_id
                LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
                WHERE cr.description = '공지사항' AND mp.meet_id = 19 AND mp.status = 1
                ORDER BY ch.sent_time ASC


                SELECT
                  channel_id,
                  description as channel_description
                FROM chat_room
                WHERE meet_id = 19


INSERT INTO meet_participants (meet_id, user_id, manager, status)
VALUES (19, 49, 0, 1);

SELECT 
    m.title, 
    cr.channel_id, 
    cr.description AS channel_description, 
    u.nickname AS user_nickname,
    u.profile_name,  
    ch.content AS chat_content, 
    ch.sender_user_id AS chat_sender_user_id, 
    ch.sent_time AS chat_sent_time
  FROM chat_room cr
  JOIN meet_participants mp ON cr.meet_id = mp.meet_id
  JOIN users u ON mp.user_id = u.user_id
  JOIN meets m ON cr.meet_id = m.meet_id
  LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
  WHERE cr.description = '공지사항' AND mp.meet_id = 19 AND mp.status = 1
  ORDER BY ch.sent_time ASC;

  SELECT 
      u.nickname AS user_nickname,
      u.profile_name,
      ch.content AS chat_content, 
      ch.sent_time AS chat_sent_time
    FROM chat_room cr
    JOIN meet_participants mp ON cr.meet_id = mp.meet_id
    JOIN users u ON mp.user_id = u.user_id
    JOIN chat_history ch ON cr.channel_id = ch.channel_id
    WHERE cr.meet_id = 19 
     AND cr.description = '공지사항'
     and ch.channel_id = 1
    ORDER BY ch.sent_time ASC;
  `,

SELECT * FROM users;
SELECT * FROM chat_room;
SELECT * FROM chat_history;
SELECT * FROM meet_participants;

SELECT ump.user_id, ump.meet_id, ump.status, ch.content, ch.sent_time
FROM chat_room cr
  JOIN chat_history ch on cr.channel_id = ch.channel_id 
  JOIN (SELECT u.user_id, u.profile_name, u.nickname, mp.meet_id, mp.status
        FROM users u 
          JOIN meet_participants mp ON mp.user_id = u.user_id) ump
WHERE ch.channel_id = 1 AND ump.status = 1 AND ump.meet_id = 19;
  


SELECT * 
FROM chat_room cr
  JOIN chat_history ch on cr.channel_id = ch.channel_id
WHERE ch.channel_id = 1;

SELECT sender_user_id 
FROM chat_history
GROUP BY sender_user_id;

-- USER INFO CHECK
SELECT *
FROM chat_room cr
  JOIN chat_history ch on cr.channel_id = ch.channel_id
  JOIN users u on u.user_id = ch.sender_user_id
WHERE ch.channel_id = 1;


SELECT * 
FROM chat_room cr
  JOIN chat_history ch on cr.channel_id = ch.channel_id
  JOIN users u
WHERE ch.channel_id = 1;


SELECT  *
FROM users u 
  JOIN meet_participants mp ON mp.user_id = u.user_id AND mp.status = 1;

SELECT u.user_id, u.profile_name, u.nickname, mp.meet_id, mp.status
        FROM users u 
          JOIN meet_participants mp ON mp.user_id = u.user_id) u ON ch.meet_id = 19



  SELECT 
    m.title, 
    cr.channel_id, 
    cr.description AS channel_description, 
    u.nickname AS user_nickname,
    u.profile_name,  
    ch.content AS chat_content, 
    ch.sender_user_id AS chat_sender_user_id, 
    ch.sent_time AS chat_sent_time
  FROM chat_room cr
  JOIN meet_participants mp ON cr.meet_id = mp.meet_id
  JOIN users u ON mp.user_id = u.user_id
  JOIN meets m ON cr.meet_id = m.meet_id
  LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
  WHERE cr.description like concat('%', ? , '%') AND mp.meet_id = 19 AND mp.status = 1
  ORDER BY ch.sent_time ASC;


SELECT *
  FROM chat_room cr
    JOIN chat_history ch on cr.channel_id = ch.channel_id
    JOIN users u on u.user_id = ch.sender_user_id
  WHERE ch.channel_id = 2;

SELECT DISTINCT
  m.title AS meets_title,
  u.nickname AS users_nickname,
  u.profile_name,
  cr.channel_id,
  cr.description
FROM
  meets m
JOIN
  meet_participants mp ON m.meet_id = mp.meet_id
JOIN
  chat_room cr ON m.meet_id = cr.meet_id
JOIN
  chat_history ch ON cr.channel_id = ch.channel_id
JOIN
  users u ON ch.sender_user_id = u.user_id
WHERE
  m.meet_id = 19;





INSERT INTO chat_room (meet_id, description) VALUES (19, '채널추가중');

INSERT INTO chat_room (channel_id, meet_id, description) VALUES
  (4, 19, '채널추가중'),


INSERT INTO chat_room (meet_id, description)
VALUES (19, '채널추가중');