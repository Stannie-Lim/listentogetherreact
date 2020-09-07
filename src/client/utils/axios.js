import axios from 'axios'

export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
}

export const setAccessToken = (jwt) => {
  localStorage.setItem('accessToken', jwt)
}

export const setRefreshToken = (jwt) => {
  localStorage.setItem('refreshToken', jwt)
}

export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
}

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const AxiosHttpRequest = async (method, url, data) => {
  switch (method) {
    case 'GET':
      return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${await getAccessToken()}`
        }
      })
    case 'POST':
      return axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${await getAccessToken()}`,
        }
      })
    case 'DELETE':
      return axios.delete(url,
        {
          headers: {
            'Authorization': `Bearer ${await getAccessToken()}`
          },
          data
        })
    case 'PUT':
      return axios.put(url, data,
        {
          headers: {
            'Authorization': `Bearer ${await getAccessToken()}`
          }
        })
    default:
      alert('Not a valid method');
      break;
  }
}