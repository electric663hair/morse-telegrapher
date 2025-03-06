const morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", "/"]
const latin = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "];

function translateCharacter(char, direction) {
    if (!direction) {
        let translation = latin[morse.indexOf(char)]
        return translation !== undefined ? translation : ""
    } else {
        let translation = morse[latin.indexOf(char)]
        return translation !== undefined ? translation : ""
    }
}

function translateMorse(string) {
    let endString = ""
    string.split("/").forEach(word => {
        word.split(" ").forEach(character => {
            endString += translateCharacter(character, 0)
        })
        endString += " "
    });
    return endString.slice(0, -1)
}

function translateLatin(string) {
    let endString = ""
    string.split(" ").forEach(word => {
        for (const character of word) {
            endString += translateCharacter(character, 1) + " "
        }
        endString += " / "
    });
    return endString.slice(0, -4)
}