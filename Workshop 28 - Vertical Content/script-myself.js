// เข้าถึง element แต่ละตัว
const slider_container = document.querySelector(".slider-container")
const sliderLeft = document.querySelector(".left-content")
const sliderRight = document.querySelector(".right-content")
const upButton = document.querySelector(".up-button")
const downButton = document.querySelector(".down-button")

// เก็บจำนวนโหนดลูก เสมือนดูว่ามีกี่ content ให้แสดง
const pictureAmount = sliderLeft.childElementCount
//console.log(pictureAmount)

// index รูปภาพ
let indexPicture = 0

// event เมื่อกดปุ่มขึ้น
upButton.onclick = (event)=>{
    // ลด index
    indexPicture--
    changePicture()
}

// event เมื่อกดปุ่มลง
downButton.onclick = (event)=>{
    //เพิ่ม index
    indexPicture++
    changePicture()
}

// ฟังชันก์ในการเปลี่ยนแปลงรุปภาพ
function changePicture(){
    // เช็คว่า index เกินขอบไหม
    if (indexPicture >= pictureAmount){
        indexPicture = 0
    }else if (indexPicture < 0){
        indexPicture = pictureAmount-1
    }
    // ทำการเปลี่ยนแปลงด้วย style เพื่อแสดงผล
    sliderLeft.style.transform = `translateY(-${indexPicture*100}%)`
    sliderRight.style.transform = `translateY(-${indexPicture*100}%)`
    //console.log(`translateY(-${indexPicture*100}%)`)
}