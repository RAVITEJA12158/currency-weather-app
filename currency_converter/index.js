
let arr=document.getElementById("arrow");
let bt=document.getElementById("btn");

const fetchCurrencyData = async (from, to) => {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${from}&to=${to}`
    );
    const data = await response.json();
    return data.rates[to];
  } catch (err) {
    console.error(err);
    return null;
  }
};

for(let sel of document.getElementsByTagName("select")){
    for(let countrycode in countryList){
        let option = document.createElement("option");  
        option.value = countrycode;
        option.textContent = countrycode;
        sel.appendChild(option);
    }
    sel.addEventListener("change",function(){
        let countrycode = countryList[this.value];
        let imgtag = this.parentElement.getElementsByTagName("img")[0];
        imgtag.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    }   );
}
arr.addEventListener("click",function(){
    let curr1 = document.getElementById("currency1");
    let curr2 = document.getElementById("currency2");   
    let temp = curr1.value;
    curr1.value = curr2.value;
    curr2.value = temp;
    curr1.dispatchEvent(new Event("change"));
    curr2.dispatchEvent(new Event("change"));
});
bt.addEventListener("click", async function () {
  let curr1 = document.getElementById("currency1").value;
  let curr2 = document.getElementById("currency2").value;
  let amount = document.getElementById("in1").value;
  if (curr1 === curr2) {
  document.getElementById("out1").textContent = amount;
  return;
}
 console.log(amount);   
  if (amount === "" || isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  let rate = await fetchCurrencyData(
    curr1,
    curr2
  );

  if (rate === null) {
    alert("Unable to fetch exchange rate");
    return;
  }

  let convertedAmount = (rate * Number(amount)).toFixed(2);
  console.log(rate);
  console.log(convertedAmount);
  document.getElementById("out1").value = convertedAmount;
});
