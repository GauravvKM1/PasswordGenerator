const inputSlider=document.querySelector("[data-lengthSlider]");
// to fetch custom attribute we use [] inside () box
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
// wo saare input tag aa jaayenge jinka input type=checkbox hai
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// 
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
// ek checkbox count hua para hai pahle se
let checkCount=1;
handleSlider();
//set strength circle color to grey
setIndicator("#ccc");

// set password length
function handleSlider(){
inputSlider.value=passwordLength;
lengthDisplay.innerText=passwordLength;
// aur kuchh karna hai kya,samjho isse
const min=inputSlider.min;
const max=inputSlider.max;
inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%100";
}

function setIndicator(color){
  indicator.style.backgroundColor=color;
//    shadow homework
indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

// creating a random integre b/w min and max
function getRandomInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
    }

function generateSymbol(){
     const randNum=getRandomInteger(0,symbols.length);
     return symbols.charAt(randNum);
    }

// check password strength
function calcStrength() {
    // false matlab checked nhi hai
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    // agar uppercase checked hai to use true mark kardo
    if (uppercaseCheck.checked) 
        hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
//   kuchh rules hai ,kisine banaya hoga
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    }
    else {
      setIndicator("#f00");
    }
} 

async function copyContentClipboard(){
try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
}
catch(e){
    copyMsg.innerText="failed";
}
// to make copy wala span visible
copyMsg.classList.add("active");

setTimeout(()=>{
    copyMsg.classList.remove("active");
},2000);}
console.log("copy ho gai");
function shufflePassword(array){
    // Fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



function handleCheckBoxChange(){
  checkCount=0;
  allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
       checkCount++;
  });
//   special condition
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}
}


allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
});
// adding eventListener to inputSlider
inputSlider.addEventListener('input',(e)=>{
passwordLength=e.target.value;
handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
       copyContentClipboard(); 
    }
});

generateBtn.addEventListener('click',()=>{
// if none of the checkboxes are selected
   if(checkCount<=0) 
      return;
   if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}
// lets start the journey to find new password
console.log("starting the Journey");
  password="";
//   lets put the stuff mentioned by checkboxes
// if(uppercaseCheck.checked){
//     password+=generateUpperCase();
// }
// if(lowercaseCheck.checked){
//     password+=generateLowerCase();
// }
// if(symbolsCheck.checked){
//     password+=generateSymbol();
// }
// if(numbersCheck.checked){
//     password+=generateRandomNumber();
// }

let funcArr=[];
if(uppercaseCheck.checked)
   funcArr.push(generateUpperCase);
if(lowercaseCheck.checked)
   funcArr.push(generateLowerCase);
if(symbolsCheck.checked)
   funcArr.push(generateSymbol);
if(numbersCheck.checked)
   funcArr.push(generateRandomNumber);

// compulsory addition
for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();
}
console.log("compulsory addition done");
//remaining addition
for(let i=0;i<passwordLength-funcArr.length;i++) {
 let randIndex=getRandomInteger(0,funcArr.length);   
 console.log("randIndex"+ randIndex);
 password+=funcArr[randIndex]();
}
console.log("Remaining addition done");
// ye to order m aayega jaise hamne likha h ,aisa kaisa password
// to hame shuffle karna padega
// shuffle the password
password=shufflePassword(Array.from(password));
console.log("shuffling done");
// show in UI
passwordDisplay.value=password;
console.log("UI addition done");
// calculate strength
 calcStrength();

});

