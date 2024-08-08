let timerElement = document.getElementById("timer")
let timerSeconds = 0
let timerSetIntervalID

let quoteDisplay = document.getElementById("quoteDisplay")
let quoteInput = document.getElementById("quoteInput")
let submitBtn = document.getElementById("submitBtn")
let resetBtn = document.getElementById("resetBtn")
let startBtn = document.getElementById("startBtn")
let result = document.getElementById("result")
let spinner = document.getElementById("spinner")

let url = "https://apis.ccbp.in/random-quote"
let options = {
    method: "GET"
}

function fetchQuote() {
    spinner.classList.remove("d-none")
    fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            let {
                content
            } = jsonData
            displayContent(content)
        })
}

function displayContent(content) {
    spinner.classList.add("d-none")
    quoteDisplay.textContent = content
}

function startClicked() {
    timerSeconds = 0
    timerElement.textContent = timerSeconds
    timerSetIntervalID = setInterval(function() {
        timerSeconds += 1
        timerElement.textContent = timerSeconds
    }, 1000)
    fetchQuote()
    quoteInput.disabled = false
    submitBtn.disabled = false
    startBtn.disabled = true
    result.textContent = ""
}

function submitClicked() {
    let quoteInputValue = quoteInput.value
    if (quoteInputValue === quoteDisplay.textContent) {
        result.textContent = "You typed it in " + timerSeconds + " seconds"
        clearInterval(timerSetIntervalID)
    } else {
        result.textContent = "You typed the incorrect sentence"
    }
}

function resetClicked() {
    result.textContent = ""
    quoteInput.value = ""
    timerSeconds = 0
    timerElement.textContent = timerSeconds
    clearInterval(timerSetIntervalID)
    startBtn.disabled = false
    quoteInput.disabled = true
    submitBtn.disabled = true
    fetchQuote()
}

startBtn.addEventListener("click", startClicked)
submitBtn.addEventListener("click", submitClicked)
resetBtn.addEventListener("click", resetClicked)

// Fetch a quote initially
fetchQuote()