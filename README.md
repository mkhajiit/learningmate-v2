# 1조 러닝메이트 프로젝트

반드시 .env파일을 learningmate-server에 넣고 실행시키세요

# 프로젝트 시작
deploy push할때는 git push origin deploy로 할 것
배포 테스트는 반드시 deploy branch에서

# 12-31 프로젝트 파일명 변경

learningmate-front => frontend
learningmaet-server => backend

db.sql파일 migration로 이동

변수명: carmelCase
컴포넌트: PascalCase
url: kebab-case
db: lower_snake_case
helpers : 1급함수
containers: api 통신들어가는 복잡한로직
constants: 상수를 저장
컴포넌트는 렌더링하는걸로만 쓰임
<br>

# 12-31 front에만 eslint적용

# 2024-01-07 multer로 파일명이 한글이면 깨지는문제 발생 1.4.4버전으로 다운그레이드

