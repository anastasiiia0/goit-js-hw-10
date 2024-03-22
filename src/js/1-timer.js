import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const flatpickrObj = flatpickr('#datetime-picker', options);
const startBtn = document.querySelector('button[data-start');
startBtn.setAttribute('disabled', true);
const flatpickrInput = document.querySelector('#datetime-picker');

const daysValue = document.querySelector('.value[data-days]');
const hoursValue = document.querySelector('.value[data-hours]');
const minutesValue = document.querySelector('.value[data-minutes]');
const secondsValue = document.querySelector('.value[data-seconds]');

let userSelectedDate = null;

flatpickrInput.addEventListener('change', () => {
  const selectedDate = flatpickrObj.selectedDates[0];

  if (selectedDate < new Date()) {
    iziToast.error({
      color: 'red',
      message: 'Please choose a date in the future.',
      position: 'topRight',
    });
    startBtn.setAttribute('disabled', true);
  } else {
    startBtn.removeAttribute('disabled');
    userSelectedDate = selectedDate;
    console.log(userSelectedDate);
  }
});

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  flatpickrInput.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    const datesDifference = userSelectedDate.getTime() - Date.now();

    if (datesDifference <= 0) {
      clearInterval(intervalId);
      startBtn.removeAttribute('disabled');
      flatpickrInput.removeAttribute('disabled');

      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(datesDifference);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000);
});

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
