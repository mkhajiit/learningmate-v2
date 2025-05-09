# 🧠 1조 러닝메이트 프로젝트 - LearningMate

## 🔍 주제: Social Activity & Learning Service

유튜브처럼 강의 영상을 등록할 수 있고,  
모임 생성을 위한 게시판과 각 모임마다 슬랙처럼 사용할 수 있는 메신저 공간을 제공하는 웹 서비스입니다.

---

## 📆 프로젝트 진행 기록

- **2023-12-13**: 프로젝트 시작
- **2023-12-20**: GCP 인스턴스 생성 및 DB 구축 (협업 및 배포 환경 설정)
- **2023-12-21**: GitHub 협업 환경 구성 완료
- **2023-12-31**: 프로젝트 파일 구조 리팩토링
  - `learningmate-front` → `frontend`
  - `learningmate-server` → `backend`
  - `db.sql` 파일 → `migration` 폴더로 이동
- **2023-12-31**: `frontend`에 ESLint 적용
- **2024-01-07**: `multer` 사용 시 한글 파일명 깨짐 문제 → 1.4.4 버전으로 다운그레이드하여 해결
- **2024-01-15 ~ 01-19**: 총 3차례의 배포 테스트 진행

---

## 🛠 기술 스택

| 영역       | 기술                                       |
| ---------- | ------------------------------------------ |
| 프론트엔드 | React, Axios, styled-components, ESLint 등 |
| 백엔드     | Node.js, Express, MySQL, multer, dotenv 등 |
| 배포       | GCP, Cloudtype, GitHub                     |

---

## 결과물

[포트폴리오 보기](https://docs.google.com/presentation/d/1Q97nv8-hQS9OnwzVH8bf1W7l9xwMfFu0/edit?usp=drive_link&ouid=109584807367731844865&rtpof=true&sd=true)
