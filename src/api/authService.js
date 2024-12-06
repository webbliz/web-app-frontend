const API_URL = "http://localhost:3000/auth";


const isLoggedIn = () => {
    return sessionStorage.getItem("user") ? true : false;
  }

const authHeader = () => {
    var user = null;
    if(isLoggedIn()) {
    user = JSON.parse(sessionStorage.getItem('user'));
    }

    if (user && user?.token) {
        cconsole.log("user: ", user);
        return { Authorization: 'Bearer ' + user.token };
    } else {
        console.log("Unauthorized");
    }
}


const login = async (email, password) => { 
    await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response body
      }).then((data) => {
        if(data.token) {
            sessionStorage.setItem("user", JSON.stringify(data))
        }
        return data
    })
  }
  
  const registerUser = async (user) => {
    const response = await fetch(`${API_URL}/register`)
  }

  
  export default {
    login,
    registerUser,
    isLoggedIn,
    authHeader,
  }