import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submit = document.querySelector('.form');

submit.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldResolve) {
                    // Fulfill
                    resolve({ position, delay });
                } else {
                    // Reject
                    reject({ position, delay });
                };
            }, delay);
        })
        .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
};

function onFormSubmit(e) {
    e.preventDefault();

    let delay = Number(e.currentTarget.delay.value);
    const step = Number(e.currentTarget.step.value);
    const amount = Number(e.currentTarget.amount.value);

    for (let position = 0; position < amount; position += 1) {
        createPromise(position, delay)
            // .then(({ position, delay }) => {
            //     setTimeout(() => {
            //         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            //     }, delay);
            // })
            // .catch(({ position, delay }) => {
            //     setTimeout(() => {
            //         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            //     }, delay);
            // });
        delay += step;
    };
};