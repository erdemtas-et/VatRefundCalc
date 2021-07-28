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