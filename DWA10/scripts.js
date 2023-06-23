
//using template in .js
// let template = document.getElementById("my-paragraph");
// let templatecontent = template.content;
// document.body.appendChild(templatecontent);



const MAX_NUMBER = 100
const MIN_NUMBER = -20
const STEP_AMOUNT = 5

const number = document.querySelector('[data-key="number"]')
const subtract = document.querySelector('[data-key="subtract"]')
const add = document.querySelector('[data-key="add"]')

const subtracthandler = () => {
    const newValue = parseInt(number.value) - STEP_AMOUNT;
    number.value = newValue

    if(add.disabled === true){
        add.disabled = false
    }

    if(newValue <= MIN_NUMBER) { 
        subtract.disabled = true
    } 
}

const addhandler = () => {
    const newValue = parseInt(number.value) + STEP_AMOUNT;
    number.value = newValue

    if(subtract.disabled === true){
        subtract.disabled = false
    }

    if(number.value >= MAX_NUMBER){ 
        add.disabled = true
    } 
}

subtract.addEventListener('click', subtracthandler)
add.addEventListener('click', addhandler)



