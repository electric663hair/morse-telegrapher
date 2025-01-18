const navButtons = document.querySelectorAll("nav .navButton");
const characters = document.querySelector("#characters");
const alphabet = document.querySelector(".alphabet");
const simulator = document.querySelector(".simulator");
const keyButton = document.querySelector("#telegraphKeyContainer");
let startTime;

keyButton.addEventListener("mousedown", function() {
    startTime = performance.now();
    keyButton.classList.add("up")
})
keyButton.addEventListener("mouseleave", function() {
    console.log(performance.now() - startTime)
    keyButton.classList.remove("up")
})
keyButton.addEventListener("mouseup", function() {
    console.log(performance.now() - startTime)
    keyButton.classList.remove("up")
})
document.addEventListener("keydown", function(event) {
    if (event.code == "Space") {
        startTime = performance.now()
        keyButton.classList.add("up")
    }
})
document.addEventListener("keyup", function(event) {
    if (event.code == "Space") {
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

function appendCharacters(element) {
    charactersToAppend = ["A => .-", "B => -...", "C => -.-.", "D => -..", "E => .", "F => ..-.", "G => --.", "H => ....", "I => ..", "J => .---", "K => -.-", "L => .-..", "M => --", "N => -.", "O => ---", "P => .--.", "Q => --.-", "R => .-.", "S => ...", "T => -", "U => ..-", "V => ...-", "W => .--", "X => -..-", "Y => -.--", "Z => --.."]


    charactersToAppend.forEach(character => {
        element.insertAdjacentHTML("beforeend", `<div class="character">${character}</div>`)
    })
}
appendCharacters(characters)