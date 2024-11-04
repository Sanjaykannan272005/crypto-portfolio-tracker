document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dogecoin')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const dogeData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('doge-price').innerText = `$${dogeData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('doge-pcp24hr').innerText = `${dogeData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('doge-marketrank').innerText = dogeData.market_cap_rank;

      // Update the market cap
      document.getElementById('doge-marketcap').innerText = `$${dogeData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('doge-tolvol').innerText = `$${dogeData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('doge-high24h').innerText = `$${dogeData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('doge-low24h').innerText = `$${dogeData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('doge-pc24hr').innerText = `$${dogeData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('doge-mcc24h').innerText = `$${dogeData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('doge-mccp24h').innerText = `${dogeData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('doge-24hrchg').innerText = dogeData.total_volume / dogeData.market_cap;

      // Update the circulating supply
      document.getElementById('doge-cs').innerText = dogeData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('doge-ts').innerText = dogeData.total_supply ? dogeData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('doge-ms').innerText = dogeData.max_supply ? dogeData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = dogeData.fully_diluted_valuation ? `$${dogeData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(dogeData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const dogeQuantityInput = document.getElementById('doge-quantity');
  const dogeTotalValueDisplay = document.getElementById('doge-total-value');
  let dogePrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dogecoin')
      .then(response => response.json())
      .then(data => {
          const dogeData = data[0];
          dogePrice = dogeData.current_price;
          document.getElementById('doge-price').innerText = `$${dogePrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  dogeQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(dogeQuantityInput.value) || 0;
      const totalValue = quantity * dogePrice;
      dogeTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
