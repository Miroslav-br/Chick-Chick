import { initReserve } from "./modules/initReserve.js";
import { initService } from "./modules/initService.js";
import { initSlider } from "./modules/initSlider.js";



export const init = () => {
  initSlider();
  initService();
  initReserve();
}
