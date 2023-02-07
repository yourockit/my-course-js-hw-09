import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    inputUserData: document.querySelector('#datetime-picker'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

let targetTime = null;

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutescomponents
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

const options = {
    enableTime: true,
    time_24hr: true,
    // defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] <= Date.now()) {
            Notify.failure("Please choose a date in the future");
        } else {
            refs.btnStart.disabled = false;
            targetTime = selectedDates[0].getTime();
            console.log(targetTime);
            console.log(Date.now());
        };
    },
};

class Timer {
    constructor() {
        this.timerId = null;
        refs.btnStart.disabled = true;
    }

    start() {
        const timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetTime - currentTime;
            const timerComponents = convertMs(deltaTime);
            this.updateTimerComponents(timerComponents);
            if (deltaTime <= 1000) {
                clearInterval(timerId);
                Notify.success('Ok');
            };
        }, 1000);

    }
    updateTimerComponents({ days, hours, minutes, seconds }) {
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;
    }
};

const timer = new Timer();

flatpickr(refs.inputUserData, options);

refs.btnStart.addEventListener('click', () => {
    timer.start();
    refs.btnStart.disabled = true;
});