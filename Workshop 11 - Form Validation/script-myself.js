const formEl = document.getElementById("form")
const usernameEl = document.getElementById("username") 
const emailEl = document.getElementById("email") 
const password1El = document.getElementById("password") 
const password2El = document.getElementById("password-confirm") 


// event เมื่อกดปุ่ม submit
formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    /* console.log(event.target)
    console.log(event.target[0])
    console.log(event.target[1])
    console.log(event.target[2])
    console.log(event.target[3])
    console.log(event.target[4]) */
    
    // ตัวแปรไว้ใช้แสดงข้อมูล
    const formControl1 = usernameEl.parentElement
    const smallEl1 = formControl1.children[2]
    const formControl2 = emailEl.parentElement
    const smallEl2 = formControl2.children[2]
    const formControl3 = password1El.parentElement
    const smallEl3 = formControl3.children[2]
    const formControl4 = password2El.parentElement
    const smallEl4 = formControl4.children[2]
    
    //เช็คส่วนของชื่อผู้ใช้งาน
    if (usernameEl.value.trim() == ""){
        showError(formControl1,smallEl1,"โปรดป้อนข้อมูลให้ครบถ้วน")    
    }else if (usernameEl.value.length < 5){
        showError(formControl1,smallEl1,"ข้อมูลต้องไม่ต่ำกว่า 5 ตัวอักษร") 
    }else if (usernameEl.value.length >= 10){
        showError(formControl1,smallEl1,"ข้อมูลต้องไม่เกิน 10 ตัวอักษร")
    }else{
        showSuccess(formControl1,smallEl1,"ข้อมูลถูกต้องครบถ้วน")    
    }
    
    // เช็คส่วนของอีเมลล์
    if (emailEl.value.trim() ==""){
        showError(formControl2,smallEl2,"โปรดป้อนข้อมูลให้ครบถ้วน")    
    }else if (validateEmail(emailEl.value.trim())){
        showSuccess(formControl2,smallEl2,"ข้อมูลถูกต้องครบถ้วน")
    }else{
        showError(formControl2,smallEl2,"รูปแบบข้อมูลไม่ถูกต้อง")
    }
    
    //เช็คส่วนของ password1
    if (password1El.value.trim() == ""){
        showError(formControl3,smallEl3,"โปรดป้อนข้อมูลให้ครบถ้วน")    
    }else{
        showSuccess(formControl3,smallEl3,"ข้อมูลถูกต้องครบถ้วน")        
    }
    
    //เช็คส่วนของ password2
    if (password1El.value.trim() == ""){
        showError(formControl4,smallEl4,"โปรดป้อนข้อมูลให้ครบถ้วน")    
    }else{
        showSuccess(formControl4,smallEl4,"ข้อมูลถูกต้องครบถ้วน")        
    }

    //เช็คว่ารหัสตรงกันไหม ถ้าไม่ตรงแสดงข้อความ ถ้าตรงก็ไม่ต้องทำอะไร
    if (password1El.value != password2El.value){
        showError(formControl3,smallEl3,"โปรดป้อนให้ข้อมูลให้ตรงกัน")
        showError(formControl4,smallEl4,"โปรดป้อนให้ข้อมูลให้ตรงกัน")        
    }

})

//ฟังชันก์แสดงผลเมื่อเกิด error
function showError(formControl,smallEl,text){
    formControl.classList.remove("success")
    formControl.classList.add("error")
    smallEl.innerText = `${text}`
    smallEl.style.color = "red"
    smallEl.style.visibility = "visible"
    //console.log(getComputedStyle(smallEl).visibility)
}

//ฟังชันก์แสดงผลเมื่อเกิด success
function showSuccess(formControl,smallEl,text){
    formControl.classList.remove("error")
    formControl.classList.add("success")
    smallEl.innerText = `${text}`
    smallEl.style.color = "green"
    smallEl.style.visibility = "visible"
    //console.log(getComputedStyle(smallEl).visibility) 
}

//ฟังชันก์ไว้เช็ครูปแบบของอีเมลล์
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
