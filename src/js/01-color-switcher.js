const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
stopBtn.setAttribute("disabled", "");
const body = document.querySelector("body");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null

startBtn.addEventListener("click", () => {
    startBtn.setAttribute("disabled", "");
    stopBtn.removeAttribute("disabled");
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
})

stopBtn.addEventListener("click", () => {
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "");
    clearInterval(timerId);
})







//window.addEventListener("load", changeColor);
