/* เข้าถึง tag ต่างๆ */
const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")


let database = []

function deleteData(id){
    //console.log(id)
    database = database.filter(e=>e.id!=id)
    repeat()
}

function repeat(){
    list.innerHTML = ""
    database.forEach(info => addDatalist(info))
    calculate();
    
}
function addDatalist(info){
    // ฟังชันก์ Math.abs() ทำให้เป็นค่าบวก ไม่สนเครื่องหมาย
    const item = document.createElement("li")
    const mark = info.amount > 0 ? "+" : "-"
    const class_status = info.amount > 0 ? "plus" : "minus"
    item.innerHTML = `${info.text} <span> ${mark} ${formatNumber(Math.abs(info.amount))} บาท </span>
    <button class="btn-create" onclick="deleteData(${info.id})">X</button>`
    item.setAttribute("class",class_status)
    //item.classList.add(class_status)
    list.appendChild(item)
}

//ฟังชันในการจัดการเลขที่แสดงให้อ่านง่ายขึ้นด้วยการใส่ comma
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  
function calculate(){
    // ทำการคัดเฉพาะเรายการเงิน จาก database ด้วยฟังชัน map
    const temp = database.map(e => e.amount)
    // ทำการวนลูปคำนวณรายการเงินรวม
    const result = temp.reduce((value,e)=>(value+=e),0).toFixed(2)
    //ทำการวนลูปคำนวณรายการเงินรายรับ
    const plus_order = temp.filter(e => e>0).reduce((value,e)=>(value+=e),0).toFixed(2)
    //ทำการวนลูปคำนวณรายการเงินรายจ่าย
    const minus_order = (temp.filter(e => e<0).reduce((value,e)=>(value+=e),0)*(-1)).toFixed(2)
    
    //อัพเดทค่ารายการต่างๆ
    balance.innerText = `฿${formatNumber(result)}`
    money_plus.innerText = `฿${formatNumber(plus_order)}`
    money_minus.innerText = `฿${formatNumber(minus_order)}`
}

//ฟังชัน สุ่มค่า id
function id_generate(){
    return Math.floor(Math.random() * 1000000)
}

function addOrder(event){
    // การทำไม่ให้หน้าเว็บ reset
    event.preventDefault();
    console.log(event)
    //เช็คว่าใส่ข้อมูลครบไหม เป็นจำนวนที่คำนวณได้ไหม
    if (text.value.trim() == '' || amount.value.trim() == ''){
        alert("โปรดใส่ข้อมูลให้ครบถ้วน");
    }else if (!parseInt(amount.value)){
        alert("ในช่องจำนวณเงิน โปรดใส่ข้อมูลที่เป็นจำนวนเต็ม");
    }else{
        const order_item = {
            id:id_generate(),
            text:text.value,
            amount:parseInt(amount.value)
        }
        database.push(order_item)
        addDatalist(order_item)
        calculate()
        text.value = ""
        amount.value = ""
    }
}
form.addEventListener("submit",addOrder)
