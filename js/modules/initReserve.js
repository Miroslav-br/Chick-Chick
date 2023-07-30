import { addPreload, removePreload } from "./Preload.js";
import API_URL from "./API_URL.js"

const addDisabled = (arr) => {
  arr.forEach(elem => {
    elem.disabled = true;
  })
} 

const removeDisabled = (arr) => {
  arr.forEach(elem => {
    elem.disabled = false;
  })
}

const renderSpec = (wrapper, data) => {
  const labels = data.map(item => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
    <input type="radio" class="radio__input" name="spec" value="${item.id}" >
    <span class="radio__label radio__label-spec" style="--bg-image: url(${API_URL}${item.img})">${item.name}</span>`;

    return label;
  })
  wrapper.append(...labels);
}

const renderMonth = (wrapper, data) => {
  const labels = data.map(item => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
    <input type="radio" class="radio__input" name="month" value="${item}">
    <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {month: 'long'}).format(new Date(item))}</span>`;

    return label;
  })

  wrapper.append(...labels);
}

const renderDay = (wrapper, data, month) => {
  const labels = data.map(item => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
    <input type="radio" class="radio__input" name="day" value="${item}" >
    <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {month: 'long', day: 'numeric'}).format(new Date(`${month}/${item}`))}</span>`;

    return label;
  })

  wrapper.append(...labels);
}

const renderTime = (wrapper, data) => {
  const labels = data.map(item => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
    <input type="radio" class="radio__input" name="time" value="${item}" >
    <span class="radio__label">${item}</span>`;

    return label;
  })

  wrapper.append(...labels);
}







export const initReserve = () => {
  const reserveForm = document.querySelector('.reserve__form');

  const {fieldService,fieldspec, fielddata, fieldmonth, fieldday, fieldtime, btn} = reserveForm;

  addDisabled([fieldspec, fielddata, fieldmonth, fieldday, fieldtime, btn])

  
  reserveForm.addEventListener('change', async (event) => {
    const {target} = event;
    
    if(target.name === 'service'){
      fieldspec.innerHTML = '<legend class="reserve__legend">специалист</legend>';
      addPreload(fieldspec);
      
      const data = await (await fetch(`${API_URL}api/?service=${target.value}`)).json();
      
      renderSpec(fieldspec, data);
      removeDisabled([fieldspec]);
      removePreload(fieldspec);
    }

    if(target.name === 'spec'){
      fieldmonth.innerHTML = '';
      addPreload(fieldmonth);

      const data = await (await fetch(`${API_URL}api/?spec=${target.value}`)).json();
      
      renderMonth(fieldmonth, data);
      removeDisabled([fielddata,fieldmonth]);
      removePreload(fielddata, fieldmonth);
    }

    if(target.name === 'month'){
      fieldday.innerHTML = '';
      addPreload(fieldday);

      const data = await (await fetch(`${API_URL}api/?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}`)).json();

      console.log(reserveForm.spec.value);
      console.log(target);
      
      renderDay(fieldday, data, reserveForm.month.value);
      removeDisabled([fieldday]);
      removePreload(fieldday);
    }

    if(target.name === 'day'){
      fieldtime.innerHTML = '';
      addPreload(fieldtime);

      console.log(target);

      const data = await (await fetch(`${API_URL}api/?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}&day=${reserveForm.day.value}`)).json();

      console.log(reserveForm.spec.value);
      console.log(target);
      
      renderTime(fieldtime, data);
      removeDisabled([fieldtime]);
      removePreload(fieldtime);
    }    

    if(target.name === 'time'){
      removeDisabled([btn])
    }
  });

  reserveForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(reserveForm);
    const jsonData = JSON.stringify(Object.fromEntries(formData));

    const response = await fetch(`${API_URL}api/order`, {
      method: 'POST',
      body: jsonData,
    });

    const data = await response.json();
  
    addDisabled([fieldspec, fieldmonth, fielddata, fieldday, fieldtime, btn])
  
    const thanks = document.createElement('p');
    thanks.textContent = `Спасибо за бронь № ${data.id}
    Ждем вам в ${new Intl.DateTimeFormat('ru-RU', {
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${data.month}/${data.day}`))}
    Время ${data.time}`;

    alert(`
    Спасибо за бронь № ${data.id}
    Ждем вас ${new Intl.DateTimeFormat('ru-RU', {
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${data.month}/${data.day}`))}
    Время ${data.time}`);
  })
}