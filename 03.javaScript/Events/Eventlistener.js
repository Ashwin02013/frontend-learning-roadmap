const myBox= document.getElementById("myBox");
function changeColor(event){
    event.target.style.backgroundColor = "tomato";
    event.target.textContent="potato";
}
myBox.addEventListener("click" , changeColor);


