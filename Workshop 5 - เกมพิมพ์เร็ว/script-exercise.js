const wordEl = document.getElementById("word");
const text_wordEl = document.getElementById("text-word");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const btn_levelEl = document.getElementById("level-btn");
const settingEl = document.getElementById("setting");
const level_formEl = document.getElementById("level-form");
const levelEl = document.getElementById("level");
const gameoverEl = document.getElementById("gameover");

const words = ["หมาป่า","แมวน้ำ","สิงโต","นกกาเหว่า","จิงโจ้","คิงคอง"];

// ตัวแปรเก็บค่าต่างๆ 
let randomWord;
let score=0;
let time=10;
let level='medium';
//ตัวแปรเริ่มนับเวลา
let timeInterval;
//ทำการดึงค่าจากโหมด ใน localStorage มาใช้
const saveMode=localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';

//ฟังชันสุ่มค่า word
function getRandonword(){
    return words[parseInt(Math.random()*words.length)];
}

// ฟังชันแสดงผล หลังจากสุ่ม
function displayWord(){
    randomWord = getRandonword();
    wordEl.innerHTML = `${randomWord}`;
    scoreEl.innerHTML = `คะแนน ${score}`
    timeEl.innerHTML = `เวลา ${time} s`;
}

// ฟังชันเพิ่มคะแนนเมื่อพิมตรงและถูก
function updateScore(){
    score = score+10; 
    scoreEl.innerHTML = `คะแนน ${score}`; 
}

// ฟังชันอัพเดทเวลา
function updateTime(){
    time--; 
    timeEl.innerHTML = `เวลา ${time} s`; 
    if (time == 0){
        //ใช้หยุดการนับเวลาถอยหลัง clearInterval(ชื่อตัวแปรที่ตั้งไว้)
        clearInterval(timeInterval);
        gameOver();
    }
}

// ฟังชันในการแสดงว่าเกมส์จบแล้ว
function gameOver(){
    gameoverEl.innerHTML = `<h1>จบเกมส์แล้วครับผม</h1><p class="p-finish">คะแนนของคุณ คือ ${score} คะแนน</p>
    <button class="btn-reload" onclick="location.reload()">ต้องการเล่นอีกครั้งไหม</button>`
    gameoverEl.style.display = "flex"    
}

//เริ่มต้นเรียกเพื่อแสดงผล ว่าอยู่ในโหมดอะไร ง่าย ปานกลาง ยาก
function startGame(){
    levelEl.value=saveMode;
    if(saveMode == 'easy'){
        time=15;
    }else if(saveMode == 'medium'){
        time=10;
    }else if (saveMode == 'hard'){
        time=5;
    }
    displayWord();
}

text_wordEl.addEventListener("input",(e)=>{
    //console.log(e.target.value) ใช้เป็นแบบนี้ก็ได้
    const temp_text = text_wordEl.value
    //นำค่าที่ได้มาเปรียบเทียบกับ word ว่าตรงกันไหม
    if(temp_text.trim() === randomWord){
        if(saveMode == 'easy'){
            time+=5;
        }else if(saveMode == 'medium'){
            time+=3;
        }else if (saveMode == 'hard'){
            time+=2;
        }
        displayWord();
        updateScore();
        text_wordEl.value = ""; 
    } 
});

//เมื่อกดปุ่ม จะมีระดับให้เลือกโดย ทำการสลับคลาส
btn_levelEl.addEventListener("click",()=>{
    settingEl.classList.toggle("hide")
})

levelEl.addEventListener("change",(event)=>{
    level = event.target.value;
    //เซ็ตไอเท็มลงใน storage คีย์คือ mode 
    localStorage.setItem("mode",level)
})

//เริ่มนับเวลาเมื่อนำเมาส์ไปวางบน input -> focus 
text_wordEl.addEventListener("focus",()=>{
    //ฟังชันนับเวลา setInterval(function,time(ms))
    timeInterval = setInterval(updateTime,1000)
})

startGame();
