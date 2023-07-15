// import config from 'config'; deshabilitado por egr
// import { fetchWrapper } from '@/_helpers';
import { fetchWrapper } from '_helpers';

const config = JSON.stringify({
    apiUrl: 'http://localhost:4000'}) // por egr puede ser 3000?

const baseUrl = `${config.apiUrl}/users`;

/* eslint-disable */
export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
/* eslint-enable */

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
/* eslint-disable */
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
/* eslint-disable */
