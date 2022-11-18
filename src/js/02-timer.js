import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector("button[data-start]");
btnStart.setAttribute("disabled", "");

const counterDays = document.querySelector("span[data-days]");
const counterHours = document.querySelector("span[data-hours]");
const counterMinutes = document.querySelector("span[data-minutes]");
const counterSeconds = document.querySelector("span[data-seconds]");
let numberOfDays = 0;
let numberOfHours = 0;
let numberOfMinutes = 0;
let numberOfSeconds = 0;


flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        //console.log(selectedDates[0]);
        const selectedDateInMs = new Date(selectedDates).getTime();
        if (selectedDateInMs < new Date().getTime()) {
            Notiflix.Notify.failure("Please choose a date in the future")
        } else {
            btnStart.removeAttribute("disabled");
            const selectedDateInMs = new Date(selectedDates).getTime();
            const difference = selectedDateInMs - new Date();
            
            numberOfDays = addLeadingZero(convertMs(difference).days)
            counterDays.textContent = numberOfDays;

            numberOfHours = addLeadingZero(convertMs(difference).hours)
            counterHours.textContent = numberOfHours;

            numberOfMinutes = addLeadingZero(convertMs(difference).minutes)
            counterMinutes.textContent = numberOfMinutes;
            
            numberOfSeconds = addLeadingZero(convertMs(difference).seconds)
            counterSeconds.textContent = numberOfSeconds;
            //console.log(convertMs(difference));
            // console.log(difference);
            // console.log(convertMs(difference));
            // console.log(convertMs(difference).seconds)
            //console.log(counterDays.value)
        }
    },
});

function addLeadingZero(value) {
    let result = value.toString().padStart(2,"0");
    return result;
}
    
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}


let DayId = null;
let HoursId = null;
let MinutesId = null;
let SecondsId = null;

btnStart.addEventListener("click", () => {
    DayId = setInterval(() => {
        numberOfDays = numberOfDays - 1;
        counterDays.textContent = numberOfDays;
    }, 86400000);
    HoursId = setInterval(() => {
        numberOfHours = numberOfHours - 1;
        counterHours.textContent = numberOfHours;
    }, 3600000);
    MinutesId = setInterval(() => {
        numberOfMinutes = numberOfMinutes - 1;
        counterMinutes.textContent = numberOfMinutes;
    }, 60000);
    SecondsId = setInterval(() => {
        numberOfSeconds = numberOfSeconds - 1;
        counterSeconds.textContent = numberOfSeconds;
    }, 1000);
    if (numberOfDays === 0 && numberOfHours === 0 && numberOfMinutes === 0 && numberOfSeconds === 0) {
        clearInterval(DayId);
        clearInterval(HoursId);
        clearInterval(MinutesId);
        clearInterval(SecondsId);
        console.log("Finished")
    } 
})