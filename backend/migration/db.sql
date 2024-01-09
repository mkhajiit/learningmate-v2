-- Active: 1703657196229@@34.64.245.68@3306@learningmate
DROP TABLE courses;

-- 강의 테이블 생성
CREATE TABLE courses (
    course_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(255) NOT NULL,
    content VARCHAR(1024) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attach_file_path VARCHAR(256),
    attach_file_name VARCHAR(256),
    CONSTRAINT courses_pk_course_id PRIMARY KEY(course_id),
    CONSTRAINT courses_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
) -- courses 테이블에 데이터 삽입 (user_id가 15인 사용자를 기준으로)
INSERT INTO
    courses (
        title,
        category,
        content,
        user_id,
        attach_file_path,
        attach_file_name
    )
VALUES
    (
        '강의 제목',
        '강의 카테고리',
        '강의 내용',
        15,
        '/path/to/attach/file',
        'attach_file_name'
    );

-- 강의 댓글 테이블 생성
CREATE Table comments (
    comment_id INT NOT NULL AUTO_INCREMENT,
    course_id INT,
    user_id INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(1024) NOT NULL,
    CONSTRAINT comments_pk_comment_id PRIMARY KEY(comment_id),
    CONSTRAINT comments_course_id_fk FOREIGN KEY (course_id) REFERENCES courses(course_id),
    CONSTRAINT comments_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
) -- course_comments 테이블에 데이터 삽입 (course_id가 1, user_id가 15인 사용자를 기준으로)
INSERT INTO
    comments (course_id, user_id, content)
VALUES
    (1, 19, '강의 댓글 테스트!!');

-- 강의 즐겨찾기 테이블 생성
CREATE Table bookmark (
    bookmark_id INT NOT NULL AUTO_INCREMENT,
    course_id INT,
    user_id INT,
    status tinyint(1) NOT NULL,
    CONSTRAINT bookmark_pk_bookmark_id PRIMARY KEY(bookmark_id),
    CONSTRAINT bookmark_course_id_fk FOREIGN KEY (course_id) REFERENCES courses(course_id),
    CONSTRAINT bookmark_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
)
ALTER TABLE
    bookmark
MODIFY
    status BOOLEAN NOT NULL;

ALTER TABLE
    courses
ADD
    COLUMN bookmark_count INT DEFAULT 0;

SELECT
    *
FROM
    bookmark;

SELECT
    courses.*
FROM
    bookmarks
    JOIN courses ON bookmarks.course_id = courses.course_id
WHERE
    bookmarks.user_id = 15;

INSERT INTO
    bookmark (user_id, course_id, status)
VALUES
    (15, 1, 1);

--제헌
-- 유저테이블 생성
-- Active: 1703034513814@@34.64.245.68@3306@learningmate
-- CREATE TABLE users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     email_code VARCHAR(20),
--     phone_number VARCHAR(50) NOT NULL UNIQUE,
--     password_hash VARCHAR(255) NOT NULL,
--     nickname VARCHAR(40) NOT NULL UNIQUE,
--     signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     profile_name VARCHAR(255),
--     profile_link VARCHAR(255),
-- );
-- ALTER TABLE
--     users
-- ADD
--     UNIQUE (email);
-- ;
-- select @@global.time_zone, @@session.time_zone;
--
--유저테이블 조회
SELECT
    *
FROM
    users;

-- ALTER TABLE
--     users
-- ADD
--     COLUMN profile_nickname VARCHAR(255);
SELECT
    *
FROM
    courses;

SELECT * FROM comments;
-- ALTER TABLE courses
-- ADD COLUMN attach_image_path VARCHAR(255);

-- ALTER TABLE courses
-- MODIFY COLUMN attach_image_path VARCHAR(256);
-- ALTER DATABASE learningmate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DELETE FROM courses;
ALTER TABLE meets
ADD COLUMN longitude DECIMAL(9,6);

SELECT * FROM meets;

SELECT * FROM comments;
----------------- 민경 -----------------
-------- meet table ------
DROP TABLE meets;

CREATE TABLE meets(
    meet_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1024) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    max_num INT NOT NULL DEFAULT 10,
    onoff BOOLEAN NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(20) NOT NULL,
    approve BOOLEAN NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW(),
    user_id INT,
    CONSTRAINT meet_meet_id_pk PRIMARY KEY(meet_id),
    CONSTRAINT meet_user_id_fk FOREIGN KEY(user_id) REFERENCES users(user_id) -- users 테이블의 user_id를 참조
    ON UPDATE CASCADE ON DELETE CASCADE
) -- 현재 제약을 삭제
ALTER TABLE
    meets DROP FOREIGN KEY meet_user_id_fk;

-- 새로운 제약을 추가하고 ON DELETE CASCADE 옵션을 설정
ALTER TABLE
    meets
ADD
    CONSTRAINT meet_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- meets 테이블에 manager 컬럼 추가 및 기본값 설정
-- ALTER TABLE meets ADD COLUMN manager INT DEFAULT 1;
-- meets 테이블에서 manager 컬럼 삭제
-- ALTER TABLE meets DROP COLUMN manager;
SELECT
    *
FROM
    meets;

---- TEST
-- CREATE 생성
INSERT INTO
    meets (
        title,
        content,
        start_date,
        end_date,
        max_num,
        onoff,
        image,
        category,
        approve,
        user_id
    )
VALUES
    -- ('모임1', '내용1', '2023-04-01', '2023-04-10', 20, 1, '/images/meetup1.jpg', '운동', 0, 15);
    -- ('모임2', '내용2', '2023-04-01', '2023-04-10', 25, 0, '/images/meetup2.jpg', '문화활동', 1, 16);
    -- ('모임3', '내용3', '2023-04-01', '2023-04-10', 40, 1, '/images/meetup3.jpg', '취미', 1, 17),
    -- ('모임4', '내용4', '2023-04-01', '2023-04-10', 45, 1, '/images/meetup3.jpg', '취미', 1, 19),
    -- ('모임5', '내용5', '2023-04-01', '2023-04-10', 10, 1, '/images/meetup3.jpg', '취미', 1, 20);
    -- ('코딩 스터디', '주제: 자바스크립트 프론트엔드', '2024-01-10', '2024-02-10', 15, 0, '/images/coding_study.jpg', '프로그래밍', 0, 41),
    -- ('요리 강연', '맛있는 음식 만들기에 관한 강연', '2024-02-01', '2024-02-28', 20, 1, '/images/cooking_event.jpg', '요리', 1, 42),
    -- ('피아노 연주회', '클래식 음악 감상 및 연주', '2024-03-15', '2024-03-20', 30, 0, '/images/piano_concert.jpg', '음악', 0, 43),
    (
        '제목',
        '내용',
        '2024-04-15',
        '2024-04-20',
        35,
        0,
        '/public/images/users/1704238664418_you.jpg',
        '취미',
        0,
        44
    );

-- READ 읽기
SELECT
    *
FROM
    meets;

SELECT
    *
FROM
    meets
WHERE
    meet_id = 14;

-- 전체 조회 (GROUP BY 해야하나?)
SELECT
    m.meet_id,
    u.user_id,
    u.nickname,
    title,
    DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt
FROM
    users u
    INNER JOIN meets m ON u.user_id = m.user_id
ORDER BY
    m.meet_id DESC
LIMIT
    0, 10;

-- 1개 게시물 조회 (meet 게시물 1번의 정보? (users의 닉네임과, 제목, 내용, 작성시간))
SELECT
    m.meet_id,
    u.nickname,
    title,
    content,
    start_date,
    end_date,
    max_num,
    onoff,
    image,
    category,
    approve,
    DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt
FROM
    users u
    INNER JOIN meets m ON u.user_id = m.user_id
WHERE
    m.meet_id = 14;

-- 닉네임 가져와지는 거 확인
-- UPDATE 수정
UPDATE
    meets
SET
    title = '모임1 제목 변경'
WHERE
    meet_id = 14;

-- DELETE 삭제
DELETE FROM
    meets
WHERE
    meet_id = 24;

------ participants table ------
-- 참가버튼을 누른 사람은 다 여기에 추가하고 manager, status가 1인 사람만 게시판으로 이동할 수 있게, status가 1인 사람만 리뷰를 작성할 수 있게
-- manager가 1인 사람만 삭제할 수 있게
DROP TABLE meet_participants;

CREATE TABLE meet_participants (
    participant_id INT NOT NULL AUTO_INCREMENT,
    meet_id INT,
    user_id INT,
    manager BOOLEAN NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT 0,
    -- 참여 여부
    CONSTRAINT meet_participants_participant_id_pk PRIMARY KEY(participant_id),
    CONSTRAINT meet_participants_meet_id_fk FOREIGN KEY(meet_id) REFERENCES meets(meet_id),
    -- meet 테이블의 meet_id를 참조
    CONSTRAINT meet_participants_user_id_fk FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 방금 추가한 모임의 meet_id 가져오기
SET
    @last_meet_id = LAST_INSERT_ID();

-- meet_participants 테이블에 관리자 추가
INSERT INTO
    meet_participants (meet_id, user_id, manager, status)
SELECT
    m.meet_id,
    m.user_id,
    1 AS manager,
    -- 매니저 값 설정
    1 AS status -- 상태 값 설정
FROM
    meets m
    INNER JOIN users u ON m.user_id = u.user_id
WHERE
    m.meet_id = @last_meet_id;

-- meet_participants 테이블에 참가자 추가
INSERT INTO
    meet_participants (meet_id, user_id)
VALUES
    (19, 45),
    (19, 46);

-- READ 모든 참가자 조회
SELECT
    *
FROM
    meet_participants;

-- 9번 meet을 만든 user 15번
SELECT
    user_id
FROM
    meets
WHERE
    meet_id = 9;

-- 게시물 당 참가자 전체 조회 (9번 게시물에 있는 모든 참가자)
SELECT
    p.participant_id,
    m.meet_id,
    u.user_id,
    u.nickname,
    p.status,
    CASE
        WHEN m.user_id = u.user_id THEN 1
        ELSE 0
    END AS manager
FROM
    meet_participants p
    INNER JOIN users u ON p.user_id = u.user_id
    INNER JOIN meets m ON p.meet_id = m.meet_id
WHERE
    p.meet_id = 19;

--......... 15번만 manager가 1이어야 하는데 16번도 1이네? 해결하기......
-- => 해결 완료! 생성자는 manager가 1이 나오고 참가자는 manager가 0이 나옴
-- => 이렇게 안 하고 meet_participants에서 모임을 만든 user_id랑 연결해서 manager랑 status를 1로 만들기
-- 모임을 만든 user_id랑 연결해서 manager랑 status를 1로 만들기
-- UPDATE 참가자 정보 수정 (참여 허가 되면 1로 바뀌게?)
UPDATE
    meet_participants
SET
    status = 1
WHERE
    participant_id = 3;

-- DELETE FROM meet_participants WHERE participant_id = 9;
-- 특정 참여자 삭제 (관리자만 가능 - 기능 둬야하나)
-- manager가 1인 사용자가 participant_id가 3인 참가자 삭제 이게 맞나
-- manager가 1인 모임 관리자가 본인이 만든 모임에 해당하는 참가자를 삭제
-- manager가 1인 사람만 삭제할 수 있게
DELETE FROM
    meet_participants
WHERE
    participant_id = ?
    AND meet_id = ?
    AND manager = 1 -- DELETE mp
    -- FROM meet_participants mp
    -- INNER JOIN meets m ON mp.meet_id = m.meet_id
    -- WHERE mp.participant_id = 10
    --   AND m.user_id = 16
    --   AND m.meet_id = 10;
    -- DELETE mp
    -- FROM meet_participants mp
    -- INNER JOIN meets m ON mp.meet_id = m.meet_id
    -- INNER JOIN users u ON m.user_id = u.user_id
    -- WHERE mp.participant_id = :participantId
    --   AND m.meet_id = :meetId
    --   AND u.manager = 1;
    -- DELETE FROM meet_participants
    -- WHERE meet_id = 19 AND participant_id = 20;
    -- 모임 설정 (참여자.... 관리자 화면의 편집 기능에서 참가자를 삭제할 수 있게)
    ------ review table ------
    DROP TABLE meet_reviews;

CREATE TABLE meet_reviews (
    review_id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(1024) NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    meet_id INT,
    user_id INT,
    CONSTRAINT meet_reviews_review_id_pk PRIMARY KEY(review_id),
    CONSTRAINT meet_reviews_meet_id_fk FOREIGN KEY(meet_id) REFERENCES meets(meet_id),
    -- meet 테이블의 meet_id를 참조
    CONSTRAINT meet_reviews_user_id_fk FOREIGN KEY(user_id) REFERENCES users(user_id)
);

SELECT
    *
FROM
    meet_reviews;

---- TEST
-- CREATE 리뷰 추가
-- inner join 사용? status
INSERT INTO
    meet_reviews (review_id, meet_id, user_id, content)
VALUES
    (1, 1, 17, '리뷰 내용 1'),
    (2, 1, 19, '리뷰 내용 2'),
    (3, 1, 20, '리뷰 내용 3');

-- READ 읽기
SELECT
    *
FROM
    meet_reviews;

SELECT
    *
FROM
    meet_reviews
WHERE
    review_id = 1;

-- 게시물 당 리뷰 전체 조회 (1번 게시물에 있는 모든 리뷰)
SELECT
    r.review_id,
    m.meet_id,
    u.nickname,
    r.content
FROM
    meet_reviews r
    INNER JOIN users u ON r.user_id = u.user_id
    INNER JOIN meets m ON r.meet_id = m.meet_id
WHERE
    m.meet_id = 1;

-- 리뷰 상세 조회 (1번 게시물의 1번 리뷰를 상세 보기)
SELECT
    r.review_id,
    m.meet_id,
    u.nickname,
    r.content
FROM
    meet_reviews r
    INNER JOIN users u ON r.user_id = u.user_id
    INNER JOIN meets m ON r.meet_id = m.meet_id
WHERE
    m.meet_id = 1
    AND r.review_id = 1;

-- DELETE 특정 리뷰 삭제 (리뷰를 작성한 사용자만 삭제 가능)
DELETE FROM
    meet_reviews
WHERE
    review_id = 1
    AND user_id = 17;