const music_containerEl = document.getElementById("music-container")
const playBtnEl = document.getElementById("play")
const prevBtnEl = document.getElementById("prev")
const nextBtnEl = document.getElementById("next")
const audioEl = document.querySelector("audio")
const progress_containerEl = document.getElementById("progress-container")
const progressEl = document.getElementById("progress")
const titleEl = document.getElementById("title")
const imgEl = document.getElementById("img")

/* ข้อมูลชื่อเพลง */
const songs_Data = ["Contra","HavestMoon","Mario"]
let index_song = 0

/* เปลี่ยนแปลงชื่อเพลง รูปเพลง เสียงเพลง */
function loadSongs(song){
    titleEl.innerText = `เพลง ${song}.mp3`
    imgEl.src = `cover/${song}.jpg`
    audioEl.src = `music/${song}.mp3`
}

//เล่นเพลง
function playSong(){
    music_containerEl.classList.add("play")
    playBtnEl.children[0].classList.remove("fa-play")    
    playBtnEl.children[0].classList.add("fa-pause")
    //ไว้เล่นเพลง
    audioEl.play()
}

//หยุดเพลง
function pauseSong(){
    music_containerEl.classList.remove("play")
    playBtnEl.children[0].classList.remove("fa-pause")
    playBtnEl.children[0].classList.add("fa-play")
    //ไว้หยุดเพลง
    audioEl.pause()
}

// กดปุ่มเมื่อจะเล่น กดปุ่มเมื่อจะหยุด
playBtnEl.addEventListener("click",(event)=>{
    // เช็คว่ามีคลาส play อยู่ไหม
    const isPlay = music_containerEl.classList.contains("play")
    //console.log(isPlay)
    // ถ้ามี class play อยู่แสดงว่ากดเพื่อจะหยุด
    if (isPlay){
        pauseSong()
    }else{
        playSong()
    } 
})

//กดปุ่มเมื่อต้องการเปลี่ยนเพลงย้อนกลับ
prevBtnEl.addEventListener("click",()=>{
    index_song--
    if (index_song < 0){
        index_song = 2
    }
    //เปลี่ยนเพลง
    loadSongs(songs_Data[index_song])
    // สั่งให้เล่นทันที
    playSong()
})

//กดปุ่มเมื่อต้องการเปลี่ยนเพลงไปต่อ
nextBtnEl.addEventListener("click",()=>{
    index_song++
    if (index_song > 2){
        index_song = 0
    }
    //เปลี่ยนเพลง
    loadSongs(songs_Data[index_song])
    // สั่งให้เล่นทันที
    playSong()
})

//event timeupdate เป็นการดักจับ เวลาเมื่อเล่นเพลงไปเรื่อยๆ
audioEl.addEventListener("timeupdate",(event)=>{
    // currentTime เวลาปัจจุบันของเพลง
    // AllTime เวลาทั้งหมดของเพลง 
    const CurrentTime = event.target.currentTime
    const AllTime = event.target.duration
    //console.log(event.target)
    //console.log(CurrentTime)
    //console.log(AllTime)
    const progressPercent = (CurrentTime/AllTime)*100
    progressEl.style.width = `${progressPercent}%`
    //console.log(progressPercent)
})

// ถ้าหากมีการกดที่ progess bar
progress_containerEl.addEventListener("click",(event)=>{
    //event.target.clientWidth ความยาวของ progress
    //event.offsetX ความยาวที่ณ ตำแหน่งที่เรากด
    //หรือจะใช้ก็ได้ getComputedStyle(progress_containerEl).width 
    //console.log(getComputedStyle(progress_containerEl).width)
    //console.log(event.offsetX)
    //console.log(audioEl.duration)
    //ทำการคำนวณค่าเพื่อ ให้ความยาวของ progess bar ตามเวลาของเพลง
    audioEl.currentTime = (event.offsetX/event.target.clientWidth)*audioEl.duration
})

//เมื่อเพลงจบก็ให้เล่นเพลงต่อไปในลิส เสมือนกับการกดปุ่ม next
audioEl.addEventListener("ended",()=>{
    index_song++
    if (index_song > 2){
        index_song = 0
    }
    loadSongs(songs_Data[index_song])
    playSong()    
})

// เรียกฟังชันก์เริ่มต้นโปรแกรม
loadSongs(songs_Data[index_song])
