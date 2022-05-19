// ตัวแปรดึงค่า element
const videoEl = document.getElementById("video")
const requestEl = document.getElementById("request")
const shareEl = document.getElementById("share")

// ตัวแปรไว้เช็คว่ามีการส่งคำขอครั้งแรกก่อน แล้วจึงสามารถกดแชร์หน้าจอได้
let check = false

//เมื่อคลิ๊กปุ่ม request
requestEl.addEventListener("click",(event)=>{
    //console.log(event.target)
    chooseMediaStream();
})

//เมื่อคลิ๊กปุ่ม share
shareEl.addEventListener("click",async (event)=>{
    //console.log(event.target)
    if (!check){
        return
    }
    await videoEl.requestPictureInPicture()
    //หน้าจอแบบเล็กๆ
    console.log(await videoEl.requestPictureInPicture())
    //หน้าจอเต็ม screen
    //await videoEl.requestFullscreen()
    
})


// ฟังชันก์ในการดึงค่าหน้าจอ
async function chooseMediaStream(){
    // เมื่อกดแล้ว ให้ตัวแปรเช็คเป็น true
    check = true
    try{
        //ตัวแปรเก็บตัวอุปกรณ์ในการแชร์หน้าจอ
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        //console.log(mediaStream)
        videoEl.srcObject = mediaStream
        // ใส่ event เมื่อมีการใส่ข้อมูลต่างๆเกี่ยวกับวิดีโอ สั่งให้วิดีโอเล่น
        videoEl.addEventListener("loadedmetadata",()=>{
            videoEl.play()
        })
    }
    catch (error){
        console.log(error)
    }
}