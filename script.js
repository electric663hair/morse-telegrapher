const navButtons = document.querySelectorAll("nav .navButton");
const alphabet = document.querySelector(".alphabet");
const simulator = document.querySelector(".simulator");
const keyButton = document.querySelector("#telegraphKeyContainer");
let startTime;
let spaceDown;

keyButton.addEventListener("mousedown", function() {
    startTime = performance.now();
    keyButton.classList.add("up")
})
keyButton.addEventListener("mouseleave", function() {
    if (keyButton.classList.contains("up")) {
        console.log(performance.now() - startTime)
        keyButton.classList.remove("up")
    }
})
keyButton.addEventListener("mouseup", function() {
    console.log(performance.now() - startTime)
    keyButton.classList.remove("up")
})
document.addEventListener("keydown", function(event) {
    if (event.code == "Space") {
        event.preventDefault();
        
        if ( !spaceDown) {
            spaceDown = true;
            startTime = performance.now()
            keyButton.classList.add("up")
        }
    }
})
document.addEventListener("keyup", function(event) {
    if (event.code == "Space") {
        spaceDown = false;
        console.log(performance.now() - startTime)
        keyButton.classList.remove("up")
    }
})

navButtons.forEach(button => {
    button.addEventListener("click", function() {
        let text = button.textContent.toLowerCase();
        if (text == "alphabet") {
            alphabet.classList.remove("hidden")
            simulator.classList.add("hidden")
        } else if (text == "simulator") {
            alphabet.classList.add("hidden")
            simulator.classList.remove("hidden")
        }
    })
})

function appendCharacters(element, type) {
    if (type == "l") charactersToAppend = ["A | .-", "B | -...", "C | -.-.", "D | -..", "E | .", "F | ..-.", "G | --.", "H | ....", "I | ..", "J | .---", "K | -.-", "L | .-..", "M | --", "N | -.", "O | ---", "P | .--.", "Q | --.-", "R | .-.", "S | ...", "T | -", "U | ..-", "V | ...-", "W | .--", "X | -..-", "Y | -.--", "Z | --.."]
    else if (type == "n") charactersToAppend = ["1 | .----", "2 | ..---", "3 | ...--", "4 | ....-", "5 | .....", "6 | -....", "7 | --...", "8 | ---..", "9 | ----."]
    else if (type == "s") charactersToAppend = [". | .-.-.-", ", | --..--", "? | ..--..", "! | -.-.--", "/ | -..-.", "( | -.--.", ") | -.--.-", "& | .-...", ": | ---...", "; | -.-.-.", "= | -...-", "+ | .-.-.", "- | -....-", "_ | ..--.-", "\" | .-..-.", "$ | ...-..-", "@ | .--.-.", "Æ | .-.-", "Ø | ---.", "Å | .--.-"]

    element.forEach(__element => {
        charactersToAppend.forEach(character => {
            character = character.split(" | ")
            console.log(character)
            __element.insertAdjacentHTML("beforeend", `<div class="character"><span class="characterText">${character[0]}</span><span class="morseText">${character[1]}</span></div>`)
        })
    })
}

appendCharacters(document.querySelectorAll(".letters"), "l")
appendCharacters(document.querySelectorAll(".numbers"), "n")
appendCharacters(document.querySelectorAll(".symbols"), "s")