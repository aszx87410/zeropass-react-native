let data = {
  webSiteList: [
    'github.com',
    'gmail.com',
    'google.com',
    'yahoo.com',
    'facebook.com',
    'twitter.com',
  ],

  username: '',
  token: ''
}

let store = {
  getWebsiteList: () => {
    return data.webSiteList;
  },
  setUsername: (username) => {
    data.username = username;
  },

  setToken: (token) => {
    data.token = token;
  },

  getUsername: () => {
    return data.username
  },

  getToken: () => {
    return data.token;
  }

}
export default store;