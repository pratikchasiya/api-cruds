export const openImage = (imgUrl)=>{
 document.documentElement.style.setProperty('--bg-url', `url(${imgUrl}`)
 document.documentElement.style.setProperty('--image-div', "flex")
}
export const closeImage = ()=>{
    document.documentElement.style.setProperty('--image-div', "none")
}