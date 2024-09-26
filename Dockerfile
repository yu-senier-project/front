# 빌드 이미지로 node:16 지정
FROM node:16 AS build
WORKDIR /app

# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json .

# 의존성 설치
RUN npm install

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# 서버 시간 한국으로 설정
ENV TZ Asia/Seoul

EXPOSE 5173

CMD ["npm", "run", "dev"]
