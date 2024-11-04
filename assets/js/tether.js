document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const usdtData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('usdt-price').innerText = `$${usdtData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('usdt-pcp24hr').innerText = `${usdtData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('usdt-marketrank').innerText = usdtData.market_cap_rank;

      // Update the market cap
      document.getElementById('usdt-marketcap').innerText = `$${usdtData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('usdt-tolvol').innerText = `$${usdtData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('usdt-high24h').innerText = `$${usdtData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('usdt-low24h').innerText = `$${usdtData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('usdt-pc24hr').innerText = `$${usdtData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('usdt-mcc24h').innerText = `$${usdtData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('usdt-mccp24h').innerText = `${usdtData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('usdt-24hrchg').innerText = usdtData.total_volume / usdtData.market_cap;

      // Update the circulating supply
      document.getElementById('usdt-cs').innerText = usdtData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('usdt-ts').innerText = usdtData.total_supply ? usdtData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('usdt-ms').innerText = usdtData.max_supply ? usdtData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = usdtData.fully_diluted_valuation ? `$${usdtData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(usdtData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const usdtQuantityInput = document.getElementById('usdt-quantity');
  const usdtTotalValueDisplay = document.getElementById('usdt-total-value');
  let usdtPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether')
      .then(response => response.json())
      .then(data => {
          const usdtData = data[0];
          usdtPrice = usdtData.current_price;
          document.getElementById('usdt-price').innerText = `$${usdtPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  usdtQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(usdtQuantityInput.value) || 0;
      const totalValue = quantity * usdtPrice;
      ethTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
