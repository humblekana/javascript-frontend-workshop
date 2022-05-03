const formEl = document.getElementById("Form")
const input_containerEl = document.getElementById("input-container")
const titleEl = document.getElementById("title")
const dateEl = document.getElementById("date")

const countdownEl = document.getElementById("countdown")
const countdown_titleEl = document.getElementById("count-title")
const countdown_cancelEl = document.getElementById("countdown-cancel")
const timeEl = document.querySelectorAll("span")

const completeEl = countdown_cancel = document.getElementById("complete")
const complete_infoEl = countdown_cancel = document.getElementById("complete-info")
const create_newtargetEl = countdown_cancel = document.getElementById("create-newtarget")

let Title_info = "" // ตัวแปรเก็บชื่อรายการ
let Date_info = "" // ตัวแปรเก็บวันที่

let time_target      //ตัวแปรเก็บวันที่เป้าหมาย
let countTime        //ใช้เป็นตัวแปรนับเวลาถอยหลัง ฟังชัน setInterval
let saveCountDown    //saveCountDown ตัวแปร อ็อบเจ็คเก็บค่าต่างๆ

const get_second = 1000
const get_minute = 1000*60
const get_hour = 1000*60*60
const get_day = 1000*60*60*24 

formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    //console.log(titleEl.value)
    //console.log(dateEl.value)
    
    //ทำการเก็บค่าจากแบบฟอร์มมาใส่
    Title_info = titleEl.value
    Date_info = dateEl.value

    //เช็คว่าใส่ข้อมูลครบไหม
    if (Title_info.trim() == "" || Date_info.trim() == ""){
        alert("ต้องป้อนข้อมูลให้ครบถ้วน")
    }else{
        // หากยังไม่มีข้อมูลใน localStorage สร้างตัวแปรเก็บข้อมูลอ็อบเจ็คแล้วยัดใส่ localStorage
        saveCountDown = {
            title:Title_info,
            date:Date_info
        }
        localStorage.setItem("countdown",JSON.stringify(saveCountDown))
        //ได้ข้อมูลแบบ timestamp
        time_target = new Date(Date_info).getTime()
        //console.log("เวลาที่ตั้งไว้",time_target)
        setupTime()
    }
})

function setupTime(){
    //let now_current = new Date(2022,4,4,6,59,58).getTime()
    countTime = setInterval(()=>{
        // distance เวลาที่ตั้งไว้ - เวลาปัจจุบัน = เวลาเป็น ms
        let now_current = new Date().getTime()
        const distance = time_target - now_current
        
        //คำนวณเป็นค่า วัน ชั่วโมง นาที วินาที
        const day_count = Math.floor(distance/get_day)
        let temp = distance%get_day
        const hour_count = Math.floor((temp)/get_hour)
        temp = temp%get_hour
        const minute_count = Math.floor(temp/get_minute)
        temp = temp%get_minute
        const second_count = Math.floor(temp/get_second)
        
        /* console.log("วัน",day_count)
        console.log("ชั่วโมง",hour_count)
        console.log("นาที",minute_count)
        console.log("วินาที",second_count) */
        
        if (distance < 0){
            //เมื่อครบกำหนดให้แสดงว่าถึงเวลาแล้ว
            completeEl.hidden = false
            input_containerEl.hidden = true
            countdownEl.hidden = true
            complete_infoEl.innerText = `ถึงเวลา ${Title_info} ในวันที่ ${Date_info}`
            clearInterval(countTime)
        }else{
            //เมื่อยังไม่ถึงเวลา ให้นับและอัพเดทเวลาไปเรื่อยๆ
            countdownEl.hidden = false
            completeEl.hidden = true
            input_containerEl.hidden = true
            countdown_titleEl.innerText = `${Title_info}`
            timeEl[0].innerText = `${day_count}`
            timeEl[1].innerText = `${hour_count}`
            timeEl[2].innerText = `${minute_count}`
            timeEl[3].innerText = `${second_count}` 
        }
    },1000)
}

//ฟังก์ชันเพื่อเช็คว่าใน localStorage มีข้อมูลไหม รีเฟรชก็จะนับเวลาเดิม
function getMemoryData(){
    //console.log(localStorage.getItem("countdown"))
    if(localStorage.getItem("countdown")){
        input_containerEl.hidden = true
        completeEl.hidden = true
        // มีข้อมูลใน localStorage ก็ดึงมาเก็บใน saveCountDown
        saveCountDown = JSON.parse(localStorage.getItem("countdown"))
        Title_info = saveCountDown.title
        Date_info = saveCountDown.date
        time_target = new Date(Date_info).getTime()
        //console.log(Title_info)
        //console.log(Date_info)
        //console.log(saveCountDown)
        setupTime()
    }
}

//เมื่อกดปุ่มยกเลิกให้ลบข้อมูลใน localStorage และเคลียค่าทุกอย่าง เวลา ข้อมูลวัน ข้อมูลรายการ
countdown_cancelEl.addEventListener("click",()=>{
    input_containerEl.hidden = false
    completeEl.hidden = true
    countdownEl.hidden = true
    localStorage.removeItem("countdown")
    clearInterval(countTime)
    Title_info = ""
    Date_info = ""
    titleEl.value = ""
    dateEl.value = ""
    
})

//เมื่อกดปุ่มสร้างรายการใหม่ให้ลบข้อมูลใน localStorage และเคลียค่าทุกอย่าง เวลา ข้อมูลวัน ข้อมูลรายการ
create_newtargetEl.addEventListener("click",()=>{
    input_containerEl.hidden = false
    completeEl.hidden = true
    countdownEl.hidden = true
    localStorage.removeItem("countdown")
    clearInterval(countTime)
    Title_info = ""
    Date_info = ""
    titleEl.value = ""
    dateEl.value = ""
    
})

getMemoryData()