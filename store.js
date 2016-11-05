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
  token: '',
  domains: [],
  password: '',
  id: ''
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
  },

  getDomains: () => {
    return data.domains;
  },

  setDomains: (domains) => {
    data.domains = domains;
  },

  getPassword: () => {
    return data.password;
  },

  setPassword: (password) => {
    data.password = password;
  },

  setId: (id) => {
    data.id = id;
  },

  getId: () => {
    return data.id;
  }

}
export default store;