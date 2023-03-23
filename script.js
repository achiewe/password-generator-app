// Get elements from the HTML
const passwordView = document.getElementById('password-view');
const numberOfLength = document.getElementById('length-number');
const inputSlide = document.getElementById('slider');
const inputCheckUpper = document.getElementById('check-uppercase');
const inputCheckLower = document.getElementById('check-lowercase');
const inputCheckNumber = document.getElementById('check-number');
const inputCheckSymbol = document.getElementById('check-symbols');
const strengthP = document.getElementById('strength-quality');
const strengthDiv1 = document.querySelector('.box1');
const strengthDiv2 = document.querySelector('.box2');
const strengthDiv3 = document.querySelector('.box3');
const strengthDiv4 = document.querySelector('.box4');
const buttonGenerate = document.getElementById('generate-button');
const emptyCheckbox = document.getElementById('empty-checkbox');
const iconCopy = document.querySelector('.copy-icon');










// Define regular expressions for each character type and empty variables
const upperRegex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerRegex = 'abcdefghijklmnopqrstuvwxyz';
const numbersRegex = '0123456789';
const symbolsRegex = '!@#$%^&*()_+=./,:"{}[]|<>?~`';
let emptyVariable = '';
let count = 0;











// Update the length number as the user adjusts the slider
inputSlide.addEventListener('input', () => {
    numberOfLength.innerHTML = inputSlide.value;
});










// Update the color of the slider background
inputSlide.oninput = () => {
    const value = (inputSlide.value - inputSlide.min) / (inputSlide.max - inputSlide.min) * 100;
    inputSlide.style.background = 'linear-gradient(to right, #A4FFAF 0%, ' + value + '%, #18171F ' + value + '%, #18171F 100%)';
};









// Add the selected character types to an empty variable
const controlCheckbox = () => {
    if (inputCheckUpper.checked) {
        emptyVariable += upperRegex;
        count++;
    }

    if (inputCheckLower.checked) {
        emptyVariable += lowerRegex;
        count++;
    }

    if (inputCheckNumber.checked) {
        emptyVariable += numbersRegex;
        count++;
    }

    if (inputCheckSymbol.checked) {
        emptyVariable += symbolsRegex;
        count++;
    }

    emptyCount();
}







//This function checks if the count variable is equal to 0 and shows/hides a checkbox accordingly.
const emptyCount = () => {
    if (count === 0) {
        emptyCheckbox.style.display = 'block';
    } else {
        emptyCheckbox.style.display = 'none';
    }
}







//This function is responsible for updating the password strength meter based on the current value of count. 
const checkboxStrength = () => {
    switch (count) {
        case 1:
            strengthDiv1.classList.add('too-weak');
            strengthP.textContent = 'TOO WEAK!';
            break;
        case 2:
            strengthDiv1.classList.add('weak');
            strengthDiv2.classList.add('weak');
            strengthP.textContent = 'WEAK';
            break;
        case 3:
            strengthDiv1.classList.add('medium');
            strengthDiv2.classList.add('medium');
            strengthDiv3.classList.add('medium');
            strengthP.textContent = 'MEDIUM';
            break;
        case 4:
            strengthDiv1.classList.add('strong');
            strengthDiv2.classList.add('strong');
            strengthDiv3.classList.add('strong');
            strengthDiv4.classList.add('strong');
            strengthP.textContent = 'STRONG';
            break;
        default:
            break;
    }
}








//remove styles 
const removeClasslist = () => {
    const elements = [strengthDiv1, strengthDiv2, strengthDiv3, strengthDiv4];
    elements.forEach((element) => {
        element.classList.remove('too-weak', 'weak', 'medium', 'strong');
    });
    strengthP.textContent = '';
}

// alternative variant 

// const removeClasslist  = () =>{
//     strengthDiv1.classList.remove('too-weak');
//     strengthDiv1.classList.remove('weak');
//     strengthDiv2.classList.remove('weak');
//     strengthDiv1.classList.remove('medium');
//     strengthDiv2.classList.remove('medium');
//     strengthDiv3.classList.remove('medium');
//     strengthDiv1.classList.remove('strong');
//     strengthDiv2.classList.remove('strong');
//     strengthDiv3.classList.remove('strong');
//     strengthDiv4.classList.remove('strong');
//     strengthP.textContent = '';
// } 









// this function made random password
const TypePassword = () => {
    let length = inputSlide.value;
    let password = '';
    for(let i = 0; i < length; i++){
        let casualIndex = Math.floor(Math.random() * emptyVariable.length);
        password += emptyVariable[casualIndex];
    }

    return password;
}





// This code allows users to copy their password by clicking on an icon
iconCopy.addEventListener('click', () => {
    const textBox = document.createElement('input'); // create an input element
    textBox.type = 'text'; // set the type to text
    textBox.value = passwordView.textContent; // set the value to the password content
    document.body.appendChild(textBox);
  
    textBox.select();
    document.execCommand('copy'); // use 'copy' instead of 'iconCopy'
  
    document.body.removeChild(textBox);
  });
  








// Add event listener to button with ID 'buttonGenerate' for a 'click' event
buttonGenerate.addEventListener('click', (event) => {

    // Prevent the default behavior of the click event (e.g. form submission)
    event.preventDefault();
    count = 0;
    emptyVariable = '';
    removeClasslist();
    controlCheckbox();
    checkboxStrength();
    if(count > 0){
        let identification = TypePassword();
        passwordView.innerHTML = identification;
        passwordView.style.opacity = '1';
    } else {
        passwordView.innerHTML = 'P4$5W0rD!';
        passwordView.style.opacity = '0.25';
    }

})
