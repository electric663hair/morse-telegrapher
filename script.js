const navButtons = document.querySelectorAll("nav .navButton");
const alphabet = document.querySelector(".alphabet");
const simulator = document.querySelector(".simulator");
const keyButton = document.querySelector("#telegraphKeyButton");
const copyButtons = document.querySelectorAll(".copyButton");
const morseConsole = document.querySelector("#morseConsole");
const txtConsole = document.querySelector("#txtConsole");
const light = document.querySelector(".light");
const newChar = document.querySelector("#newChar");
let startTime;
let endTime;
let spaceDown;
let character;
let unitTime = 130;
let daCheckID;

function updateTxtConsole() {
    txtConsole.textContent = translateString(morseConsole.textContent);
}

function buttonDown() {
    startTime = performance.now()
    light.classList.add("green");
    if (timeSinceLastButtonPress() > unitTime * 7) {
        if (morseConsole.textContent[morseConsole.textContent.length-2] != "/") {
            morseConsole.textContent += " / "
        }
    } else if (timeSinceLastButtonPress() > unitTime * 3) {
        morseConsole.textContent += " "
        newChar.textContent = " " + newChar.textContent;
    }
    keyButton.classList.add("mainBtnDown")
    
    light.textContent = "."
    newChar.textContent = "."

    daCheckID = setTimeout(function() {
        if (keyButton.classList.contains("mainBtnDown")) {
            light.textContent = "-"
            newChar.textContent = "-"
        }
    }, unitTime * 3)
}

function buttonUp() {
    endTime = performance.now()
    light.classList.remove("green");
    if (getBtnDownTime() < unitTime) {
        newChar.textContent = "."
    } else {
        newChar.textContent = "-"
    }
    morseConsole.textContent += newChar.textContent;
    updateTxtConsole();
    keyButton.classList.remove("mainBtnDown")
    light.textContent = ""
    newChar.textContent = ""
    clearTimeout(daCheckID);
}

function getBtnDownTime() {
    console.log(parseFloat((endTime - startTime).toFixed(2)))
    return parseFloat((endTime - startTime).toFixed(2))
}
function timeSinceLastButtonPress() {
    // console.log("time since btn click:", parseFloat((startTime - endTime).toFixed(2)))
    return (startTime - endTime)
}

function getLastWord(str) {
    const words = str.trim().split(' ');
    return words[words.length - 1];
}

function removeLastWord(string) {
    let lastWordLength = getLastWord(string).length
    let stringLength = string.length
    return string.slice(0, stringLength-lastWordLength-1)
}

keyButton.addEventListener("mousedown", function() {
    buttonDown();
})
keyButton.addEventListener("mouseleave", function() {
    if (keyButton.classList.contains("mainBtnDown")) {
        buttonUp();
    }
})
keyButton.addEventListener("mouseup", function() {
    buttonUp();
})
document.addEventListener("keydown", function(event) {
    if (event.code == "Space") {
        event.preventDefault();
        
        if ( !spaceDown) {
            spaceDown = true;
            buttonDown();
        }
    }
    if (event.key == "Backspace") {
        morseConsole.textContent = removeLastWord(morseConsole.textContent)
        updateTxtConsole();
        endTime = performance.now() - 130
    }
})
document.addEventListener("keyup", function(event) {
    if (event.code == "Space") {
        spaceDown = false;
        buttonUp();
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

copyButtons.forEach(button => {
    button.addEventListener("mousedown", function() {
        button.classList.add("copyButtonDown")
        if (navigator.clipboard) {
            navigator.clipboard.writeText(button.parentNode.children[1].textContent)
        }
    })
    const events = ["mouseup", "mouseleave"]
    events.forEach(event => button.addEventListener(event, function() {
        button.classList.remove("copyButtonDown")
    }));
})

function ditOrDa() {
    const time = endTime - startTime
    if (time < unitTime * 3 && character != "-") {
        return "."
    }
    character = "";

    return "-"
}
  

function appendCharacters(element, type) {
    let charactersToAppend = []
    if (type == "l") charactersToAppend = ["A | .-", "B | -...", "C | -.-.", "D | -..", "E | .", "F | ..-.", "G | --.", "H | ....", "I | ..", "J | .---", "K | -.-", "L | .-..", "M | --", "N | -.", "O | ---", "P | .--.", "Q | --.-", "R | .-.", "S | ...", "T | -", "U | ..-", "V | ...-", "W | .--", "X | -..-", "Y | -.--", "Z | --.."]
    else if (type == "n") charactersToAppend = ["1 | .----", "2 | ..---", "3 | ...--", "4 | ....-", "5 | .....", "6 | -....", "7 | --...", "8 | ---..", "9 | ----."]
    else if (type == "s") charactersToAppend = [". | .-.-.-", ", | --..--", "? | ..--..", "! | -.-.--", "/ | -..-.", "( | -.--.", ") | -.--.-", "& | .-...", ": | ---...", "; | -.-.-.", "= | -...-", "+ | .-.-.", "- | -....-", "_ | ..--.-", "\" | .-..-.", "$ | ...-..-", "@ | .--.-.", "Æ | .-.-", "Ø | ---.", "Å | .--.-"]

    element.forEach(__element => {
        charactersToAppend.forEach(character => {
            character = character.split(" | ")
            __element.insertAdjacentHTML("beforeend", `<div class="character"><span class="characterText">${character[0]}</span><span class="morseText">${character[1]}</span></div>`)
        })
    })
}

appendCharacters(document.querySelectorAll(".letters"), "l")
appendCharacters(document.querySelectorAll(".numbers"), "n")
appendCharacters(document.querySelectorAll(".symbols"), "s")