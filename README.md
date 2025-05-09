# 🧠 1조 러닝메이트 프로젝트 - LearningMate

👉 팀 협업 및 PR 기록은 기존 리포지토리에서 확인 가능합니다.
기존 리포지토리 PR 내역: [https://github.com/mkhajiit/LearningMate/pulls?q=is%3Apr+is%3Aclosed]

## 구현한 기능

회원가입, 로그인, 챗봇, 깃허브 협업 환경 구성, about 페이지, 강의 페이지, 카카오 맵 기능, 홈페이지

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

## 리펙토링 계획

2. 챗봇 부활 시키기
3. fs으로 강의 삭제시 이미지/비디오 자동 삭제 되도록 구현하기
4. CSS 고치기
5. 프론트엔드는 vercel, 백앤드는 railway로 재배포하기, db는 아직 못정함

## 리펙토링 현황

로컬 환경에서 모든 기능은 잘됨
프론트쪽 domain 설정은 chat기능쪽 제외하고 axios 인스턴스를 api로 만들어서 통합함
백앤드쪽 domain 설정은 config.js에 선언된 localDomain, deployDomain을 수동으로 바꿔서 설정
백앤드쪽은 express-generator를 쓴듯? port설정은 www.js에서 가능함
feature 폴더 내부에 각 항목의 기능별로 페이지와 컴포넌트를 구분했음

## 리펙토링 중 발생한 문제들

폴더를 만들고 경로를 옮길때 현재 설정된 프리셋 때문에 수동으로 하다 컴포넌트의 경로가 꼬이는 일 발생했음 => setting.json에서 "javascript.updateImportsOnFileMove.enabled": "prompt" 변경해서 파일 옮기면 자동으로 경로 수정해줄지 물어보도록 수정함

카카오맵 api가 바뀌어서 api가 작동을 안했다. 1년전에는 없었는데 카카오 내 어플리케이션 제품 설정 카카오맵에 들어가서 on을 시켜야 작동한다.
