// ดึงค่าตัวแปร
const toggleEl = document.getElementById("toggle")
const openEl = document.getElementById("open")
const closeEl = document.getElementById("close")
const modalEl = document.getElementById("modal-container")

// event เมื่อกดปุ่ม toggle 
toggleEl.onclick = (event)=>{ 
    document.body.classList.toggle("show-nav")    
}

//event เมื่อกดปุ่มสร้างบัญชีผู้ใช้ เปิด modal
openEl.onclick = (event)=>{
    modalEl.classList.add("show-modal")
}

//event เมื่อกดปุ่มกากบาทใน modal ให้ปิด modal
closeEl.addEventListener("click",(event)=>{
    modalEl.classList.remove("show-modal")
})

// event เมื่อกดด้านนอก modal ก็คือกด modol-container ให้ปิดการแสดง modal
window.addEventListener("click",(event)=>{
    //console.log(event.target)
    if (event.target == modalEl){
        modalEl.classList.remove("show-modal")
    }
})
