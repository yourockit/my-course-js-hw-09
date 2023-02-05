const ref = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

//----вариант 1

// let timerId = null;
// let isActive = false; //единократный вызов

// ref.btnStart.addEventListener('click', onbtnStart);
// ref.btnStop.addEventListener('click', onBtnStop);

// function onbtnStart() {
//     if (isActive) {
//         return;
//     };
//     timerId = setInterval(() => {
//         ref.body.style.backgroundColor = getRandomHexColor();
//     }, 1000);
//     isActive = true;
//     console.log('Интервал запущен');
// };

// function onBtnStop() {
//     clearInterval(timerId);
//     ref.body.removeAttribute('style');
//     isActive = false;
//     console.log('Интервал остановлен');
// };

//----вариант 2

class RandomBg {
    constructor() {
        this.intervalId = null;
    }
    start() {
        this.intervalId = setInterval(() => {
            ref.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
        ref.btnStart.disabled = true;
        console.log('Интервал запущен');
    }

    stop() {
        clearInterval(this.intervalId);
        ref.body.removeAttribute('style');
        ref.btnStart.disabled = false;
        console.log('Интервал остановлен');
    }
};

const randomBg = new RandomBg();

ref.btnStart.addEventListener('click', () => {
    randomBg.start();
});
ref.btnStop.addEventListener('click', () => {
    randomBg.stop();
});