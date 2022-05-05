const count = 10;
const apiKey = "CQbCQ8q232MegKTx520_bst_6hPFqpGitd0jQG8MCJ8"
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}` 

const img_containerEl = document.getElementById("img-container")
let pictureData

async function getPhotos(){
    /*try{
        const response = await fetch(apiUrl)
        pictureData = await response.json()
        //console.log(pictureData)
        displayImage();
    }catch(err){
        console.log(err)
    }*/
    const response = await fetch(apiUrl)
    pictureData = await response.json()
    //console.log(pictureData)
    displayImage();
}

function displayImage(){
    pictureData.forEach((photo)=>{
        console.log(photo)
        const tagA = document.createElement("a")
        tagA.href = `${photo.links.html}`
        tagA.target = "_blank"

        const tagImg = document.createElement("img")
        tagImg.src = `${photo.urls.regular}`
        tagImg.title = `${photo.description}`
        tagImg.alt = `${photo.description}`

        tagA.appendChild(tagImg)
        img_containerEl.appendChild(tagA)
    })
}


getPhotos()