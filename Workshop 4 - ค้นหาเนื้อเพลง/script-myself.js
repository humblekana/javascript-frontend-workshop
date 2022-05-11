const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const paylist = document.getElementById("paylist");

// ตัวแปรเก็บ api
const apiURL = "https://api.lyrics.ovh";
//event เช็คว่ามีการปุ่มไหม
form.addEventListener("submit",event=>{
    event.preventDefault();
    //ทำการป้อนชื่อเพลง
    const songName = search.value.trim();
    
    //เช็คว่าป้อนข้อมูลครบไหม
    if (!songName){
        alert("โปรดป้อนข้อมูลให้ครบถ้วน")     
    }else{
        //ค้นชื่อเพลงแล้วลิสเป็นรายการ
        searchLyrics(songName);
    }
});

//ฟังชันก์ในการค้นชื่อเพลงจาก api ที่ทำการดึงมา
async function searchLyrics(song){
    //หาข้อมูลจาก API
    const response = await fetch(`${apiURL}/suggest/${song}`);
    const data = await response.json();
    //เรียกฟังชันก์เพื่อนำข้อมูลไปแสดงผล
    displayData(data)
}

//ฟังชันก์นำข้อมูลไปแสดงผล โดยแสดงชื่อเพลง
function displayData(data_list){
    //temp ทำการเลือกข้อมูลมาแสดง โดยได้กลับมาเป็นอเรย์ จากนั้นต้องแปลงเป็น string
    //console.log(data_list.data)
    const temp = data_list.data.map(e=>{
        return  `<li>
                    <span><strong>${e.artist.name}</strong> -${e.title}</span>
                    <button class="btn" data-artist="${e.artist.name}" data-song="${e.title}">เนื้อเพลง</button> 
                </li>`
    });
    //console.log(temp)
    // ตอนนำมาแสดงใน result ต้องแปลงเป็น string ด้วย temp.join(" ")
    result.innerHTML = `<ul class = "songs"> 
        ${temp.join(" ")}
    </ul>`
    // data_list.next || data_list.prev เป็นรายการเพลงก่อนหน้า และ รายการต่อไป เช็คว่าถ้ามี ก็ให้มีปุ่มแสดงขึ้นมา
    // โดย data_list.next || data_list.prev เป็น url 
    if (data_list.next || data_list.prev){
        paylist.innerHTML=`
        ${data_list.prev ? `<button class="btn" onclick= "getSongs('${data_list.prev}')">ก่อนหน้า</button>` : ""}
        ${data_list.next ? `<button class="btn" onclick= "getSongs('${data_list.next}')">ถัดไป</button>` : ""}
        `;
    }else{
        paylist.innerHTML="";
    }
    
}

// ฟังชันก์ในการนำ url มาดึงข้อมูลจาก api เพื่อทำการหาเพลงต่อไป เมื่อทำการกดปุ่ม
async function getSongs(songUrl){
    //ฟังชันเช็คตอน เปลี่ยนหน้า เนื่องจากได้ url มาใหม่ได้หน้าถัดไป หรือก่อนหน้า 
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${songUrl}`);
    const data = await response.json();
    // เรียกฟังชันเพื่อนแสดงผลอีกรอบ
    displayData(data);
}

result.addEventListener("click",event=>{
    // ใน result มีปุ่มหลายปุ่ม event.target เพื่อหาว่าปุ่มไหนกด
    const click_target = event.target;
    
    //เช็คว่าเป็น tag button ไหม สำคัญ!!! ตัวใหญ่ จะไม่ใส่ก็ได้
    //console.log(click_target.nodeName)
    if (click_target.nodeName=="BUTTON"){
        const data_artist = click_target.getAttribute("data-artist")
        const data_song = click_target.getAttribute("data-song")
        //console.log(data_artist,data_song)
        dispayContent(data_artist,data_song)
    }
    
})

//ฟังชันเพื่อทำการแสดงเนื้อเพลง
async function dispayContent(data_artist,data_song){
    const response = await fetch(`${apiURL}/v1/${data_artist}/${data_song}`);
    const data = await response.json();
    // เป็นการเปลี่ยนพวกช่องว่าง แท็บ ให้เป็นเว้นบรรทัด
    const contents = data.lyrics.replace(/\n/ig,"<br>");
    //เช็คว่ามีเนื้อหาเพลงไหม ถ้ามีนำมาแสดง 
    if (contents){
        result.innerHTML = `<h2><span><strong>${data_artist}</strong> -${data_song}</span></h2>
        <span>${contents}</span>
        `
    }else{
        result.innerHTML = `<h2><span><strong>${data_artist}</strong> -${data_song}</span></h2>
        <span>ไม่มีเนื้อหาเพลงนี้</span>
        `
    }
    paylist.innerHTML = ""
}