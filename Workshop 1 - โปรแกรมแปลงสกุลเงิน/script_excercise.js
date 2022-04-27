
const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const bt_swap = document.getElementById("bt-swap");
const rate_text = document.getElementById("rate");

currency_one.addEventListener("change",Update_info);
currency_two.addEventListener("change",Update_info);
amount_one.addEventListener("input",Update_info);
amount_two.addEventListener("input",Update_info);
bt_swap.addEventListener("click",swap_money);

function Update_info(){
    const money1 = currency_one.value;
    const money2 = currency_two.value;
    //console.log(money1)
    //console.log(money2)
    fetch(`https://api.exchangerate-api.com/v4/latest/${money1}`)
    .then(response=> response.json()).then(data=>{
        //console.log(data.rates[`${money2}`])
        const rate_result = `${data.rates[`${money2}`]}`
        rate_text.innerText = `1 ${money1} = ${rate_result} ${money2} `
        //console.log(amount_one.value)
        //console.log(amount_two.value)
        amount_two.value = (amount_one.value*rate_result).toFixed(3)
        //toFixed(3) คือการกำหนดจำกัดทศนิยม กี่ตำแหน่งตามเลขที่ใส่
    });
}

function swap_money(){
    const swap1 = currency_one.value;
    const swap2 = currency_two.value;
    currency_two.value = swap1;
    currency_one.value = swap2;
    Update_info()
}

Update_info()