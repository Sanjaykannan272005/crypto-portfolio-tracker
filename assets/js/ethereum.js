document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const ethData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('eth-price').innerText = `$${ethData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('eth-pcp24hr').innerText = `${ethData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('eth-marketrank').innerText = ethData.market_cap_rank;

      // Update the market cap
      document.getElementById('eth-marketcap').innerText = `$${ethData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('eth-tolvol').innerText = `$${ethData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('eth-high24h').innerText = `$${ethData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('eth-low24h').innerText = `$${ethData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('eth-pc24hr').innerText = `$${ethData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('eth-mcc24h').innerText = `$${ethData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('eth-mccp24h').innerText = `${ethData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('eth-24hrchg').innerText = ethData.total_volume / ethData.market_cap;

      // Update the circulating supply
      document.getElementById('eth-cs').innerText = ethData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('eth-ts').innerText = ethData.total_supply ? ethData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('eth-ms').innerText = ethData.max_supply ? ethData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = ethData.fully_diluted_valuation ? `$${ethData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(ethData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const ethQuantityInput = document.getElementById('eth-quantity');
  const ethTotalValueDisplay = document.getElementById('eth-total-value');
  let ethPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
      .then(response => response.json())
      .then(data => {
          const ethData = data[0];
          ethPrice = ethData.current_price;
          document.getElementById('eth-price').innerText = `$${ethPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  ethQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(ethQuantityInput.value) || 0;
      const totalValue = quantity * ethPrice;
      ethTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
