import axios from 'axios';

class AxiosService {

    sendRequest = (method, url, data, headers, params) => new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: data,
            headers: headers,
            params: params
            })
            .then((response) => {
                if (response.data){
                    resolve(response.data);
                }else{
                    reject({ errorMessage: 'Internet Error! API failed.' });
                }        
            })
            .catch((error) => {
                if (error.response) {
                    reject(error);
                }
            });
      })
}

const axiosService = new AxiosService();
    
export default axiosService;