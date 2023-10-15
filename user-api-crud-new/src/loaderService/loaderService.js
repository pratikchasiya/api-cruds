
 const loaderService = (value)=>{
   console.log(value);
 if(value){
    // document.querySelector('.loader').style.display = 'flex'
    document.documentElement.style.setProperty('--loader-display' , 'flex')
 }
 else{
    // document.querySelector('.loader').style.display = 'none'
    document.documentElement.style.setProperty('--loader-display' , 'none')
 }
}
 export default loaderService