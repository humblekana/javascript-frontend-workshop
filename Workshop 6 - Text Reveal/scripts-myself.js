const contentsEL = document.querySelectorAll(".content")
//console.log(contentsEL)
// ทำการดักจับการเลื่อนของหน้าจอ
document.addEventListener("scroll",showText);

//โชว์ข้อความ
function showText(){
    contentsEL.forEach(section =>{
        //console.log(section.querySelector("img")) ใช้ได้เหมือนกัน
        //console.log(section.querySelector(".text")) ใช้ได้เหมือนกัน
        const imgEL = section.children[0];
        const textEL = section.children[1];

        // window.pageYOffset scroll ในแนวแกน Y  | window.pageXOffset scroll ในแนวแกน X
        //อาจจะใช้อันนี้ก็ได้
        //const scrollPos = window.scrollY;
        const scrollPos = window.pageYOffset;
        // 500 + 100 // 50
        // |offsetTop offsetLeft| ตำแหน่งของelement บนและซ้ายสุด,|offsetHeight offsetWidth| ความสูงและความกว้างของ element 
        const textPosition = imgEL.offsetTop + imgEL.offsetHeight /100
        if (scrollPos > textPosition){
            //แสดงเนื้อหา
            textEL.classList.add("show_reveal")
        }else{
            //ปิดการแสดงเนื้อหา
            textEL.classList.remove("show_reveal")
        }
    })
}
