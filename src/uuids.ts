
const options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function getChar(index: number) {
    return options[index % options.length];
}

export function timeuuid(): string {
    const now = new Date();
    const ms = now.getMilliseconds();
    return getChar(now.getFullYear())
        + getChar(now.getMonth())
        + getChar(now.getDate())
        + getChar(now.getHours())
        + getChar(now.getMinutes())
        + getChar(now.getSeconds())
        + getChar(Math.floor(ms / 100))
        + getChar(ms % 100);
}


export function randomuuid(length: number) {
    var uuid = [];
    for (let i = 0; i < length; i++) {
        uuid[i] = options[0 | Math.random() * options.length];
    }
    return uuid.join('');
}
