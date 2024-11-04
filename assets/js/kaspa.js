document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=kaspa')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const kasData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('kas-price').innerText = `$${kasData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('kas-pcp24hr').innerText = `${kasData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('kas-marketrank').innerText = kasData.market_cap_rank;

      // Update the market cap
      document.getElementById('kas-marketcap').innerText = `$${kasData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('kas-tolvol').innerText = `$${kasData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('kas-high24h').innerText = `$${kasData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('kas-low24h').innerText = `$${kasData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('kas-pc24hr').innerText = `$${kasData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('kas-mcc24h').innerText = `$${kasData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('kas-mccp24h').innerText = `${kasData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('kas-24hrchg').innerText = kasData.total_volume / kasData.market_cap;

      // Update the circulating supply
      document.getElementById('kas-cs').innerText = kasData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('kas-ts').innerText = kasData.total_supply ? kasData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('kas-ms').innerText = kasData.max_supply ? kasData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = kasData.fully_diluted_valuation ? `$${kasData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(kasData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const kasQuantityInput = document.getElementById('kas-quantity');
  const kasTotalValueDisplay = document.getElementById('kas-total-value');
  let kasPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=kaspa')
      .then(response => response.json())
      .then(data => {
          const kasData = data[0];
          kasPrice = kasData.current_price;
          document.getElementById('kas-price').innerText = `$${kasPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  kasQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(kasQuantityInput.value) || 0;
      const totalValue = quantity * kasPrice;
      kasTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
