const express = require('express');
const path = require('path');

const app = express();
// Azure가 지정해주는 포트를 우선 사용하고, 로컬에서는 8080을 사용합니다.
const PORT = process.env.PORT || 8080;

// public 폴더 안의 파일들을 정적 파일로 제공하겠다는 설정
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Fitting Space 서버 실행 중: http://localhost:${PORT}`);
});