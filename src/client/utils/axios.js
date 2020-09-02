import axios from 'axios'

export const getJwt = () => {
  return localStorage.getItem('accessToken')
}

export const getUserId = () => {
  return localStorage.getItem('userId');
}

export const setJwt = (jwt) => {
  localStorage.setItem('accessToken', jwt)
}

export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
}

export const removeJwt = () => {
  localStorage.removeItem('accessToken')
}

export const AxiosHttpRequest = async (method, url, data) => {
  switch (method) {
    case 'GET':
      return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${await getJwt()}`
        }
      })
    case 'POST':
      return axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${await getJwt()}`,
        }
      })
    case 'DELETE':
      return axios.delete(url,
        {
          headers: {
            'Authorization': `Bearer ${await getJwt()}`
          },
          data
        })
    case 'PUT':
      return axios.put(url, data,
        {
          headers: {
            'Authorization': `Bearer ${await getJwt()}`
          }
        })
    default:
      alert('Not a valid method');
      break;
  }
}