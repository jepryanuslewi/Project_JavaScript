const inputColor = document.getElementById('inputColor');
const colorPicked = document.getElementById('colorPicked');
const colorSelected = document.getElementById('colorSelected');
const title = document.getElementById('title');
console.log(title)
inputColor.addEventListener('input', function(){
    const input = inputColor.value;
    colorPicked.textContent = input;
    colorSelected.style.backgroundColor = input;
    title.style.color = input;
})