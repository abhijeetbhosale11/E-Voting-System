import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegistrationService() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the URL you want to make a GET request to
    const apiUrl = 'http://localhost:8002/voter/register';

    // Make the GET request using Axios
    axios.get(apiUrl)
      .then((response) => {
        // Handle the successful response here
        setData(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once on component mount

  return (
    <div>
      <h2>Registration Service</h2>
      {data ? (
        <div>
          <h3>Data Retrieved:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default RegistrationService;
