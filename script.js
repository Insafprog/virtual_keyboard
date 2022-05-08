document.body.insertAdjacentHTML('beforeend', '<textarea placeholder="Язык меняется при нажатии Shift+Alt!\nЯзык системы синхронизируется при попытке печати с клавиатуры\n Физическая клавиатура работает когда в фокусе textarea\nОперационная система Windows!\nДополнительные клавиши появляются при нажатии Shift!"></textarea>')
class Keyboard {
    ru = {
        default : ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Delete", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ArrowUp", "Shift", "Control", "Win", "Alt", "Space", "Alt", "Win", "ArrowLeft", "ArrowDown", "ArrowRight", "Control"],
        shift : ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Delete", "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "ArrowUp", "Shift", "Control", "Win", "Alt", "Space", "Alt", "Win", "ArrowLeft", "ArrowDown", "ArrowRight", "Control"]
    }
    en = {
        default : ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Delete", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ArrowUp", "Shift", "Control", "Win", "Alt", "Space", "Alt", "Win", "ArrowLeft", "ArrowDown", "ArrowRight", "Control"],
        shift : ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Delete", "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter", "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "ArrowUp", "Shift", "Control", "Win", "Alt", "Space", "Alt", "Win", "ArrowLeft", "ArrowDown", "ArrowRight", "Control"]
    }

    lang = this.ru
    shift = false
    caps = false
    alt = false
    ctrl = false

    constructor() {
        if ('localStorage' in window) {
            const l = localStorage.getItem('language')
            if (l) this.lang = this[l]
        }
    }

    getKeys(shift = this.shift, caps = this.caps, lang = this.lang) {
        if (shift == false) {
            if (caps == false) return lang.default
            return lang.default.map(e => {
                if(e.length == 1) return e.toUpperCase()
                return e
            })
        } else {
            if (caps == false) return lang.shift
            return lang.shift.map(e => {
                if(e.length == 1) return e.toLowerCase()
                return e
            })
        }
    }

    switchLang() {
        if (this.lang == this.ru) {
            this.lang = this.en
            if ('localStorage' in window) {
                localStorage.setItem('language', 'en')
            }
        }
        else {
            this.lang = this.ru
            if ('localStorage' in window) {
                localStorage.setItem('language', 'ru')
            }
        }
    }
}



const keyboard = new Keyboard()

const textarea = document.querySelector("textarea")
textarea.focus()

const board = document.createElement('div')
board.id = "keyboard"

board.insertAdjacentHTML("beforeend", '<ul id="keyboard__ul"></ul>')
const board_ul = board.firstChild

function refreshBoard() {
    document.querySelector("#keyboard__ul").childNodes.forEach((e, k) => {
        let text
        key = keyboard.getKeys()
        switch (key[k]) {
            case "Win":
                text = '<i class="fa fa-windows" aria-hidden="true"></i>'
                break;
            case "ArrowUp":
                text = '<i class="fa fa-caret-up" aria-hidden="true"></i>'
                break;
            case "ArrowDown":
                text = '<i class="fa fa-caret-down" aria-hidden="true"></i>'
                break;
            case "ArrowLeft":
                text = '<i class="fa fa-caret-left" aria-hidden="true"></i>'
                break;
            case "ArrowRight":
                text = '<i class="fa fa-caret-right" aria-hidden="true"></i>'
                break;
            case "CapsLock":
                text = "Caps Lock"
                break;
            case "Control":
                text = "Ctrl"
                break;
            case "Delete":
                text = "Del"
                break;
            default:
                text = key[k]
                break;
        }
        e.setAttribute("button", key[k])
        e.innerHTML = text
    })
}

board_ul.innerHTML = ""

keyboard.getKeys().forEach(k => {
    let text
    switch (k) {
        case "Win":
            text = '<i class="fa fa-windows" aria-hidden="true"></i>'
            break;
        case "ArrowUp":
            text = '<i class="fa fa-caret-up" aria-hidden="true"></i>'
            break;
        case "ArrowDown":
            text = '<i class="fa fa-caret-down" aria-hidden="true"></i>'
            break;
        case "ArrowLeft":
            text = '<i class="fa fa-caret-left" aria-hidden="true"></i>'
            break;
        case "ArrowRight":
            text = '<i class="fa fa-caret-right" aria-hidden="true"></i>'
            break;
        case "CapsLock":
            text = "Caps Lock"
            break;
        case "Control":
            text = "Ctrl"
            break;
        case "Delete":
            text = "Del"
            break;
        default:
            text = k
            break;
    }
    board_ul.insertAdjacentHTML("beforeend", `<li class="keyboard__ul__li" button="${k}">${text}</li>`)
})

function addEventListeners() {
    let activate = (li) => function(event) {
        str = textarea.value
        start = textarea.selectionStart
        end = textarea.selectionEnd
        switch (li.getAttribute("button")) {
            case "Backspace":
                if (start == end && start != 0) start--
                textarea.value = str.substring(0, start) + str.substring(end)
                textarea.selectionStart = start
                textarea.selectionEnd = start
                break;
            case "Delete":
                if (start == end && end != str.length) end++
                textarea.value = str.substring(0, start) + str.substring(end)
                textarea.selectionStart = start
                textarea.selectionEnd = start
                break;
            case "Enter":
                textarea.value = str.substring(0, start) + "\n" + str.substring(end)
                textarea.selectionStart = start + 1
                textarea.selectionEnd = start + 1
                break;
            case "Tab":
                textarea.value = str.substring(0, start) + "\t" + str.substring(end)
                textarea.selectionStart = start + 1
                textarea.selectionEnd = start + 1
                break;
            case "Space":
                textarea.value = str.substring(0, start) + " " + str.substring(end)
                textarea.selectionStart = start + 1
                textarea.selectionEnd = start + 1
                break;
            case "CapsLock":
                if (keyboard.caps) {
                    li.removeAttribute("active")
                    keyboard.caps = false
                }
                else {
                    li.setAttribute("active", true)
                    keyboard.caps = true
                }
                refreshBoard()
                break;
            case "Alt":
                if (keyboard.shift && !keyboard.alt && !keyboard.ctrl){
                    keyboard.switchLang()
                    board_ul.querySelectorAll(`li[button=Shift]`).forEach(el => {
                        el.removeAttribute("active")
                    })
                    keyboard.shift = false
                    refreshBoard()
                    break
                }
                if (keyboard.alt) {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.removeAttribute("active")
                    })
                    keyboard.alt = false
                }
                else {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.setAttribute("active", true)
                    })
                    keyboard.alt = true
                }
                break;
            case "Shift":
                if (!keyboard.shift && keyboard.alt && !keyboard.ctrl){
                    keyboard.switchLang()
                    board_ul.querySelectorAll(`li[button=Alt]`).forEach(el => {
                        el.removeAttribute("active")
                    })
                    keyboard.alt = false
                    refreshBoard()
                    break
                }
                if (keyboard.shift) {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.removeAttribute("active")
                    })
                    keyboard.shift = false
                }
                else {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.setAttribute("active", true)
                    })
                    keyboard.shift = true
                }
                refreshBoard()
                break;
            case "Control":
                if (keyboard.ctrl) {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.removeAttribute("active")
                    })
                    keyboard.ctrl = false
                }
                else {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.setAttribute("active", true)
                    })
                    keyboard.ctrl = true
                }
                break;
            case "Win":
                if (li.getAttribute("active")) {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.removeAttribute("active")
                    })
                }
                else {
                    board_ul.querySelectorAll(`li[button=${li.getAttribute("button")}]`).forEach(el => {
                        el.setAttribute("active", true)
                    })
                }
                break;
            case "ArrowUp":
                strArr = str.substring(0, start).split('\n')
                console.log(strArr)
                if(strArr[strArr.length - 1] < strArr[strArr.length - 2]) {
                    a = strArr.pop().length
                    strArr.pop()
                    if (strArr == 0) start = 0
                    else start = strArr.join(" ").length - a + 1
                } else {
                    strArr.pop()
                    start = strArr.join(" ").length
                }
                textarea.selectionStart = start
                textarea.selectionEnd = start
                break;
            case "ArrowDown":
                strArr = str.substring(end).split('\n')
                if (strArr.length > 1){
                    a = Math.min(str.substring(0, start).split('\n').pop().length, strArr[1].length)
                    b = strArr[0].length
                    start += a + b + 1
                } else start = str.length
                textarea.selectionStart = start
                textarea.selectionEnd = start
                break;
            case "ArrowLeft":
                if (start != 0) start--
                textarea.selectionStart = start
                textarea.selectionEnd = start
                break;
            case "ArrowRight":
                if (start != str.length) start++
                textarea.selectionStart = start
                textarea.selectionEnd = start
                break;
            default:
                textarea.value = str.substring(0, start) + li.innerHTML + str.substring(end)
                textarea.selectionStart = start + 1
                textarea.selectionEnd = start + 1
                board_ul.querySelectorAll(`li[button=Alt], li[button=Control], li[button=Shift], li[button=Win]`).forEach(el => {
                    el.removeAttribute("active")
                })
                keyboard.alt = false
                keyboard.ctrl = false
                keyboard.shift = false
                refreshBoard()
                break;
        }
        textarea.focus()
    }

    board_ul.querySelectorAll("li").forEach(li => {
        li.addEventListener('click', activate(li))
    })
}

addEventListeners()

textarea.addEventListener('keydown', event => {
    if (!keyboard.getKeys().includes(event.key)) {
        if (keyboard.getKeys(caps=false).includes(event.key)) 
            keyboard.caps = false
        else if (keyboard.getKeys(caps=true).includes(event.key))
            keyboard.caps = true
        else if (keyboard.getKeys(shift=false).includes(event.key))
            keyboard.shift = true
        else if (keyboard.getKeys(shift=false).includes(event.key))
            keyboard.shift = true
        else if (keyboard.getKeys(false, false, keyboard.ru).includes(event.key)) {
            keyboard.shift = false
            keyboard.caps = false
            keyboard.lang = keyboard.ru
        } else if (keyboard.getKeys(false, true, keyboard.ru).includes(event.key)) {
            keyboard.shift = false
            keyboard.caps = true
            keyboard.lang = keyboard.ru
        } else if (keyboard.getKeys(false, true, keyboard.en).includes(event.key)) {
            keyboard.shift = false
            keyboard.caps = true
            keyboard.lang = keyboard.en
        } else if (keyboard.getKeys(false, false, keyboard.en).includes(event.key)) {
            keyboard.shift = false
            keyboard.caps = false
            keyboard.lang = keyboard.en
        }
        refreshBoard()
    }
    switch (event.key) {
        case "Shift":
            board_ul.querySelectorAll(`li[button=${event.key}]`).forEach(el => {
                el.setAttribute("active", true)
            })
            keyboard.shift = true
            refreshBoard()
            break;
        case "Tab":
            board_ul.querySelectorAll(`li[button=${event.key}]`).forEach(el => {
                el.setAttribute("active", true)
                setTimeout(() => {el.removeAttribute("active")}, 200)
            })
            str = textarea.value
            start = textarea.selectionStart
            end = textarea.selectionEnd
            textarea.value = str.substring(0, start) + "\t" + str.substring(end)
            textarea.selectionStart = start + 1
            textarea.selectionEnd = start + 1
            break;
        case " ":
            board_ul.querySelector(`li[button=Space]`).setAttribute("active", true)
        default:
            board_ul.querySelectorAll(`li`).forEach(el => {
                if(el.getAttribute("button") == event.key)
                    el.setAttribute("active", true)
            })
            break;
    }
})


textarea.addEventListener('keyup', event => {
    switch (event.key) {
        case "CapsLock":
            if (keyboard.caps) {
                board_ul.querySelector(`li[button=CapsLock]`).removeAttribute("active")
                keyboard.caps = false
            }
            else {
                board_ul.querySelector(`li[button=CapsLock]`).setAttribute("active", true)
                keyboard.caps = true
            }
            refreshBoard()
            break;
        case "Shift":
            if (event.altKey && !event.ctrlKey){
                keyboard.switchLang()
                board_ul.querySelectorAll(`li[button=Alt], li[button=Shift]`).forEach(el => {
                    el.removeAttribute("active")
                })
                keyboard.shift = false
                keyboard.alt = false
                refreshBoard()
                break
            }
            board_ul.querySelectorAll(`li[button=${event.key}]`).forEach(el => {
                el.removeAttribute("active")
            })
            keyboard.shift = false
            refreshBoard()
            break;
        case "Alt":
            if (event.shiftKey && !event.ctrlKey){
                keyboard.switchLang()
                board_ul.querySelectorAll(`li[button=Alt], li[button=Shift]`).forEach(el => {
                    el.removeAttribute("active")
                })
                keyboard.shift = false
                keyboard.alt = false
                refreshBoard()
                break
            }
            board_ul.querySelectorAll(`li[button=${event.key}]`).forEach(el => {
                el.removeAttribute("active")
            })
            keyboard.alt = false
            refreshBoard()
            break;
        case " ":
            board_ul.querySelector(`li[button=Space]`).removeAttribute("active")
        default:
            board_ul.querySelectorAll(`li`).forEach(el => {
                if(el.getAttribute("button") == event.key)
                    el.removeAttribute("active")
            })
            break;
    }
})

document.body.appendChild(board)