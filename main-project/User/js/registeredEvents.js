const upcommingBtn=document.querySelector("#upcommingBtn");
const pastBtn=document.querySelector("#pastBtn");

upcommingBtn.addEventListener("click",()=>{
    window.location.href="registeredEvents-upcomming.html"
});

pastBtn.addEventListener("click",()=>{
    window.location.href="registeredEvents-past.html"
})
