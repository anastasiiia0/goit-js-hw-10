import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayValue = Number(form.elements.delay.value);
  const state = [...stateInputs].find(input => input.checked).value ?? '';

  const makePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') resolve(delayValue);
      else reject(delayValue);
    }, delayValue);
  });

  makePromise
    .then(delay =>
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(delay =>
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );
});
