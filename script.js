let keys = []

keys = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", "Del", "Caps Lock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "a_top", "Shift", "Ctrl", "Win", "Alt", "Space", "Alt", "Win", "a_left", "a_bottom", "a_right", "Ctrl"]

const keyboard = document.createElement('div')
keyboard.id = "keyboard"

keyboard.insertAdjacentHTML("beforeend", '<ul id="keyboard__ul"></ul>')

const keyboard_ul = keyboard.firstChild

keys.forEach(k => {
    keyboard_ul.insertAdjacentHTML("beforeend", `<li class="keyboard__ul__li key_${k.toLowerCase().replace(" ", "_")}">${k}</li>`)
})

document.body.appendChild(keyboard)