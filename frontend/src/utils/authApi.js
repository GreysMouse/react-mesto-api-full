class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register({email, password}) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    }).then(this._checkResponse);
  }

  authorize({password, email}) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    }).then(this._checkResponse);
  }
  
  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    }).then(this._checkResponse);
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co'
});

export default authApi;