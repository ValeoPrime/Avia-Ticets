import '../style/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;


  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
    
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    console.log('ОТПРАВКА ИЗ', formUI.originValue)
    const origin = locations.getCityCodeByKey(formUI.originValue);
    console.log('ПРИБЫТИЕ В', formUI.destinationValue)
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    console.log(locations)
    ticketsUI.renderTickets(locations.lastSearch);
    
  }
});


