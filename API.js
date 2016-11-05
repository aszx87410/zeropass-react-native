const API_URL = {
    'createUser': 'http://122.11.130.91/api/v1/users',
    'update': 'http://122.11.130.91/api/v1/users',
    'login': 'http://122.11.130.91/api/v1/users/login',
    'getInfo': 'http://122.11.130.91/api/v1/users',
    'search': 'http://122.11.130.91/api/v1/domains'
}

const API = {
  getDomains: async function(text) {
    let response = await fetch(`${API_URL.search}/${text}`);
    let json = await response.json();

    if(json && json.domains) {
      return json.domains;
    } else {
      return [];
    }
  },

  createUser: async function(username, password) {
    let response = await fetch(`${API_URL.createUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    let json = {};
    try{
      json = await response.json();
    } catch(err) {
      json = {
        response
      }
    }

    return json;
  },

  login: async function(username, password) {
    let response = await fetch(`${API_URL.login}/${username}/${password}`);

    let json = response.json();
    return json;
  },

  getInfo: async function(uid) {

    let response = await fetch(`${API_URL.getInfo}/${uid}`);
    let json = await response.json();
    try {

      if(json.domains) {
        let domains = [];
        for(let key in json.domains) {
          domains.push(json.domains[key]);
        }
        json.domains = domains;
        console.log(domains);
      }
      
    } catch(err) {
      console.log(err);
    }
    console.log('json', json);
    return json;
  },

  update: async function(uid, domainname, changeID, username, domainid) {

    const jsonBody = {
        domainname,
        changeID,
        username,
    };
    if(domainid) {
      jsonBody.domainid = domainid;
    }

    let response = await fetch(`${API_URL.update}/${uid}/domains`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonBody)
    });

    let json = response.json();
    return json;
  }
}

export default API;