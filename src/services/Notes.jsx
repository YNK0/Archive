import axios from "axios";

const baseUrl = 'https://backend2-oime.onrender.com/api/notes'  // URL de la API


const getAll = () => {
    const request = axios.get(baseUrl)
    const noExist = {
        id: 10000,
        content: 'Esta nota no existe',
        important: true,
    }
    return request.then(response => response.data.concat(noExist))
    }

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { getAll, create, update }