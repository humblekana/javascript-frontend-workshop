const itemEl = document.querySelectorAll(".container .item")
//console.log(itemEl)

// เข้าถึงทุก item ด้วย for loop
itemEl.forEach((item)=>{
    // ใส่ event เมื่อมีการวางเมาส์บน element ให้เพิ่มคลาส active
    item.addEventListener("mouseover",()=>{
        item.classList.add("active")
    })
    // ใส่ event เมื่อมีการวางเมาส์บน element ให้ลบคลาส active
    item.addEventListener("mouseout",()=>{
        item.classList.remove("active")
    })
})