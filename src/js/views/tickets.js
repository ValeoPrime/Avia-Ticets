import currencyUI from './currency';

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();
    console.log('МАССИВ БИЛЕТОВ',tickets)
    if (tickets.length == 0) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';
    const currency = this.getCurrencySymbol();
    
    tickets.forEach(ticket => {
      let inFavor = ticket.inFavor || false 
      ticket.id = ticket.id || Math.floor(Math.random() * 1000) 
      
      const template = TicketsUI.ticketTemplate(ticket, currency, ticket.id, inFavor);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
    return tickets

  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено/не добавлено.
    </div>
    `;
  }

  static ticketTemplate(ticket, currency, id, inFavor) {
    let hide = 'hide'
    let view = ''
    
    if(inFavor === true){
      hide = ''
      view = 'hide'
    } 
    
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${ticket.airline_name}</span
          >
          <button class="addFavor ${view}" id = "addFavor" data-id = '${id}'
          >Добавить в избранное</button
          >
          <button class="removeFavor ${hide} " id = "removeFavor" data-id = '${id}'
            >Убрать из избранного</button
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
      </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
