const categoryEl = document.querySelectorAll(".category")

// เมื่อ window มีการ scroll
window.addEventListener("scroll",(event)=>{
    // ความสูงของ window ซึ่งคงที่
    //console.log("window hight",window.innerHeight-500)
    
    //ทำการ for loop เพื่อเช็คค่า ค่าที่ได้จาก xxx..getBoundingClientRect().top
    // ซึ่งค่าที่ได้จะมีค่าเปรียบเสมือนพื้นที่มีค่าจากจุดสูงสุดน้อยลงจะเห็นภาพเมื่อ console.log
    // ซึ่งยิ่งทำการ scroll ลง พื้นที่ก็จะน้อยลง สามารถติดลบได้
    for (let category = 0;category<categoryEl.length-1;category++){
        //console.log("distance",categoryEl[category].getBoundingClientRect().top)  
        // ถ้าหากว่าเลื่อนลงไปเรื่อยๆแล้วมีีค่าน้อยกว่า xxx.getBoundingClientRect().top มีค่าน้อยกว่า window.innerHeight-500
        if (window.innerHeight-500>categoryEl[category].getBoundingClientRect().top){
            //ให้ทำการแอด class active
            categoryEl[category].classList.add("active")
        }else{
            categoryEl[category].classList.remove("active")
        }
    }
    
    // เช็คตัวสุดท้าย เนื่องจาก ไม่สามารถ scroll ลงแล้วทำให้ค่าน้อยกว่า window.innerHeight-500 ได้
    if (window.innerHeight-500>categoryEl[categoryEl.length-1].getBoundingClientRect().top-200){
        categoryEl[categoryEl.length-1].classList.add("active")
    }else{
        categoryEl[categoryEl.length-1].classList.remove("active")
    }
})