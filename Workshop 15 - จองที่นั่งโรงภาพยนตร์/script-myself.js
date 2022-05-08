const containerEl = document.querySelector(".container")
//เลือกที่นั่งทุกที่ที่ไม่ใช่ที่ถูกเลือกแล้ว
const seats = document.querySelectorAll(".row .seat:not(.choosed)")
//console.log([...seats])

const countEl = document.getElementById("count")
const totalEl = document.getElementById("total")
const movieEl = document.getElementById("movie")

//ตัวแปรเก็บค่าที่ได้จากการเลือกภาพยนตร์
let price = parseInt(movieEl.value)

//ฟังชัน ทำการดูว่าเมื่อคลิ๊กแล้ว
function updateOrder(){
    // ทำการดูว่าเลือกที่นั่งกี่จำนวนนำค่ามาคำนวณแล้วแสดงในบราวเซอร์
    const selectedSeats = document.querySelectorAll(".row .seat.selected")
    //console.log([...selectedSeats])
    const numSeats = [...selectedSeats].map(e=>[...seats].indexOf(e))
    //console.log(numSeats)
    //แปลงด้วย JSON.stringify() ไม่งั้นข้อมูลจะไม่เป็น array ใน localStorage
    localStorage.setItem("numSelectedSeat",JSON.stringify(numSeats))
    const amountSeat = selectedSeats.length
    countEl.innerText = amountSeat
    totalEl.innerText = amountSeat*price
}

//ฟังชันก์เก็บค่า ลำดับของหนัก และราคาของหนัง
function keepInfoMovie(indexMovie,priceMovie){
    //console.log(indexMovie,priceMovie)
    localStorage.setItem("indexMovie",indexMovie)
    localStorage.setItem("priceMovie",priceMovie)
}

// ฟังชันก์ในการแสดงผลเมื่อมีข้อมูลอยู่ใน localStorage แล้ว จะรีเซ็ตบราวเซอร์ข้อมูลก็ยังอยู่
function displayUI(){
    const numSelectedSeat = JSON.parse(localStorage.getItem("numSelectedSeat"))
    const indexSeat = localStorage.getItem("indexMovie")
    const priceMovie = localStorage.getItem("priceMovie")
    //console.log(numSelectedSeat) 
    seats.forEach((element,index)=>{
        //console.log(element,index)
        if (numSelectedSeat.indexOf(index)>-1){
            element.classList.add("selected")
        }
    })
    if (indexSeat != null){
        movieEl.selectedIndex = indexSeat   
    }
    if (priceMovie != null){
        price = priceMovie     
    }
    updateOrder()
}


// event เมื่อมีการคลิ๊กใน container ให้เช็คว่าที่นั่งว่างไหม 
containerEl.addEventListener("click",(event)=>{
    if (event.target.classList.contains("seat") && !event.target.classList.contains("choosed")){
        //console.log(event.target)
        // สามารถเลือกแล้วยกเลิกได้
        event.target.classList.toggle("selected")
        //อัพเดทสถานะที่นั่งและราคา
        updateOrder()
    }
})

// event เมื่อมีการเปลี่ยนชื่อหนัง 
movieEl.addEventListener("change",event=>{
    price = parseInt(movieEl.value)
    // ทำการเรียกฟังชันก์เพื่อเปลี่ยนข้อมูลใน localStorage
    keepInfoMovie(movieEl.selectedIndex,parseInt(movieEl.value))
    //อัพเดทสถานะที่นั่งและราคา
    updateOrder()   
})



// เริ่มต้นทำการเช็คว่าใน localStorage มีข้อมูลดังนี้ไหม
// ถ้าหากว่ามีให้ทำการเรียกฟังชันก์มาแสดงผลเลย
// ถ้าหากไม่มีให้ให้เรียกอีกฟังชันก์เพื่อเซ็ต localStorage เริ่มต้น  
if (localStorage.getItem("numSelectedSeat") != null && localStorage.getItem("indexMovie") != null && localStorage.getItem("priceMovie") != null){
    displayUI()
}else{
    keepInfoMovie(movieEl.selectedIndex,parseInt(movieEl.value))
}