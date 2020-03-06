import '../style/style.css';
import './plugins';
import locations from './store/locations';
import favoritTikets from './store/favoriteTikets';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const favorButton = document.querySelector('#favor')
  const returnButton = document.querySelector('#return')
  

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  
  favorButton.addEventListener('click', favoritTikets.renderFavoriteTikets.bind(favoritTikets) ) 
  returnButton.addEventListener('click', favoritTikets.hideFavoriteTikets )
  

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
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
    
    ticketsUI.renderTickets(locations.lastSearch);

    let showTickets = ticketsUI.renderTickets(locations.lastSearch);
    

    const addFaforButtons = document.querySelectorAll('#addFavor')
    const  removeFaforButtons = document.querySelectorAll('#removeFavor')

    addFaforButtons.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        elem.classList.toggle('hide')
        removeFaforButtons[i].classList.toggle('hide')
        
        let favorTicket = showTickets.find(el => el.id == elem.getAttribute('data-id'))
        favoritTikets.addFavorite(favorTicket)
      })
      
    })

    removeFaforButtons.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        elem.classList.toggle('hide')
        addFaforButtons[i].classList.toggle('hide')

        favoritTikets.removeFaforite(elem.getAttribute('data-id'))
      })
      
    })

  }
});




