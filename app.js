const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies";

// for(let code in countryList){
//     console.log(code,countryList[code]);
// }

let dropdowns=document.querySelectorAll(".dropdown select") //drowndown ek andr ka select
const btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");//.value yahi access mt kr kyuki options hai nhi abhi tak.agr ye line mai options create krne ke baad wale code ke baad likhti toh .value chalta waha.also value niche access krna hi acha hai warna from mai val toh change hojayengi pr fromCurr value mai value old hi rahengi.so access variables wahi ke wahi,just access elements
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

for(let select of dropdowns){
    console.log("loop");
    for(let currCode in countryList){
        console.log("here");
        let newOpt=document.createElement("option");
        newOpt.innerText=currCode;
        newOpt.value=currCode;
        select.append(newOpt);
        // select.name aise acces kr skate or any attribute of element.And selected ka usecase bhi dekh,nice
        if(select.name==="from" && currCode==="USD") newOpt.selected=true;//both ways works ie ye likh ya "selected"
        else if(select.name==="to" && currCode=="INR") newOpt.selected="selected";
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        
    })
}
const updateFlag=(ele)=>{
    console.log(ele);
    let currCode=ele.value;//aise value milsakti
    let countryCode=countryList[currCode];
    //and to access img link ,rather than going to parent and then img ,we know link is fixed so harcode it
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    // ab parent pe jao
    let img=ele.parentElement.querySelector("img");
    img.src=newSrc;

}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();//yane jo default chize hoti hai page reload hona ya url change krna vo sab na ho
    updateExchangeRate();
});

const updateExchangeRate=async ()=>{
    let amt=document.querySelector(".amount input")
    let value=amt.value;
    if(value==="" || value<1){ //pr hstring 1 se compare hongi?check
        value=1;
        amt.value="1";//imp
    }

    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    console.log(data);
    let rate=(data[`${fromCurr.value.toLowerCase()}`])[toCurr.value.toLowerCase()]; //or data. as data is obj
    let fAmt=rate*value;
   
    msg.innerText=`${value} ${fromCurr.value} = ${fAmt} ${toCurr.value}`;
}

window.addEventListener("load",()=>{//taki shuruwat m hi values update hoke aajaye from usd to india
    updateExchangeRate();
})