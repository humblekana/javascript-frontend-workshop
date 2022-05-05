const videoEl = document.getElementById("video")
const requestEl = document.getElementById("request")
const shareEl = document.getElementById("share")

//เมื่อคลิ๊กปุ่ม request
requestEl.addEventListener("click",(event)=>{
    //console.log(event.target)
    chooseMediaStream();
})

//เมื่อคลิ๊กปุ่ม share
shareEl.addEventListener("click",async (event)=>{
    //console.log(event.target)
    shareEl.disabled = true
    await videoEl.requestPictureInPicture()
    //หน้าจอแบบเล็กๆ
    console.log(await videoEl.requestPictureInPicture())
    //หน้าจอเต็ม screen
    //await videoEl.requestFullscreen()
    shareEl.disabled = false
})


async function chooseMediaStream(){
    try{
        //ตัวแปรเก็บตัวอุปกรณ์ในการแชร์หน้าจอ
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        //console.log(mediaStream)
        videoEl.srcObject = mediaStream
        videoEl.addEventListener("loadedmetadata",()=>{
            videoEl.play()
        })
    }
    catch (error){
        console.log(error)
    }
}