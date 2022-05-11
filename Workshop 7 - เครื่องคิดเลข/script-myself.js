const DisplayEl = document.querySelector("h1")
// เก็บทุกปุ่มเลย ใช้ querySelectorAll() ได้เป็น array มา
const inputBtn = document.querySelectorAll("button")
const clearBtn = document.getElementById("btn-clear")

//เก็บค่าตัวแปร
// ตัวแปรเช็คตัวเลขที่กดตัวแรก
let firstNum = false
// ตัวแปรเช็คว่า error ไหม
let checkError = false
//เก็บค่าข้อมูลก่อนจะแสดงผลลัพธ์
let temp_result=""

// ฟังชันก์แสดงผลเมื่อกดปุ่มตัวเลข
function setoperand(num){
    // กดตัวเลขตัวแรกแล้ว
    firstNum = true
    // ถ้า checkError = true ให้ return เลยไม่ให้ทำต่อ
    if (checkError){
        return
    }
    // ทำการเซฟค่า และแสดงผล
    temp_result+=num
    DisplayEl.innerText = temp_result    
}

// ฟังชันก์แสดงผล .
function setdecimal(dot){
    // ถ้า checkError = true ให้ return เลยไม่ให้ทำต่อ
    if (checkError){
        return
    }
    // ทำการเซฟค่า และแสดงผล
    temp_result+=dot
    DisplayEl.innerText = temp_result
}
//ฟังชันก์แสดงผลเมื่อกดเครื่องหมาย
function setoperator(op){
    // กดเครื่องหมายตัวแรกแล้ว
    firstOp = true
    // ถ้า checkError = true ให้ return เลยไม่ให้ทำต่อ
    if (checkError){
        return
    }
    // ทำการเซฟค่า และแสดงผล
    temp_result+=op   
    DisplayEl.innerText = temp_result
}

// ฟังชันก์หาผลลัพธ์ทั้งหมด สำคัญมาก รายละเอียดเยอะ
function seteqal(){
    // ถ้า checkError = true ให้ return เลยไม่ให้ทำต่อ
    if (checkError){
        return
    }
    // ทำการแทนที่ด้วย temp_result ถ้าหากเจอเครื่องหมายดัง expression regular
    temp_result = temp_result.replace(/x/ig,"*")
    temp_result = temp_result.replace(/\÷/ig,'\/')
    //console.log(temp_result[temp_result.search(/[\.\+\-\*\/]/ig)+1])
    // ถ้าค้นหาใน temp_result แล้วมีเจอเครื่องหมายดัง expression regular แล้วตัวถัดไป undefined
    // เช่น + - * / . ทั้งหมดที่ตัวด้านหลัง คึือ undefined แสดง error
    if (temp_result[temp_result.search(/[\.\+\-\*\/]/ig)+1] == undefined){
        DisplayEl.innerText = "error"
        checkError = true
        return   
    }
    //console.log(temp_result[temp_result.search(/[\.\+\-\*\/]/ig)-1])
    //console.log(temp_result[temp_result.search(/[\.\+\-\*\/]/ig)])
    // ถ้าค้นหาใน temp_result แล้วมีเจอเครื่องหมายดัง expression regular แล้วตัวก่อนหน้า undefined
    // แล้วตัวที่เจอต้องเป็น * หรือ / เท่านั้น เช่น *9 /8 แสดง error
    if (temp_result[temp_result.search(/[\.\+\-\*\/]/ig)-1]==undefined && (temp_result[temp_result.search(/[\.\+\-\*\/]/ig)] == "*" || temp_result[temp_result.search(/[\.\+\-\*\/]/ig)] == "/")){
        DisplayEl.innerText = "error"
        checkError = true
        return    
    }
    check_op = /\.([\.\+\-\*\/]){1,}|\+([\.\+\-\*\/]){1,}|\-([\.\+\-\*\/]){1,}|\*([\.\+\-\*\/]){1,}|\/([\.\+\-\*\/]){1,}/ig
    // ถ้าหากว่าเจอตำแหน่ง ตาม expression regular แสดงว่า ไม่เท่ากับ -1 ให้แสดง error
    if(temp_result.search(check_op) != -1 || firstNum == false ){
        DisplayEl.innerText = "error"
        checkError = true
    }else{
        // ทำการคำนวณและแสดงผลปกติ
        let result = eval(temp_result)
        temp_result = `${result}`
        DisplayEl.innerText = temp_result    
    }
}

//เข้าถึงปุ่มทั้ง 17 ปุ่ม แล้วดูว่าเป็น operand || operator
inputBtn.forEach(input=>{
    // ทำการดูว่า ปุ่มไหนมีคลาสเท่าไหรบ้าง ก็ใส่ event chick ลงไป
    // class 0 คือ operand
    if (input.classList.length == 0){
        input.addEventListener("click",(event)=>setoperand(input.value));
    //class 2 คือ =
    }else if (input.classList.length == 2){
        input.addEventListener("click",(event)=>seteqal(input.value));
    }else if (input.classList.contains("operator")){
        input.addEventListener("click",(event)=>setoperator(input.value));
    }else if (input.classList.contains("decimal")){
        input.addEventListener("click",(event)=>setdecimal(input.value));
    }
})

// ถ้าปุ่มเคลียถูกกดให้เคลียทุกอย่าง
clearBtn.addEventListener("click",()=>{
    firstNum = false
    checkError = false
    DisplayEl.innerText = "0"    
    temp_result=""
});