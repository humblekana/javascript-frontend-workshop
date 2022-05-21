// ดึงค่า element 
const rating_containerEl = document.querySelector(".rating-container")
const ratingEl = document.querySelectorAll(".rating")
const panelEl = document.getElementById("panel")
const submitEl = document.getElementById("submit")

// ตัวแปรเก็บค่าความพึงพอใจ
let selectText

// เมื่อมีการ click ใน rating_containerEl
rating_containerEl.addEventListener("click",(event)=>{
    // ทำการเคลียค่า
    clearActive()
    //console.log(event.target)
    // ทำการเช็คว่าคลิ๊กตรงส่วนไหน
    // ถ้าคลิ๊กแล้วได้ส่วน parent เป็น class rating
    if (event.target.parentNode.classList.contains("rating")){
        //console.log(event.target.parentNode)
        // ให้แอด class active ใน parent ที่ได้
        event.target.parentNode.classList.add("active")
        //ทำการดึงค่าความพึงพอใจ
        selectText = event.target.parentNode.children[1].innerText
        //console.log(selectText)
    // ถ้าคลิ๊กแล้วได้ส่วน parent เป็น class rating-container
    }else if (event.target.parentNode.classList.contains("rating-container")){
        // ให้แอด class active ใน element ที่ได้เลย
        event.target.classList.add("active")
        //ทำการดึงค่าความพึงพอใจ
        selectText = event.target.children[1].innerText
        //console.log(selectText)
    }
})

//ฟังชันก์ในการเคลีย class active ให้เคีลยทิ้งทุก element
function clearActive(){
    ratingEl.forEach((e)=>{
        e.classList.remove("active")
    })
}

// เมื่อ click ปุ่ม
submitEl.addEventListener("click",(event)=>{
    // ถ้ายังไม่มีการเลือกความพึงใจ ต้องเลือกก่อน
    if (!selectText){
        alert("คุณต้องประเมินความพึงพอใจก่อน")
    // แสดงผลลัพธ์ความพึงพอใจ
    }else{
        panelEl.innerHTML = `
            <img src="./image/heart.svg" alt="" width="80px" hight="60px">
            <h4>การประเมินของคุณเสร็จสมบูรณ์</h4>
            <p style="margin-top: 0;">ผลการประเมินของคุณ <b>${selectText}</b></p>
        `   
    }
    
})