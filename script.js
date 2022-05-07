let keys = []

keys = ["Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", "Del", "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "ArrowUp", "Shift", "Ctrl", "Win", "Alt", "Space", "Alt", "Win", "ArrowLeft", "ArrowDown", "ArrowRight", "Ctrl"]

const keyboard = document.createElement('div')
keyboard.id = "keyboard"

keyboard.insertAdjacentHTML("beforeend", '<ul id="keyboard__ul"></ul>')

const keyboard_ul = keyboard.firstChild

keys.forEach(k => {
    keyboard_ul.insertAdjacentHTML("beforeend", `<li class="keyboard__ul__li key_${k.toLowerCase().replace(" ", "_")}">${k}</li>`)
})

document.body.appendChild(keyboard)

keyboard_ul.querySelectorAll(".key_win").forEach(k => k.innerHTML = '<i class="fa fa-windows" aria-hidden="true"></i>')
keyboard_ul.querySelector(".key_arrowup").innerHTML = '<i class="fa fa-caret-up" aria-hidden="true"></i>'
keyboard_ul.querySelector(".key_arrowdown").innerHTML = '<i class="fa fa-caret-down" aria-hidden="true"></i>'
keyboard_ul.querySelector(".key_arrowleft").innerHTML = '<i class="fa fa-caret-left" aria-hidden="true"></i>'
keyboard_ul.querySelector(".key_arrowright").innerHTML = '<i class="fa fa-caret-right" aria-hidden="true"></i>'
keyboard_ul.querySelector(".key_capslock").innerHTML = "Caps Lock"

keyboard_ul.querySelectorAll("li").forEach(li => {
    li.addEventListener('mousedown', function(event){
        li.classList.add("active")
    })
    li.addEventListener('mouseup', function(event){
        li.classList.remove("active")
        document.querySelector("textarea").value += li.innerHTML
    })
})