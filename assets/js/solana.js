document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const solData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('sol-price').innerText = `$${solData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('sol-pcp24hr').innerText = `${solData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('sol-marketrank').innerText = solData.market_cap_rank;

      // Update the market cap
      document.getElementById('sol-marketcap').innerText = `$${solData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('sol-tolvol').innerText = `$${solData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('sol-high24h').innerText = `$${solData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('sol-low24h').innerText = `$${solData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('sol-pc24hr').innerText = `$${solData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('sol-mcc24h').innerText = `$${solData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('sol-mccp24h').innerText = `${solData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('sol-24hrchg').innerText = solData.total_volume / solData.market_cap;

      // Update the circulating supply
      document.getElementById('sol-cs').innerText = solData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('sol-ts').innerText = solData.total_supply ? solData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('sol-ms').innerText = solData.max_supply ? solData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = solData.fully_diluted_valuation ? `$${solData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(solData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const solQuantityInput = document.getElementById('sol-quantity');
  const solTotalValueDisplay = document.getElementById('sol-total-value');
  let solPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana')
      .then(response => response.json())
      .then(data => {
          const solData = data[0];
          solPrice = solData.current_price;
          document.getElementById('sol-price').innerText = `$${solPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  solQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(solQuantityInput.value) || 0;
      const totalValue = quantity * solPrice;
      solTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
