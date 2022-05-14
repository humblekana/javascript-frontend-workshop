// เข้าถึง element 
const img_containerEl = document.getElementById("img-container")
const imgEl = document.querySelectorAll("#img-container img")
const prevEl = document.getElementById("prev")
const nextEl = document.getElementById("next")

// ตัวนับ index ของภาพ
let indexPicture = 0

// ตัวแปรเริ่มนับให้ภาพเลื่อนอัตโนมัต
let countTime = setInterval(slidePicture,3000)

//ฟังชันก์ร่วมกับ setInterval ภาพเลื่อนอัตโนมัต
function slidePicture(){
    indexPicture++
    changeImg()
}

// ฟังชันก์เปลี่ยนแปลงรูปภาพ
function changeImg(){
    // ถ้า index เกินขอบเขตบน ให้กลับไปเท่ากับ 0
    if (indexPicture >= imgEl.length){
        indexPicture = 0
    // ถ้า index เกินขอบเขตล่าง ให้กลับไปเท่ากับ รูปภาพสุดท้าย
    }else if (indexPicture < 0){
        indexPicture = imgEl.length-1
    }
    // ทำการเปลี่ยนแปลงรูปด้วยการ กำหนด style ดังนี้
    img_containerEl.style.transform = `translateX(${-(500*indexPicture)}px)`
    //console.log(`translateX(${-(500*indexPicture)}px)`)
}

// ฟังชันก์ในการ clearInterval 
function clearSetinterval(){
    clearInterval(countTime)
    
}

// ถ้ากด prev
prevEl.addEventListener("click",(event)=>{
    // clear
    clearSetinterval()
    //ลด index
    indexPicture--
    //เปลี่ยนแปลงรูป
    changeImg()
    //นับใหม่
    countTime = setInterval(slidePicture,2000)
})

// ถ้ากด next
nextEl.addEventListener("click",(event)=>{
    // clear
    clearSetinterval()
    //เพิ่ม index
    indexPicture++
    //เปลี่ยนแปลงรูป
    changeImg()
    //นับใหม่
    countTime = setInterval(slidePicture,2000)
})
