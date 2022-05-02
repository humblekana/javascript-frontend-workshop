const DisplayEl = document.querySelector("h1")
// เก็บทุกปุ่มเลย ใช้ querySelectorAll() ได้เป็น array มา
const inputBtn = document.querySelectorAll("button")
const clearBtn = document.getElementById("btn-clear")

//เก็บค่าตัวแปร
let firstNum = false
let checkError = false
let temp_result=""

function setoperand(num){
    firstNum = true
    if (checkError){
        return
    }
    temp_result+=num
    DisplayEl.innerText = temp_result    
}
function setoperator(op){
    firstOp = true
    if (checkError){
        return
    }
    temp_result+=op   
    DisplayEl.innerText = temp_result
}

function seteqal(){
    if (checkError){
        return
    }
    temp_result = temp_result.replace(/x/ig,"*")
    temp_result = temp_result.replace(/\÷/ig,'\/')
    console.log(temp_result[temp_result.search(/[\.\+\-\*\/]/ig)+1])
    if (temp_result[temp_result.search(/[\.\+\-\*\/]/ig)+1] == undefined){
        DisplayEl.innerText = "error"
        checkError = true
        return   
    }
    if (temp_result[temp_result.search(/[\.\+\-\*\/]/ig)-1]==undefined && (temp_result[temp_result.search(/[\.\+\-\*\/]/ig)] == "*" || temp_result[temp_result.search(/[\.\+\-\*\/]/ig)] == "/")){
        DisplayEl.innerText = "error"
        checkError = true
        return    
    }
    check_op = /\.([\.\+\-\*\/]){1,}|\+([\.\+\-\*\/]){1,}|\-([\.\+\-\*\/]){1,}|\*([\.\+\-\*\/]){1,}|\/([\.\+\-\*\/]){1,}/ig
    console.log(temp_result.search(check_op) != -1,firstNum==false)
    if(temp_result.search(check_op) != -1 || firstNum == false){
        //console.log("11111")
        DisplayEl.innerText = "error"
        checkError = true
    }else{
        //console.log("2222")
        let result = eval(temp_result)
        temp_result = `${result}`
        DisplayEl.innerText = temp_result    
    }
}
function setdecimal(dot){
    if (checkError){
        return
    }
    temp_result+=dot
    DisplayEl.innerText = temp_result
}
//เข้าถึงปุ่มทั้ง 17 ปุ่ม แล้วดูว่าเป็น operand || operator
inputBtn.forEach(input=>{
    //console.log(input.classList.length)
    if (input.classList.length == 0){
        input.addEventListener("click",(event)=>setoperand(input.value));
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