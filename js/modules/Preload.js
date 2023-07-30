const addPreload = (...elements) => {
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.add('preload');
  }
}

const removePreload = (...elements) => {
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove('preload');
  }
}

export {addPreload, removePreload};