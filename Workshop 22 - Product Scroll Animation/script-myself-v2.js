const categoryEl = document.querySelectorAll(".category")
//console.log(categoryEl)

categoryEl.forEach(item=>{
    item.addEventListener("click",(event)=>{
        event.target.classList.toggle("active")
    })
})
