import { addPreload, removePreload } from "./Preload.js";
import API_URL from "./API_URL.js"

const renderService = (wrapper, data) => {
  const labels = data.map(item => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
    <input type="radio" class="radio__input" name="service" value="${item.id}" >
    <span class="radio__label">${item.name}</span>`;

    return label;
  })

  wrapper.append(...labels);
}


export const initService = () => {
  const priceList = document.querySelector('.price__list');
  
  const fieldService = document.getElementsByName('fieldservice')[0];
  
  addPreload(priceList, fieldService);
  
  fetch(`${API_URL}api`)
  .then( response => response.json())
  .then(datas => {
      datas.forEach(data => {
        priceList.append(createPriceListItem(data));
      });
      return datas;
    })
    .then( datas => {
      renderService(fieldService, datas);
      removePreload(priceList, fieldService);
    })
}
function createPriceListItem(data) {
  console.log(data);
  const priceItem = document.createElement('li');
  priceItem.className = 'price__item';

  const priceDescription = document.createElement('span');
  priceDescription.className = 'price__item-title';
  priceDescription.textContent = data?.name;
  const price = document.createElement('span');
  price.className = 'price__item-count';
  price.textContent = data?.price;
  priceItem.append(priceDescription,price);

  return priceItem;
}