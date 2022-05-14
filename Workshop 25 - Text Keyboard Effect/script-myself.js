/* ทำการดึงค่า element ต่างๆ */
const textEl = document.getElementById("text")
const speedEl = document.getElementById("speed")

const text = "สวัสดีครับ ยินดีต้อนรับเข้าสู่เว็บไซต์"
// ตัวแปรเก็บความเร็วในการพิมพ์
let speed = 300 / parseInt(speedEl.value)

// ตัวแปรนับค่า index ของ text
let indexText = 1

// ทำการสร้างฟังชันก์ในการแสดงผล โดยทำการ แสดงตัวอักษรตาม speed
function writeText(){
    textEl.innerText = text.slice(0,indexText)
    //console.log(text.slice(0,indexText))
    //นับ index ขึ้นเรื่อยๆ
    indexText++;
    // ถ้าหากว่าแสดงจนสุดคำแล้วให้เริ่มแสดงใหม่
    if (indexText == text.length+1){
        indexText = 0
    }
    // ทำการใช้ setTimeout ในการเรียกฟังชันก์ writeText() แบบ infinite
    setTimeout(writeText,speed);
}
//เมื่อเกิดการเปลี่ยนแปลงค่า input ใส่ event ดังนี้
speedEl.addEventListener("input",(event)=>{
    // ถ้าห่างว่าเป็นค่า "" ให้ทำการ return ไม่ต้องทำอะไร
    if(event.target.value == ""){
        return
    }
    // เปลี่ยนแปลงความเร็ว
    speed = 300 / parseInt(speedEl.value)
    //console.log(event.target.value == "")
})

// เรียกฟังชันก์เริ่มต้น
writeText()
