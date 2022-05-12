const dayEL = document.getElementById("days")
const hourEL = document.getElementById("hours")
const minuteEL = document.getElementById("minutes")
const secondEL = document.getElementById("seconds")
const countdownEL = document.getElementById("countdown")

//ตัวแปรในการคำนวณ
const get_second = 1000
const get_minute = 1000*60
const get_hour = 1000*60*60
const get_day = 1000*60*60*24 

//วันเกิด วันเป้าหมาย
const HBD = new Date("2022-10-5 00:00:00").getTime()
//console.log(HBD)

// นับเวลาไปเรื่อยๆ
const countTime = setInterval(()=>{
    //เวลาปัจจุบัน
    const currentTime = new Date().getTime()
    //ผลต่างเวลา = วันเกิด - เวลาปัจจุบัน
    let distance =  HBD - currentTime
    //console.log(distance)
    // คำนวณเวลาตามปกติ
    const day_count = Math.floor(distance/get_day)
    let temp = distance%get_day
    const hour_count = Math.floor(temp/get_hour)
    temp = temp%get_hour
    const minute_count = Math.floor(temp/get_minute)
    temp = temp%get_minute
    const second_count = Math.floor(temp/get_second)
    
    //แสดงผล
    dayEL.innerText = `${day_count}`
    hourEL.innerText = `${hour_count}`
    minuteEL.innerText = `${minute_count}`
    secondEL.innerText = `${second_count}`
},1000)