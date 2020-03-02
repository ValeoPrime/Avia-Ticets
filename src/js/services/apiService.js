import axios from 'axios'
import config from '../config/apiConfig'


/**
 * /countries - array of countries
 * /cities - array of cities
 * /prices/cheap - array
 */

class Api {
    constructor(config) {
        this.url = config.url
    }

     async countries(){
        return getData(this.url)
    }

    async cities(){
        return getData(this.url)
    }

    prices(params){

    }


}

async function getData (url) {
    try{
        const response = await axios.get(`${url}/cities`)
        return Promise.resolve(response)
    } catch (err) {
        return Promise.reject(err)
    }
}


const api = new Api(config)

export default api