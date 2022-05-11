const wordEl = document.getElementById("word");
const text_wordEl = document.getElementById("text-word");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const btn_levelEl = document.getElementById("level-btn");
const settingEl = document.getElementById("setting");
const level_formEl = document.getElementById("level-form");
const levelEl = document.getElementById("level");
const gameoverEl = document.getElementById("gameover");

//เก็บข้อมูลของคำโดยจะสุ่มแสดงผล
const words = ["หมาป่า","แมวน้ำ","สิงโต","นกพิราบ","จิงโจ้","คิงคอง","ลิง","ปลาดุก"];

// ตัวแปรเก็บค่าต่างๆ 
let randomWord;
let score=0;
let time=10;
let level;
// เริ่มต้นก็ทำการสุ่มค่าขึ้นมา 0-(ความยาวของลิส-1)
let temp_randomWord = parseInt(Math.random()*words.length);
//ตัวแปรเริ่มนับเวลา 
let timeInterval;
//ทำการดึงค่าจากโหมด ใน localStorage มาใช้
const saveMode=localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';

//ฟังชันสุ่มค่า word ทำการ return กลับไป
function getRandonword(){
    //สุ่มค่าขึ้นมาอีกครั้ง แล้วทำการเช็คว่าตรงกับ temp_randomWord ไหม
    let result_word = parseInt(Math.random()*words.length)
    // ถ้าหากว่าสตรงก็สุ่มใหม่จนกว่าจะไม่ตรง
    while(result_word == temp_randomWord){
        result_word = parseInt(Math.random()*words.length)
    }
    //ทำการเซฟค่าแล้วก็นำไปเช็คต่อไป
    temp_randomWord = result_word
    return words[result_word];
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
        //ใช้หยุดการนับเวลาถอยหลัง clearInterval(ชื่อตัวแปรที่ตั้งไว้) ซึ่งคือ timeInterval
        clearInterval(timeInterval);
        // ทำการเรียกฟังชันก์ gameOver() เพื่อแสดงผล
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
    //console.log(levelEl.selectedIndex)
    if(saveMode == 'easy'){
        time=15;
    }else if(saveMode == 'medium'){
        time=10;
    }else if (saveMode == 'hard'){
        time=5;
    }
    displayWord();
}

// event รับค่าใน input text
text_wordEl.addEventListener("input",(event)=>{
    //console.log(event.target.value) ใช้เป็นแบบนี้ก็ได้
    const temp_text = text_wordEl.value
    //นำค่าที่ได้มาเปรียบเทียบกับ word ว่าตรงกันไหม
    if(temp_text.trim() == randomWord){
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

//event เมื่อมีการเปลี่ยนแปลงตัวเลือก
levelEl.addEventListener("change",(event)=>{
    level = event.target.value;
    //เซ็ตไอเท็มลงใน storage คีย์คือ mode 
    //console.log(event.target.value)
    localStorage.setItem("mode",level)
})

//เริ่มนับเวลาเมื่อนำเมาส์ไปวางบน input -> focus 
text_wordEl.addEventListener("focus",(event)=>{
    //console.log(event.target)
    //ฟังชันนับเวลา setInterval(function,time(ms))
    //เมื่อเรอ่มต้นเปลี่ยน opacity เป็น 1 ให้มองเห็นได้
    wordEl.style.opacity = "1"
    timeInterval = setInterval(updateTime,1000)
})

//เรียกเพื่อเริ่มต้นแสดงผล
startGame();
