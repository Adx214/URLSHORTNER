fetch('http://localhost:5050/logged', {
  method: 'GET',
  credentials: 'include' // This sends cookies and authentication headers
}).then(response => {
    return response.json(); // or response.text(), depending on expected format
  })
  .then(data => {
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error.message);
  });
