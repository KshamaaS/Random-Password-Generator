console.log("Random Password Generator")
const resultR = document.getElementById('result');
const lengthR = document.getElementById('length');
const uppercaseR = document.getElementById('uppercase');
const lowercaseR = document.getElementById('lowercase');
const numbersR = document.getElementById('numbers');
const symbolsR = document.getElementById('symbols');
const generateR = document.getElementById('generate');
const clipboardR = document.getElementById('clipboard');

const availrandom ={
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

clipboard.addEventListener('click', ()=>{
    const textarea= document.createElement('textarea');
    const password= resultR.innerText;

    if(!password) {
        return;
    }
    textarea.value=password;
    document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password Copied to Clipboard');
});
generateR.addEventListener('click', () => {
	const length = +lengthR.value;
	const hasLower = lowercaseR.checked;
	const hasUpper = uppercaseR.checked;
	const hasNumber = numbersR.checked;
	const hasSymbol = symbolsR.checked;
	
	resultR.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
function generatePassword(lower,upper, number, symbol,length){
    let generatedPassword="";
    const typesCount= lower + upper + number + symbol;
    const typesArr=[{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    //No selected type
    if(typesCount === 0){
        return 'At least one option has to be selected';
    }
    //Loop creation
    for(let i=0; i<length; i+=typesCount){
        typesArr.forEach(type=>{
            const funcName = Object.keys(type)[0];
            generatedPassword += availrandom[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0,length);
    return finalPassword;
}