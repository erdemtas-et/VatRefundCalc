

# VAT Refund Calculator

The aim of this web app is to help EU citizen travellers to calculate their TAX Refunds after their spendings. It is limited to the EU now, I may think to expand it more in the future.

## Design

I have thought about the UX and UI first, so it is a simple one-page application that calculates refunds and does not have any commercial ads or text. 

<a href="https://ibb.co/v1xHt7Q"><img width="500" src="https://i.ibb.co/8MD0hWd/Screen-Shot-2021-07-28-at-11-43-13.png" alt="Screen-Shot-2021-07-28-at-11-43-13" border="0"></a>

<a href="https://ibb.co/G7MnGCK"><img width="500" src="https://i.ibb.co/rkpFq5C/Screen-Shot-2021-07-28-at-11-43-28.png" alt="Screen-Shot-2021-07-28-at-11-43-28" border="0"></a>

<a href="https://ibb.co/5KTFbM7"><img width="500" src="https://i.ibb.co/BnLN0z1/Screen-Shot-2021-07-28-at-11-44-17.png" alt="Screen-Shot-2021-07-28-at-11-44-17" border="0"></a>


## Code

#### JSON
I use the local JSON file that I have created by myself. It has a structure example below.
```
{
"countries" : [{
"name":"Country Name",
"rate": 0.2,
"currency : "€"
},
]
```

#### Code Base

Fetch API has composed my code base in this web app. I may use a local .JSON file but Fetch API made everything simple and understandable.
```
let url = "./countries.json"

fetch(url)
    .then(res => {
        return res.json()
    }).then(data => {
        getData(data)
        vatRates(data)
        getValueAndCalculate()
    }).catch(error => {
        console.log(error)
    })

```

Rest of the code is DOM Manipulation so I just copy the code. 
````
let selectMenu = document.getElementById("selectMenu")
let localCurrency;
//Option Names & Values
function getData(myData) {

    for (let i = 0; i < myData.countries.length; i++) {

        let newOption = document.createElement("option")
        newOption.value = myData.countries[i].name.toLowerCase()
        newOption.innerHTML = myData.countries[i].name
        selectMenu.appendChild(newOption)



    }
}
//Option Names & Values

//write country rates to VAT Rates
function vatRates(myData) {
    let vatRates = document.getElementById("vat-rates")
    let userSpent = document.getElementById("user-spent")
    for (let i = 0; i < myData.countries.length; i++) {
        selectMenu.addEventListener("change", function () {

            if (myData.countries[i].name.toLowerCase() === selectMenu.value) {

                userSpent.value = ""
                vatRates.value = `${myData.countries[i].rate* 100} %`
                document.getElementById("user-input").classList.remove("invisible-amount")
                localCurrency = myData.countries[i].currency
            } else if (selectMenu.value === "Choose a Country") {

                vatRates.value = "Please choose a country"
                document.getElementById("user-input").classList.add("invisible-amount")
                document.getElementById("total-amount").classList.add("invisible-amount")
            }
        })

    }
}
//write country rates to VAT Rates

function getValueAndCalculate() {
    let vatRates = document.getElementById("vat-rates")
    let userSpent = document.getElementById("user-spent")
    let chosenRate;
    let finalAmount;
    let finalText = document.getElementById("total-amount")
    selectMenu.addEventListener("change", function () {
        chosenRate = vatRates.value.match(/\d+/)[0] / 100
    })

    userSpent.addEventListener("input", function () {
        finalAmount = Number(userSpent.value) * chosenRate
        finalText.classList.remove("invisible-amount")
        if (userSpent.value === null) {
            finalText.innerHTML = ""
        } else {
            finalText.innerHTML = `Total Refund: ${finalAmount.toFixed(2)} ${localCurrency}`
        }
    })

}

selectMenu.addEventListener("click", () => {
    let finalText = document.getElementById("total-amount")
    finalText.innerHTML = ""
})
````

##FINAL

<img src="https://im6.ezgif.com/tmp/ezgif-6-cf9e6c2489d5.gif" width="800" />
