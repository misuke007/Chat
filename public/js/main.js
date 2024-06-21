const filesInput = document.querySelector('.files-input')
const overview = document.querySelector('.overview')
const list = document.querySelector('.img-list') 
const icon = document.querySelector('.fa-thumbs-up')
const icon1 = document.querySelector('.fa-thumbs-down')




function createDivs(url){
    const div = document.createElement('div')
    div.setAttribute('class' ,'col-lg-4')

    div.innerHTML = `<img src="${url}" alt="test test" width="100%" >`

    return div
}
if(filesInput != null){

filesInput.addEventListener('change' , function(event){

    // console.log(event);

    // let image = event.target.files[0]
    // let imgUrl = window.URL.createObjectURL(image)
    // console.log(image);

    overview.style.display = 'block'
    // img1.setAttribute("src" , imgUrl)

    let image = event.target.files
    let imageNumber = image.length

    if(imageNumber > 6 ){
        for(let i = 0; i<= 6; i++){
            
            let url = window.URL.createObjectURL(image[i])
            let div = createDivs(url)
            // console.log(div);
            list.append(div)
        } 

    }else{
        for(item in image){
            let url = window.URL.createObjectURL(image[item])
            let div = createDivs(url)
            // console.log(div);
            list.append(div)
        }

    }
})
}




if(icon != null ){
    icon.addEventListener('click' , function(event){

        // console.log(event.target)
        let productId = event.target.id 
    
    axios.get(`http://localhost:9000/product/addlike/${productId}`)
    .then( (res) =>{
        console.log(res.data.message);
        if(res.data.message){
            icon1.classList.remove('dis-none')
            icon.classList.add('dis-none')
            
        }
    })
    })
}

if(icon1 != null){
    icon1.addEventListener('click' , function(event){

        // console.log(event.target)
        let productId = event.target.id 
    
    axios.get(`http://localhost:9000/product/deletelike/${productId}`)
    .then( (res) =>{
        console.log(res.data.message);
        if(res.data.message){
            icon.classList.remove('dis-none')
            icon1.classList.add('dis-none')
            
        }
    })
    })
}




