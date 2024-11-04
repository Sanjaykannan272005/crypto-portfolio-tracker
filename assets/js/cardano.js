document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cardano')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const adaData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('ada-price').innerText = `$${adaData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('ada-pcp24hr').innerText = `${adaData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('ada-marketrank').innerText = adaData.market_cap_rank;

      // Update the market cap
      document.getElementById('ada-marketcap').innerText = `$${adaData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('ada-tolvol').innerText = `$${adaData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('ada-high24h').innerText = `$${adaData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('ada-low24h').innerText = `$${adaData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('ada-pc24hr').innerText = `$${adaData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('ada-mcc24h').innerText = `$${adaData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('ada-mccp24h').innerText = `${adaData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('ada-24hrchg').innerText = adaData.total_volume / adaData.market_cap;

      // Update the circulating supply
      document.getElementById('ada-cs').innerText = adaData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('ada-ts').innerText = adaData.total_supply ? adaData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('ada-ms').innerText = adaData.max_supply ? adaData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = adaData.fully_diluted_valuation ? `$${adaData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(adaData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const adaQuantityInput = document.getElementById('ada-quantity');
  const adaTotalValueDisplay = document.getElementById('ada-total-value');
  let adaPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cardona')
      .then(response => response.json())
      .then(data => {
          const adaData = data[0];
          adaPrice = adaData.current_price;
          document.getElementById('ada-price').innerText = `$${adaPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  adaQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(adaQuantityInput.value) || 0;
      const totalValue = quantity * adaPrice;
      adaTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
