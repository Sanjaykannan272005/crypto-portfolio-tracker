document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=litecoin')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const ltcData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('ltc-price').innerText = `$${ltcData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('ltc-pcp24hr').innerText = `${ltcData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('ltc-marketrank').innerText = ltcData.market_cap_rank;

      // Update the market cap
      document.getElementById('ltc-marketcap').innerText = `$${ltcData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('ltc-tolvol').innerText = `$${ltcData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('ltc-high24h').innerText = `$${ltcData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('ltc-low24h').innerText = `$${ltcData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('ltc-pc24hr').innerText = `$${ltcData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('ltc-mcc24h').innerText = `$${ltcData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('ltc-mccp24h').innerText = `${ltcData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('ltc-24hrchg').innerText = ltcData.total_volume / ltcData.market_cap;

      // Update the circulating supply
      document.getElementById('ltc-cs').innerText = ltcData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('ltc-ts').innerText = ltcData.total_supply ? ltcData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('ltc-ms').innerText = ltcData.max_supply ? ltcData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = ltcData.fully_diluted_valuation ? `$${ltcData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(ltcData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const ltcQuantityInput = document.getElementById('ltc-quantity');
  const ltcTotalValueDisplay = document.getElementById('ltc-total-value');
  let ltcPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=litecoin')
      .then(response => response.json())
      .then(data => {
          const ltcData = data[0];
          ltcPrice = ltcData.current_price;
          document.getElementById('ltc-price').innerText = `$${ltcPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  ltcQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(ltcQuantityInput.value) || 0;
      const totalValue = quantity * ltcPrice;
      ltcTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
