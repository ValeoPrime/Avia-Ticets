import ticketsUI from './../views/tickets';

class FavoritTikets {
  constructor(){
    this.favoriteTickets = []
  }
    

  renderFavoriteTikets(){
    changeShow()
    ticketsUI.renderTickets(this.favoriteTickets)


    const  removeFaforButtons = document.querySelectorAll('#removeFavor')

    removeFaforButtons.forEach(elem => {
      elem.addEventListener('click', () => {
        console.log('Клик по отозвать')
        favoritTikets.removeFaforite(elem.getAttribute('data-id'))
        // console.log('Родитель родителя кнопки', elem.parentNode.parentNode)
        // elem.parentNode.parentNode.parentNode.innerHTML = ''

        ticketsUI.renderTickets(this.favoriteTickets)
      })
    })
    
  }

  hideFavoriteTikets(){
    ticketsUI.clearContainer()
    changeShow()

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
        console.log('Билет после удаления',el)
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