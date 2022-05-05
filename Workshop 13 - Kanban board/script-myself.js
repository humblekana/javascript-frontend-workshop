const draggable = document.querySelectorAll(".drag-item")
const droppable = document.querySelectorAll(".drag-list")
//ตัวแปรเก็บไอเท็ม ที่ลาก
let keepItem

//console.log(draggable)
// ใส่event ให้กับทุก item
draggable.forEach((item) =>{
    //เมื่อเกิดการลาก
    item.addEventListener("dragstart",(event)=>{
        keepItem = event.target
        //console.log(event.target)
    })
})

//console.log(droppable)
// ใส่event ให้กับทุก list
droppable.forEach((list)=>{
    // สองส่วนนี้ปิดการทำงานไว้
    list.addEventListener("dragenter",(event)=>{
        event.preventDefault()
    })
    list.addEventListener("dragover",(event)=>{
        event.preventDefault()
    })
    
    //เมื่อเกิดการวาง
    list.addEventListener("drop",(event)=>{
        const ulList = event.target
        //console.log(event.target)
        //เช็คว่าลากไปวางใน UL ถ้าไม่ใช่จะกลายเป็น list ใน list
        if (ulList.tagName == "UL"){
            ulList.appendChild(keepItem)
            keepItem = undefined    
        }
    })
})


/*dragstart เกิดขึ้นเมื่อเริ่มต้นลากอิลิเมนต์
drag เกิดขึ้นขนาดกำลังลากอิลิเมนต์
dragenter เกิดขึ้นเมื่อลากอิลิเมนต์เข้าไปในจุดที่กำหนด
dragover เกิดขึ้นเมื่อทำการลากอิลิเมนต์อยู่ภายในจุดที่กำหนด
drop เกิดขึ้นเมื่อวางอิลิเมนต์ภายในจุดที่กำหนด
dragleave เกิดขึ้นเมื่อทำการลากอิลิเมนต์ออกจากเป้าหมาย
dragend เกิดขึ้นเมื่อสิ้นสุดกระบวนการทำงาน Drag and Drop */