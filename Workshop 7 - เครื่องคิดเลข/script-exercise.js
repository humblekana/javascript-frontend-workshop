const DisplayEl = document.querySelector("h1")
// เก็บทุกปุ่มเลย ใช้ querySelectorAll() ได้เป็น array มา
const inputBtn = document.querySelectorAll("button")
const clearBtn = document.getElementById("btn-clear")

//เก็บค่าตัวแปร
let firstvalue = 0; //ตัวเลขที่ 1
let operatorUse = ''; //เก็บตัวดำเนินการ
let waitFornext = false; //เก็บสถานะของตัวเลข

const calculate={
    "/":(firstNumber,secondNumber)=> secondNumber!=0 ? firstNumber/secondNumber : "error",
    "*":(firstNumber,secondNumber) => firstNumber * secondNumber,
    "+":(firstNumber,secondNumber) => firstNumber + secondNumber,
    "-":(firstNumber,secondNumber) => firstNumber - secondNumber,
    "=":(firstNumber,secondNumber) => secondNumber
}

function setoperand(num){
    if (waitFornext){
        DisplayEl.innerText = num
        waitFornext = false;
    }else{
        //const temp_text = DisplayEl.innerText ก็ได้
        const temp_text = DisplayEl.innerText
        //ทำการเก็บค่า จากหน้าจอแสดงว่าเป็น 0 ไหม ถ้าเป็นก็แทนเลขที่กดเลย ถ้าไม่ก็เซฟค่าไว้แล้วนำเลขที่กดมาต่อ
        DisplayEl.innerText = DisplayEl.innerText== "0" ? num : temp_text+num
    }
    
}

function setoperator(mark){
    const currentvalue = Number(DisplayEl.innerText);
    if (operatorUse && waitFornext){
        operatorUse = mark;
        return;
    }
    
    if (!firstvalue){
        firstvalue = currentvalue;
    }else{
       const result = calculate[operatorUse](firstvalue,currentvalue);
       DisplayEl.innerText=result;
       firstvalue=result;
       if(firstvalue === "error"){
            DisplayEl.innerText = "0"    
            firstvalue = 0; 
            operatorUse = ''; 
            waitFornext = false;
       }
    }
    operatorUse = mark;
    waitFornext = true;
    
}

function setdecimal(dot){
    if (waitFornext){
        return;
    }
    // include จะมองหาstring ที่แมทกับที่ใส่ไปในวงเล็บถ้า แมทจะรีเทินค่า true
    if (!DisplayEl.innerText.includes(".")){
        DisplayEl.innerText = `${DisplayEl.innerText}.`
    }
    
    
}

//เข้าถึงปุ่มทั้ง 17 ปุ่ม แล้วดูว่าเป็น operand || operator
inputBtn.forEach(input=>{
    if (input.classList.length == 0){
        input.addEventListener("click",()=>setoperand(input.value));
    }else if (input.classList.contains("operator")){
        input.addEventListener("click",()=>setoperator(input.value));
    }else if (input.classList.contains("decimal")){
        input.addEventListener("click",()=>setdecimal(input.value));
    }
})

// ถ้าปุ่มเคลียถูกกดให้เคลียทุกอย่าง
clearBtn.addEventListener("click",()=>{
    DisplayEl.innerText = "0"    
    firstvalue = 0; 
    operatorUse = ''; 
    waitFornext = false;
});


