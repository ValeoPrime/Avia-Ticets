import ticketsUI from './../views/tickets';
import formUI from '../views/form';

class FavoritTikets {
  constructor(){
    this.favoriteTickets = []
  }
    

  renderFavoriteTikets(){
    changeShow()
    ticketsUI.renderTickets(this.favoriteTickets)
    
    document.addEventListener('click', (event) => {
      event.preventDefault()
      if(event.target.id == 'removeFavor'){
        favoritTikets.removeFaforite(event.target.getAttribute('data-id'))
        ticketsUI.renderTickets(this.favoriteTickets)
      }

    })


    // const  removeFaforButtons = document.querySelectorAll('#removeFavor')

    // removeFaforButtons.forEach(elem => {
    //   elem.addEventListener('click', () => {
        
    //     favoritTikets.removeFaforite(elem.getAttribute('data-id'))
        

    //     ticketsUI.renderTickets(this.favoriteTickets)
    //   })
    // })
    
  }

  hideFavoriteTikets(){
    ticketsUI.clearContainer()
    changeShow()

    formUI.origin.value  = ''
    
    formUI.destination.value  = '';
    
    formUI.depart.value  = '',
   
    formUI.return.value  = ''
   

  }

  addFavorite(favorTicket){
    favorTicket.inFavor = true
    this.favoriteTickets.push(favorTicket)
    console.log('Массив избранных',this.favoriteTickets)
    return this.favoriteTickets
  }

  removeFaforite(id){
    this.favoriteTickets.forEach(el => {
      if(el.id == id){
        el.inFavor = false
        this.favoriteTickets.splice(this.favoriteTickets.indexOf(el), 1)
      }
    })
    console.log('Массив после удаления',this.favoriteTickets)

    return this.favoriteTickets
    
  }
}

function changeShow() {
  const form = document.querySelector('.form-section')
  const favorButton = document.querySelector('#favor')
  const returnButton = document.querySelector('#return')
  form.classList.toggle('hide')
  favorButton.classList.toggle('hide')
  returnButton.classList.toggle('hide')
}

const favoritTikets = new FavoritTikets

export default favoritTikets