const mySwitch = document.querySelector("#mySwitch")
const text_toggler = document.querySelector("#text-toggler")
const nav = document.querySelector("nav")
const img_color1 = document.getElementById("img-color1")
const img_color2 = document.getElementById("img-color2")
const img_color3 = document.getElementById("img-color3")

mySwitch.addEventListener("change",setMode)
function setMode(){
    // mySwitch.checked คือเช็คว่าถูกกดหรือไม่
    if(mySwitch.checked){
        darkMode()
        document.documentElement.setAttribute('data-theme','dark');
        change_picture("dark")
    }else{
        lightMode()
        document.documentElement.setAttribute('data-theme','light');
        change_picture("light")
    }
    
}

function darkMode(){
    //text_toggler.children[0,1,2] เป็นการเข้าถึง element ลูกๆ
    //label ใช้ xxx.textContent ในการเปลี่ยนข้อความ
    //classList.replace('old','new') ใช้เปลี่ยนสลับคลาส
    text_toggler.children[1].textContent = "Dark Mode"
    text_toggler.children[2].classList.replace('fa-sun','fa-moon');
    nav.style.background = "rgba(88, 88, 88, 0.3)"
                            
}

function lightMode(){
    text_toggler.children[1].textContent = "Light Mode"
    text_toggler.children[2].classList.replace('fa-moon','fa-sun');
    nav.style.backgroundColor = "transparent"
}

function change_picture(info){
    //tag img เปลี่ยนรูปด้วยการ xxx.img
    img_color1.src=`img/undraw_Freelancer_${info}.svg`;
    img_color2.src=`img/undraw_Projections_${info}.svg`;
    img_color3.src=`img/undraw_Raining_${info}.svg`;
}

