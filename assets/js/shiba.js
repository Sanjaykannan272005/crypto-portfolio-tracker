document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=shiba')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const shibData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('shib-price').innerText = `$${shibData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('shib-pcp24hr').innerText = `${shibData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('shib-marketrank').innerText = shibData.market_cap_rank;

      // Update the market cap
      document.getElementById('shib-marketcap').innerText = `$${shibData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('shib-tolvol').innerText = `$${shibData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('shib-high24h').innerText = `$${shibData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('shib-low24h').innerText = `$${shibData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('shib-pc24hr').innerText = `$${shibData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('shib-mcc24h').innerText = `$${shibData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('shib-mccp24h').innerText = `${shibData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('shib-24hrchg').innerText = shibData.total_volume / shibData.market_cap;

      // Update the circulating supply
      document.getElementById('shib-cs').innerText = shibData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('shib-ts').innerText = shibData.total_supply ? shibData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('shib-ms').innerText = shibData.max_supply ? shibData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = shibData.fully_diluted_valuation ? `$${shibData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(shibData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const shibQuantityInput = document.getElementById('shib-quantity');
  const shibTotalValueDisplay = document.getElementById('shib-total-value');
  let shibPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=shiba')
      .then(response => response.json())
      .then(data => {
          const shibData = data[0];
          shibPrice = shibData.current_price;
          document.getElementById('shib-price').innerText = `$${shibPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  shibQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(shibQuantityInput.value) || 0;
      const totalValue = quantity * shibPrice;
      shibTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
