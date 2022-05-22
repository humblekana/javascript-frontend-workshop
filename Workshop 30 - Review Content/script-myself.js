// object ไว้เปลี่ยนการ review
const userdata = [
    {
        name:"ชัยพร",
        job:"พนักงานบริการ",
        text:"อากาศดี พนักงานต้อนรับได้ดี บริการรวดเร็ว อาหารธรรมดา ราคาแพงมาก",
        image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
    },
    {
        name:"ก้อง รักสยาม",
        job:"โปรแกรมเมอร์",
        text:"อากาศดีมากครับ อาหารสะอาดอร่อย เจ้าของร้านใจดีมาก จะมาอุดหนุนใหม่นะครับ",
        image:"https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg"
    },
    {
        name:"พี่ตูนคนหล่อ",
        job:"รับราชการ",
        text:"อาหารสะอาดอร่อย วิวที่ร้านสวยมาก เจ้าของร้านใจดีและอากาศดีมากครับ ",
        image:"https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg"
    },
    {
        name:"พี่โจโจ้",
        job:"นักเขียน",
        text:"อาหารอร่อย วิวสวย แต่ที่จอดรถน้อยไปหน่อย!",
        image:"https://cdn.pixabay.com/photo/2016/11/29/20/22/girl-1871104_960_720.jpg"
    },
    {
        name:"น้องตั๊กแตน",
        job:"พนักงานโรงแรม",
        text:"ราคาเป็นกันเอง อาหารโคตรอร่อย เจ้าของร้านและพนักงานน่ารัก",
        image:"https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_960_720.jpg"
    }
];


// เข้าถึงค่า element
const reviewEl = document.querySelector(".review")
const imgEl = document.querySelector(".user img")
const user_nameEl = document.querySelector(".user-name")
const user_jobEl = document.querySelector(".user-job")

// index ข้อมูล
let index = 1

// ฟังชันก์ในการแสดงผล เมื่อถึงเวลา
function displayReview(){
    // ดึงค่าข้อมูลจาก object มาเก็บในตัวแปรดังกล่าว
    const {name:nameEl,job:jobEl,text:textEl,image:imageEl} = userdata[index]
    // แสดงข้อมูลปกติ
    reviewEl.innerText = textEl
    imgEl.src = imageEl
    user_nameEl.innerText = nameEl
    user_jobEl.innerText = jobEl
    // มีการเพิ่ม index
    index++
    // ถ้าหากว่าเกินขอบเขต ให้กลับไปแสดงรูปเริ่มต้น
    if (index >= userdata.length){
        index = 0
    }
    
}

// เรียกฟังชันก์ทุกๆ 2 วินาที
setInterval(displayReview,3000)