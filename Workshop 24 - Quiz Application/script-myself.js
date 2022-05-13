// เก็บข้อมูลต่างๆ คำถาม choice คำตอบ
const questionData = [
	{
	  question:"1.ข้อใดไม่ใช่ระบบปฏิบัติการ",
      a:"ระบบปฏิบัติการดอส",
      b:"ไมโครซอฟท์เวิร์ด",
      c:"ไมโครซอฟต์วินโดวส์",
      d:"ระบบปฏิบัติการแอนดรอยด์",
      correct:"b"
	},
    {
        question:"2.ข้อใดคือโปรแกรม Web Browser",
        a:"Google Chrome",
        b:"Keyboard",
        c:"Mouse",
        d:"Monitor",
        correct:"a"
    },
    {
        question:"3.ข้อใดคือฮาร์ดแวร์",
        a:"Keyboard",
        b:"Mouse",
        c:"Monitor",
        d:"ถูกทุกข้อ",
        correct:"d"
    },
    {
        question:"4.ใครหล่อที่สุดในโลก",
        a:"คะน้า",
        b:"ใครก็ได้ที่ไม่ใช่คะน้า",
        c:"คะน้า ยังไงก็คะน้า",
        d:"a c ถูกต้อง",
        correct:"d"
    }
]

// ดึงค่าตัวแปรต่างๆ
const questionEl = document.getElementById("question")
const answerEl = document.querySelectorAll(".answer")
const choiceA = document.getElementById("a-text")
const choiceB = document.getElementById("b-text")
const choiceC = document.getElementById("c-text")
const choiceD = document.getElementById("d-text")
const submitEl = document.getElementById("submit")
const resultEl = document.getElementById("result")
const question_headerEl = document.querySelector(".question-header")

// อ้างอิงข้อแต่ละข้อ
let index = 0
// คะแนน
let score = 0
// ตัวแปรเก็บค่าคำตอบ
let result

// ฟังชันก์ในการแสดงข้อมูล
function displayQuestion(){
    //ก่อนจะเริ่มแสดงค่าต่างๆ เราต้อง clear ค่า check radio ไม่ให้เลือกอะไรเลย
    clearRadio()
    //นำค่าแต่ละตัวมาแสดง
    questionEl.innerText = questionData[index].question
    choiceA.innerText = questionData[index].a
    choiceB.innerText = questionData[index].b
    choiceC.innerText = questionData[index].c
    choiceD.innerText = questionData[index].d
    
}

// ฟังชันก์ในการ clear ค่า radio
function clearRadio(){
    // ทำการวนลูปและ set ให้ checked = false เพื่อไม่ให้มีการเลือกตัวเลือกใน radio
    answerEl.forEach((answer)=>answer.checked = false)
    /* answerEl.forEach((answer)=>{
        console.log(answer.checked)
    })  */
}

// ทำการใส่ event ถ้าหาก click ปุ่ม
submitEl.addEventListener("click",()=>{
    //ทำการวนลูปเพื่อเช็คว่าเลือกคำตอบตัวไหน ดึงเอา id มาเก็บใน result
    answerEl.forEach((answer)=>{
        if (answer.checked == true){
            result = answer.id
        }
    }) 
    // ถ้าไม่มีการเลือกคำตอบ แสดงว่า result = undefined
    if (!result){
        alert("คุณต้องเลือกคำตอบอย่างน้อย 1 ข้อ")
    }else{
        // ถ้าตอบถูกเพิ่มคะแนน
        if (result == questionData[index].correct){
            score++    
        }
        // ทำการเปลี่ยนข้อโดยการเพิ่ม index
        index++
        // ถ้ายังไม่ถึงข้อสุดท้ายไม่แสดงผลข้อต่อไป
        if (index <= questionData.length-1){
            displayQuestion()
        // ถ้าหมดทุกข้อแล้วแสดงคะแนน
        }else{
            question_headerEl.hidden = true
            resultEl.hidden = false
            resultEl.children[0].innerText = `คะแนนของคุณคือ ${score} คะแนน จาก ${questionData.length}`
        }
    }
    console.log(resultEl.children[0])
    /* console.log(score)
    console.log(index)
    console.log(result) */
})


//เริ่มต้นเรียกบราวเซอร์
displayQuestion()