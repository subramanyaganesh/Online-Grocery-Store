import React, { useEffect } from "react";
import HomeDashboard from "./components/pages/HomeDashboard/HomeDashboard";
import Cart from "./components/pages/Cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/pages/Account/Account";
import { useSelector } from "react-redux";
import { isEmpty } from "./lib/helpers";
import Login from "./components/pages/Login/Login";
import Order from "./components/pages/Cart/Order";



//Reading data from API
const App = () => {
  const { loggedInUserId } = useSelector((state) => state.authReducer);

  useEffect(() => {
    // getRequest();
    // handlePostRequest();
    
  }, []);

const getRequest = () => {
  const apiUrl = 'http://localhost:3001/user';
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        // setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
};

//Reading Data from API

//Posting data to API


const handlePostRequest = () => {
  const postData = {
    username: 'test',
    password: 'test',
    repassword: 'test',
    usertype: 'customer',
  };
  fetch('http://localhost:3001/register', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers as needed

    },
    body: JSON.stringify(postData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response, e.g., update state or perform other actions
      console.log('Response from server:', data);
    })
    .catch(error => {
      // Handle errors, e.g., display an error message
      console.error('Error making POST request:', error.message);
    });
};
//posting data to API


  const renderAuthorizedRouters = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<HomeDashboard />} />
      </Routes>
    </BrowserRouter>
  );

  const renderPublicRouter = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<HomeDashboard />} />
      </Routes>
    </BrowserRouter>
  );

  if (!isEmpty(loggedInUserId)) {
    return renderAuthorizedRouters();
  }

  return renderPublicRouter();
};

export default App;
