// ตัวแปรเก็บค่าข้อมูล api ต่างๆ
const apikey = "6547ecb335a722e39bf8c0036269d0f4"
let year = 2022
//ตัวแปรเก็บ url เพื่อดึงข้อมูล
let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&page=1&year=${year}`
//ตัวแปรเก็บ url poster
const urlPoster = `https://image.tmdb.org/t/p/w500`


//ตัวแปรอ้างอิงตาม html
const contentEl = document.getElementById("content")
const yearsEl = document.getElementById("years")

// event เมื่อมีการเลือก select
yearsEl.addEventListener("change",(event)=>{
    //console.log(event.target.value)
    year = parseInt(event.target.value)
    const urlUpdate = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&page=1&year=${year}`
    displayMovie(urlUpdate)
})


// ฟังชันก์ในการดึงข้อมูลจาก api
async function displayMovie(url){
    const response = await fetch(url)
    const datas = await response.json()
    //console.log(datas.results)
    // ทำการเช็คว่าเมื่อถ้ามีโหนดลูก ให้ลบให้หมด เหมือนการ reset
    console.log(contentEl.firstElementChild)
    while(contentEl.childElementCount > 0){
       contentEl.removeChild(contentEl.firstChild)
    }
    //ทำการวนแต่ละรอบตามข้อมูลที่ดึงมาได้เพื่อนำข้อมูลหนังมาแสดง
    datas.results.forEach(e=>{
        //console.log(e)
        const divEl = document.createElement("div")
        divEl.classList.add("movie")
        const titelEl = document.createElement("h2")
        const imgEl = document.createElement("img")
        imgEl.src = `${urlPoster}${e.poster_path}`
        titelEl.innerText = `${e.title.substring(0,24)}`
        divEl.appendChild(titelEl)
        divEl.appendChild(imgEl)
        contentEl.appendChild(divEl)
    })
    
}
// เริ่มต้นทำการเริ่มเรียกฟังชันก์เพื่อดึงข้อมูล
displayMovie(url)