// ตัวแปรเก็บค่าว่าจะแสดงกี่รูป
const count = 10;
const apiKey = "CQbCQ8q232MegKTx520_bst_6hPFqpGitd0jQG8MCJ8"
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}` 

const img_containerEl = document.getElementById("img-container")
let pictureData // ตัวแปรเก็บค่าที่ได้จาก การดึงAPI เป็น array

async function getPhotos(){
    // อาจจะใช้ try ก็ได้
    /*try{
        const response = await fetch(apiUrl)
        pictureData = await response.json()
        //console.log(pictureData)
        displayImage();
    }catch(err){
        console.log(err)
    }*/
    // ทำการ ดึงข้อมูล API ปกติ
    const response = await fetch(apiUrl)
    pictureData = await response.json()
    //console.log(pictureData)
    displayImage();
}

//ฟังก์ชันแสดงผลของภาพ
function displayImage(){
    pictureData.forEach((photo)=>{
        //console.log(photo)
        const tagA = document.createElement("a")
        tagA.href = `${photo.links.html}`
        tagA.target = "_blank"

        const tagImg = document.createElement("img")
        tagImg.src = `${photo.urls.regular}`
        tagImg.title = `${photo.description}`
        tagImg.alt = `${photo.description}`

        tagA.appendChild(tagImg)
        img_containerEl.appendChild(tagA)
    })
}

//เช็คการ scroll
window.addEventListener("scroll",()=>{
    console.log(window.innerHeight)
    //console.log(window.scrollY)
    //console.log(document.body.offsetHeight-100)
    //console.log(window.innerWidth)
    // window.innerHeight ความสูงของ window คงที่
    // window.scrollY ขนาด scrollY เพิ่มขึ้นเรื่อยๆดักจับระยะ
    // document.body.offsetHeight ความสูงของbody ขณะนั้น
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-100){
        //ดึงภาพมาแสดงผลในเว็บบราวเซอร์
        getPhotos()
    }
})

//ดึงภาพมาแสดงครั้งแรก
getPhotos()