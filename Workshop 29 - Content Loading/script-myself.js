/* ดึงค่า element */
const card_headerEl = document.querySelector(".card-header")
const titleEl = document.querySelector(".title")
const descriptionEl = document.querySelector(".description")
const profile_imgEl = document.querySelector(".profile_img")
const nameEl = document.getElementById("name")
const priceEl = document.getElementById("price")

/* ดึงค่า element ที่มีคลาส animated_bg */
const animated_bg = document.querySelectorAll(".animated_bg")
/* ดึงค่า element ที่มีคลาส animated_text */
const animated_text = document.querySelectorAll(".animated_text")

// เมื่อ 4 วืนาที เรียกฟังชันก์ displayContent
setTimeout(displayContent,4000)

// ฟังชันก์แสดงผล
function displayContent(){
    /* ทำการลบ class animated_bg */
    animated_bg.forEach(element=>{
        element.classList.remove("animated_bg")
    })
    /* ทำการลบ class animated_text */
    animated_text.forEach(element=>{
        element.classList.remove("animated_text")
    })
    /* แสดงผลข้อมูลต่างๆ */
    card_headerEl.innerHTML = `<img src="https://cdn.pixabay.com/photo/2014/09/15/21/46/couch-447484_960_720.jpg" alt="">`
    titleEl.innerText = `เบาะรองนั่งคนท้อง`
    descriptionEl.innerText = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis accusantium officiis cumque, temporibus sequi odio.`
    profile_imgEl.innerHTML = `<img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">`
    nameEl.innerText = `amily`
    priceEl.innerText = `ราคา 5,000 บาท`
}