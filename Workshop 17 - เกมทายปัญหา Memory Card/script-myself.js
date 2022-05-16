/* const card = document.querySelector(".card") */
// อ้างอิงไปยัง element 
const showEl = document.getElementById("show")
const btn_hiddenEl = document.getElementById("btn-hidden")
const add_containerEl = document.getElementById("add-container")
const card_containerEl = document.querySelector(".card-container")
const nextEl = document.getElementById("next")
const prevEl = document.getElementById("prev")
const currentEl = document.querySelector(".current")
const clearEl = document.getElementById("clear")
const questionEl = document.getElementById("question")
const answerEl = document.getElementById("answer")
const add_cardEl = document.getElementById("add-card")

/* index ของ card */
let indexCard = 0
let cardsEl = [] //เก็บจำนวนคำถามทั้งหมด
// ทำการเรียกฟังชันก์ getCardData() ที่ดึงข้อมูลจาก localStorage มาเก็บไว้ใน cardData
const cardData = getCardData()

// ฟังชันก์ดึงข้อมูลจาก localStorage
function getCardData(){
    const cards = JSON.parse(localStorage.getItem("card"))
    // ถ้าหากมีข้อมูล ให้เท่ากับข้อมูล ถ้าไม่มีข้อมูล ให้เท่ากับ [] ว่าง
    return cards == null ? [] : cards 
}

/* เมื่อ click ปุ่มจะ add class show */
showEl.addEventListener("click",(event)=>{
    add_containerEl.classList.add("show")
})

/* เมื่อ click ปุ่มจะ removw class show */
btn_hiddenEl.addEventListener("click",(event)=>{
    add_containerEl.classList.remove("show")
})

/* ฟังชันก์ในการสร้างการ์ด */
function createCard(){
    //console.log(cardData) 
    // ทำการวนลูปใน cardData
    // ต้องมีข้อมูลถึงจะทำการวนลูป
    if (cardData != ""){
        cardData.forEach((element,i)=>{
            createSingleCard(element,i)
        })
    }
    
}

// ฟังชันก์ในการสร้าง card
function createSingleCard(element,index){
    // สร้าง element div
    const card = document.createElement("div")
    // ทำการแอด class card
    card.classList.add("card")

    // ถ้าเป็น ตัวแรกให้ add class active เพื่อแสดงเลย
    // ทำงานแค่ครั้งแรกเท่านั้น เพราะ index เพิ่มขึ้นเรื่อยๆ
    if (index == 0){
        card.classList.add("active")
    }
    
    // ใส่เนื้อหาภายใน card
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${element.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${element.answer}</p>
            </div>
        </div>
    `
    // แอด event เมื่ิอ click แล้วสลับ class show-answer เพื่อหมุนดูเฉลย แล้วหมุนกลับ
    card.addEventListener("click",(event)=>{
        card.classList.toggle("show-answer")
    }) 
    cardsEl.push(card)
    // เพิ่มโหนดลูก
    card_containerEl.appendChild(card)
    //อัพเดทข้อที่อยู่ ณ ปัจจุบัน
    updateCurrentQuestion()
}

// ฟังชันก์อัพเดทข้อ ณ ปัจจุบัน
function updateCurrentQuestion(){
    currentEl.innerText = `${indexCard+1}/${cardsEl.length}`
}


// ถ้าหาก click ปุ่มไปข้างหน้า
nextEl.addEventListener("click",()=>{
    // ทำการลบ class active card ปัจจุบัน
    cardsEl[indexCard].classList.remove("active") 
    // เลื่อน index ไปข้างหน้า
    indexCard++
    // เช็คขอบของข้อมูล
    if (indexCard >= cardsEl.length){
        indexCard = cardsEl.length-1
    } 
    // แอด class active ให้ตัวต่อมาเพื่อแสดง
    cardsEl[indexCard].classList.add("active")   
    //อัพเดทข้อที่อยู่ ณ ปัจจุบัน
    updateCurrentQuestion()
})

// ถ้าหาก click ปุ่มไปข้างหลัง
prevEl.addEventListener("click",()=>{
    // ทำการลบ class active card ปัจจุบัน
    cardsEl[indexCard].classList.remove("active") 
    // เลื่อน index ไปข้างหลัง
    indexCard--
    //เช็คขอบของข้อมูล
    if (indexCard < 0){
        indexCard = 0
    }    
    // แอด class active ให้ตัวต่อมาเพื่อแสดง
    cardsEl[indexCard].classList.add("active")
    //อัพเดทข้อที่อยู่ ณ ปัจจุบัน
    updateCurrentQuestion()   
})

// มีการ click ปุ่ม เพิ่มโจทย์ 
add_cardEl.addEventListener("click",(event)=>{
    // ทำการดึงคำถามและเฉลยจาก  textarea
    const question = questionEl.value
    const answer = answerEl.value

    //เช็คว่าใส่ข้อมูลไหม
    if (question.trim() == "" || answer.trim() == ""){
        alert("ใส่ข้อมูลให้ครบ")
    }else{
        // สร้าง object
        const newCard = {question,answer}
        // เรียกฟังชันก์เพื่อสร้าง card แล้วแอด card ลงใน cardsEl 
        createSingleCard(newCard,cardsEl.length)
        // เคลียร์ค่าที่แสดงอยู่
        questionEl.value = ""
        answerEl.value = ""
        // ทำการลบ class remove เพื่ออกจากหน้าแบบฟอร์ม
        add_containerEl.classList.remove("show")
        //แอด object ลงใน cardData
        cardData.push(newCard)
        // นำ cardData ไปใส่ใน localStorage จากการเรียกฟังชันก์  setCardData(cardData)
        setCardData(cardData)
    }
})

// ฟังชันก์ทำการบันทึกค่าใน localStorage
function setCardData(card){
    localStorage.setItem("card",JSON.stringify(card))
    // บันทึกเสร็จแล้วก็ reload เลย
    // พอ reload ก็จะดึงค่าจาก localStorage แล้วมาเก็บใน cardData บรรทัด 19
    location.reload()
}

// ทำการเคลียทุกอย่าง ทั้งใน localStorage และ card_containerEl
clearEl.addEventListener("click",()=>{
    localStorage.clear()
    card_containerEl.innerHTML = ""
    // reload
    location.reload()
})

// เรียกฟังชันก์เริ่มต้น
createCard()