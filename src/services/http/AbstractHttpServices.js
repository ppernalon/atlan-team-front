import axios from 'axios'

const API_URL = 'https://atlanteam.herokuapp.com:8080'

export default class AbstractHttpServices {

    static buildPath(){
        return API_URL
    }

    static getHttp(URL) {
        return axios.get(this.buildPath() + URL)
    }

    static postHttp(URL, body){
        return axios.post(this.buildPath() + URL, body)
    }

    static putHttp(URL, body){
        return axios.put(this.buildPath() + URL, body)
    }

    static deleteHttp(URL, body){
        return axios.delete(this.buildPath() + URL, { data: body })
    }
}
