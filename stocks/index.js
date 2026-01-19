const parm=new URLSearchParams(window.location.search);
const symbol=parm.get("symbol");
const apikey="EX8LHO4SVP21KBW9";
async function fetchStockData(symbol) {
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apikey}`;
    try{
        let res=await fetch(url);   
       if(res.status==404)
       {
            alert("Stock data not found");
       }
        let data=await res.json();
        if (data["Error Message"]) {
            alert(` "${symbol}" is not a valid symbol.`);
            return null;
        }
        if (data.Note) {
            alert(` API limit reached. Try again later.`);
            return null;
        }
    return data;
    }
    catch(err){
        console.log("err:",err);
    }
}
async function main(){
let result=await fetchStockData(symbol);
if (!result || !result["Time Series (Daily)"]) {
    console.log("API response issue:", result);
    return;
}
let res1=result["Time Series (Daily)"]; 
const times = Object.keys(res1).sort((a, b) => new Date(b) - new Date(a));
    const latest = res1[times[0]];
    const previous = res1[times[1]];
    console.log("Latest data:", latest);
    console.log("Previous data:", previous);
     const latestClose = parseFloat(latest["4. close"]);
    const previousClose = parseFloat(previous["4. close"]);
    const latestVolume = parseInt(latest["5. volume"]);
    console.log(`Latest close: ${latestClose}, Previous close: ${previousClose}, Volume: ${latestVolume}`);
    document.getElementById("symbol").value=symbol;
    document.getElementById("opening").value=latest["1. open"];
    document.getElementById("high").value=latest["2. high"];
    document.getElementById("low").value=latest["3. low"];
    document.getElementById("close").value=latest["4. close"];
    document.getElementById("date").value=times[0];
    document.getElementById("volume").value=latest["5. volume"];
    if (latestClose > previousClose) {
      document.getElementsByClassName("container")[0].style.backgroundImage = "url('up.jpg')";
         document.getElementsByClassName("container")[0].style.backgroundSize = "cover";
         alert("Stock price is going up 📈");
    } else if (latestClose < previousClose) {
      document.getElementsByClassName("container")[0].style.backgroundImage = "url('down.webp')";
         document.getElementsByClassName("container")[0].style.backgroundSize = "cover";
            alert("Stock price is going down 📉");
    }
    else{
        document.getElementsByClassName("container")[0].style.backgroundImage = "url('neutral.webp')";
        document.getElementsByClassName("container")[0].style.backgroundSize = "cover";
        alert("Stock price is stable ➖");
    }
}
main();
