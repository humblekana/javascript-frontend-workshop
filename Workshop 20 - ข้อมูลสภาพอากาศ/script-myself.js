// ตัวแปรในการเก็บค่าเมืองที่จะค้นหา
let city = "Bangkok"
// ตัวแปรเก็บค่า api
const apiKey = "60851cf159d4846064f2fc976362a177"


// ฟังชันก์ในการแปลงอุณหภูมิ จากเคลวิน เป็น เซลเซียส
function changeTemp(temp){
    //console.log(temp)
    return (temp-273).toFixed(1)
}

// ฟังชันก์ในการดึงข้อมูลจาก api
async function pullData(){
    // ใช้ try catch เพื่อดักจับข้อผิดพลาด
    try{
        //ทำการดึงข้อมูลจาก api ปกติ
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        //เรียกฟังชันก์เพื่อแสดงผล
        displayData(data)
    }
    catch(error){
        console.log(error)
    }
}

// ฟังชันก์แสดงผลข้อมูลต่างๆ
function displayData(data){
    // อ้างอิง element ต่างๆ
    const cityEl = document.getElementById("city")
    const stateEl = document.getElementById("state")
    const weatherEl = document.getElementById("weather")
    const statusEl = document.getElementById("status")
    const humidityEl = document.getElementById("humidity")
    const windEl = document.getElementById("wind")

    //นำข้อมูลมาแสดงผล
    cityEl.innerText = `${data.name}`
    stateEl.innerText = `${data.sys.country}`
    // มีการใช้ฟังชันก์เพื่อแปลงอุณหภูมิ
    weatherEl.children[0].innerText = `${changeTemp(data.main.temp)} °c`
    weatherEl.children[1].innerText = `max : ${changeTemp(data.main.temp_max)} °c , min : ${changeTemp(data.main.temp_max)} °c`
    statusEl.innerText = `${data.weather[0].main}`
    humidityEl.innerText = `${data.main.humidity}`
    windEl.innerText = `Wind Speed : ${data.wind.speed}`

}

//ดึง element ของฟอร์ม
const formEl = document.getElementById("form")
// ใส่ event ว่าถ้ามีการกด submit ให้ดึงข้อมูลจาก api ใหม่โดยเอาข้อมูลเมืองจาก input text 
formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    // เช็คว่ามีค่าว่างไหม ถ้ามีให้ทำแสดง alert
    if (formEl.elements[0].value == ""){
        alert("โปรดใส่ข้อมูลให้ครบถ้วน")
    // ถ้าไม่มีทำการดึงข้อมูลจาก api ใหม่อีกครั้ง
    }else{
        // นำข้อมูลจาก input text มาเปลี่ยนค่า city
        city = formEl.elements[0].value  
        //ทำการดึงข้อมูลจาก api ใหม่อีกครั้ง
        pullData()
    }
})

//เรียกฟังชันก์เริ่มต้นในการดึงข้อมูลจาก api
pullData()
