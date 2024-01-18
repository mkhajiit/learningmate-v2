-- Active: 1703035126470@@34.64.245.68@3306@learningmate
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

SELECT
    *
FROM
    comments;

-- ALTER TABLE courses
-- ADD COLUMN attach_image_path VARCHAR(255);
-- ALTER TABLE courses
-- MODIFY COLUMN attach_image_path VARCHAR(256);
-- ALTER DATABASE learningmate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
DELETE FROM
    courses;

ALTER TABLE
    meets
ADD
    COLUMN longitude DECIMAL(9, 6);

SELECT
    *
FROM
    meets;

SELECT
    *
FROM
    comments;

ALTER TABLE
    courses
ADD
    COLUMN view_cnt INT DEFAULT 0;

ALTER TABLE
    comments DROP FOREIGN KEY comments_course_id_fk;

SHOW CREATE TABLE comments;

ALTER TABLE
    comments DROP FOREIGN KEY course_comments_course_id_fk;

ALTER TABLE
    comments
ADD
    CONSTRAINT course_comments_course_id_fk FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE;

DELETE FROM
    bookmark;

SELECT * FROM bookmark;

ALTER TABLE bookmark
DROP COLUMN status;

ALTER TABLE bookmark
DROP FOREIGN KEY user_id;

DROP TABLE bookmark;

CREATE TABLE bookmark (
    bookmark INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

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

ALTER TABLE meets
DROP COLUMN approve;

-- Modify start_date column to DATETIME
ALTER TABLE meets
MODIFY start_date TIMESTAMP NOT NULL;

-- Modify end_date column to DATETIME
ALTER TABLE meets
MODIFY end_date TIMESTAMP;


ALTER TABLE meets
MODIFY COLUMN image TEXT NOT NULL;

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
    ('코딩 스터디', '주제: 자바스크립트 프론트엔드', '2024-01-10', '2024-02-10', 15, 0, '/images/coding_study.jpg', '프로그래밍', 0, 41),
    ('요리 강연', '맛있는 음식 만들기에 관한 강연', '2024-02-01', '2024-02-28', 20, 1, '/images/cooking_event.jpg', '요리', 1, 42),
    ('피아노 연주회', '클래식 음악 감상 및 연주', '2024-03-15', '2024-03-20', 30, 0, '/images/piano_concert.jpg', '음악', 0, 43);

-- READ 읽기
SELECT
    *
FROM
    meets;

-- 전체 조회
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
    CONSTRAINT meet_reviews_user_id_fk FOREIGN KEY(user_id) REFERENCES users(user_id)
);

---- TEST
-- CREATE 리뷰 추가
INSERT INTO
    meet_reviews (meet_id, content, user_id)
VALUES
    (97, '리뷰 셀프 작성', 40),
    (98, '리뷰 셀프 작성', 40); 
    
-- READ 읽기
SELECT
    *
FROM
    meet_reviews;

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

-- DELETE 특정 리뷰 삭제
DELETE FROM
    meet_reviews
WHERE
    review_id = 1;


-- 강의 좋아요
CREATE TABLE likebutton (
    likebutton INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    meet_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (meet_id) REFERENCES meets(meet_id) ON DELETE CASCADE
);

-- 나현
-- 마이페이지 달력 일정 테이블 생성
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  start DATE,
  end DATE,
  memo VARCHAR(1024),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO events (user_id, title, start, end, memo) VALUES (70, '테스트일정', '2024-01-15', '2024-01-16', '테스트이벤트에 대한 메모');
SELECT * FROM events WHERE user_id = 70;
ALTER TABLE events
DROP FOREIGN KEY events_ibfk_1;
ALTER TABLE events
ADD FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON DELETE CASCADE;