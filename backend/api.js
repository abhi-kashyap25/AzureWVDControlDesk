const axios = require('axios');
const getAuthToken = require('./auth');

async function callAzureAPI() {
  const token = await getAuthToken();

  const response = await axios.get('https://management.azure.com/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name>?api-version=2021-02-01', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);
}

callAzureAPI();