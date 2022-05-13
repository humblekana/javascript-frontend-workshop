// ดึงค่าตัวแปรมาปกติ
const containerEl = document.querySelector(".container")
const leftEl = document.querySelector(".content.left")
const rightEl = document.querySelector(".content.right")

// เกิด event เมื่อนำไปเมาส์ไปวาง
leftEl.addEventListener("mouseover",()=>{
    containerEl.classList.add("hover-left")
})
// เกิด event เมื่อนำไปเมาส์ออก
leftEl.addEventListener("mouseout",()=>{
    containerEl.classList.remove("hover-left")
})
// เกิด event เมื่อนำไปเมาส์ไปวาง
rightEl.addEventListener("mouseover",()=>{
    containerEl.classList.add("hover-right")
})
// เกิด event เมื่อนำไปเมาส์ออก
rightEl.addEventListener("mouseout",()=>{
    containerEl.classList.remove("hover-right")
})