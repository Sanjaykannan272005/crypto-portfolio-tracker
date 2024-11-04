// Define the API URL and options
const url = 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=GAINERS&country=in&language=en';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '8a6174d007msha6372db092b162bp1fcc24jsn0217de2eba2c', // Use your actual API key
        'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
    }
};
async function fetchData() {
    try {
        const response = await fetch(url, options);
        const jsonResponse = await response.json();  // Parse response as JSON
        
        console.log('API Response:', jsonResponse);  // Log the entire API response

        // Access the trends data within the data object
        if (jsonResponse && jsonResponse.data && jsonResponse.data.trends) {
            const trends = jsonResponse.data.trends;

            trends.forEach((stock, index) => {
                // Check if the elements exist before updating their content
                const nameElement = document.getElementById(`${index + 1}-name`);
                const symbolElement = document.getElementById(`${index + 1}-symbol`);
                const priceElement = document.getElementById(`${index + 1}-price`);
                const changeElement = document.getElementById(`${index + 1}-change`);
                const change_percentElement = document.getElementById(`${index + 1}-changein%`);

                
                if (nameElement && priceElement && changeElement && symbolElement && change_percentElement) {
                    nameElement.innerText = stock.name;
                    priceElement.innerText = stock.price;
                    changeElement.innerText = stock.change;
                    symbolElement.innerText = stock.symbol;
                    change_percentElement.innerText = stock.change_percent;


                } else {
                    console.warn(`Element not found for row ${index + 1}`);
                }
            });
        } else {
            console.error('No trends data found in the response. Check the API response structure.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch and display the data
fetchData();
