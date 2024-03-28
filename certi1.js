const prompt = require('prompt-sync')(); // prompt-sync 모듈 불러오기
const fs = require('fs');


// 변수 선언
const quizList = []; // 퀴즈 목록
let currentQuiz = null; // 현재 진행 중인 퀴즈
let score = 0; // 점수
let highScore = 0; // 최고 점수