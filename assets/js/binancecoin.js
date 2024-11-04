document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const bnbData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('bnb-price').innerText = `$${bnbData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('bnb-pcp24hr').innerText = `${bnbData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('bnb-marketrank').innerText = bnbData.market_cap_rank;

      // Update the market cap
      document.getElementById('bnb-marketcap').innerText = `$${bnbData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('bnb-tolvol').innerText = `$${bnbData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('bnb-high24h').innerText = `$${bnbData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('bnb-low24h').innerText = `$${bnbData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('bnb-pc24hr').innerText = `$${bnbData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('bnb-mcc24h').innerText = `$${bnbData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('bnb-mccp24h').innerText = `${bnbData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('bnb-24hrchg').innerText = bnbData.total_volume / bnbData.market_cap;

      // Update the circulating supply
      document.getElementById('bnb-cs').innerText = bnbData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('bnb-ts').innerText = bnbData.total_supply ? bnbData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('bnb-ms').innerText = bnbData.max_supply ? bnbData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = bnbData.fully_diluted_valuation ? `$${bnbData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(bnbData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const bnbQuantityInput = document.getElementById('bnb-quantity');
  const bnbTotalValueDisplay = document.getElementById('bnb-total-value');
  let bnbPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin')
      .then(response => response.json())
      .then(data => {
          const bnbData = data[0];
          bnbPrice = bnbData.current_price;
          document.getElementById('bnb-price').innerText = `$${bnbPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  bnbQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(bnbQuantityInput.value) || 0;
      const totalValue = quantity * bnbPrice;
      bnbTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
