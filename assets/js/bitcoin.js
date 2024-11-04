document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const btcData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('btc-price').innerText = `$${btcData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('btc-pcp24hr').innerText = `${btcData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('btc-marketrank').innerText = btcData.market_cap_rank;

      // Update the market cap
      document.getElementById('btc-marketcap').innerText = `$${btcData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('btc-tolvol').innerText = `$${btcData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('btc-high24h').innerText = `$${btcData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('btc-low24h').innerText = `$${btcData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('btc-pc24hr').innerText = `$${btcData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('btc-mcc24h').innerText = `$${btcData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('btc-mccp24h').innerText = `${btcData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('btc-24hrchg').innerText = btcData.total_volume / btcData.market_cap;

      // Update the circulating supply
      document.getElementById('btc-cs').innerText = btcData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('btc-ts').innerText = btcData.total_supply ? btcData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('btc-ms').innerText = btcData.max_supply ? btcData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = btcData.fully_diluted_valuation ? `$${btcData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(btcData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const btcQuantityInput = document.getElementById('btc-quantity');
  const btcTotalValueDisplay = document.getElementById('btc-total-value');
  let btcPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
      .then(response => response.json())
      .then(data => {
          const btcData = data[0];
          btcPrice = btcData.current_price;
          document.getElementById('btc-price').innerText = `$${btcPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  btcQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(btcQuantityInput.value) || 0;
      const totalValue = quantity * btcPrice;
      btcTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
