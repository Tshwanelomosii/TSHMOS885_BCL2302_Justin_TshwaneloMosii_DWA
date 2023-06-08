// const form = document.querySelector("[data-form]");
// const result = document.querySelector("[data-result]");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const entries = new FormData(event.target);
//   const { dividend, divider } = Object.fromEntries(entries);

//   const wholenumber = dividend / divider;
// // Check if either dividend or divider is not a number
//   if(isNaN(dividend) || isNaN(divider)) {
//     document.body.innerText = " Something critical went wrong. Please reload the page.";
//     console.error("Invalid input provided. Program crashed");
//   }
//   // Check if either dividend or divider is empty
//   else if( dividend === "" || divider === "") {
//     result.innerText = " Division not performed. Both values are required in inputs. Try again "; 
//   }
//   // Check if either dividend or divider is negative
//   else if (dividend < 0 || divider < 0) {
//     result.innerText = "Division not performed. Invalid number provided. Try again"
//   }
//   // Perform division and display the result as a whole number
//   else result.innerText = Math.floor(wholenumber)
  
// });


/**
  * 
  * @param {string} label 
  * @returns {HTMLElement}
  */
const getHtml = (label) => {
    const node = document.querySelector(`[data-${label}]`)
    if (!(node instanceof HTMLElement)){
        throw new Error(
            "[data-${label}] was not found in HTML"
        )
    } 

    return node
    
}
const html = {
    mode:{
        display: getHtml('mode-display'),
        button: getHtml('mode-button'),
    },

    intensity:{
    display: getHtml('mode-display'),
    button: getHtml('mode-button'),
    },
}


const toggleIntensity = () => {

    const lockFn = () => {
        if (locked) throw new error ('Already locked') 
        locked = true;
    
        return () => {
        data.locked =false
        }
    }
    
    
    
    const toggle = () => {
        const unlock = lockFn()
    
        setTimeout(() =>{
            locked = false
        },2000 )
    }
    const ChangeAmount = () => {
        // if (locked) throw new Error ('Mode is being changed')
        // locked = true 
        const unlock = lockFn()
    
        unlock()
    
        // locked = false 
    }
    
    toggleMode()
    ChangeAmount()

}
const toggleMode = () => {

}



const mode = document.querySelector(['data-mode'])
const intensity = document.querySelector(['data-intensity'])

mode.addEventListener('click',() =>{})
intensity.addEventListener('click',() =>{})

/**
 * @typedef {object} data
 * @prop {'low' |'high'} intensity
 * @prop {'wide'|'focus'} mode
 * @prop {'boolean'} locked
 * */

/**
 * @type {Data}
 */

const data = {
        intensity: 'low',
        mode: 'wide',
        locked: false,
}


let locked = false

