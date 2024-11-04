document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ripple')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const xrpData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('xrp-price').innerText = `$${xrpData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('xrp-pcp24hr').innerText = `${xrpData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('xrp-marketrank').innerText = xrpData.market_cap_rank;

      // Update the market cap
      document.getElementById('xrp-marketcap').innerText = `$${xrpData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('xrp-tolvol').innerText = `$${xrpData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('xrp-high24h').innerText = `$${xrpData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('xrp-low24h').innerText = `$${xrpData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('xrp-pc24hr').innerText = `$${xrpData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('xrp-mcc24h').innerText = `$${xrpData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('xrp-mccp24h').innerText = `${xrpData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('xrp-24hrchg').innerText = xrpData.total_volume / xrpData.market_cap;

      // Update the circulating supply
      document.getElementById('xrp-cs').innerText = xrpData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('xrp-ts').innerText = xrpData.total_supply ? xrpData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('xrp-ms').innerText = xrpData.max_supply ? xrpData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = xrpData.fully_diluted_valuation ? `$${xrpData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(xrpData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const xrpQuantityInput = document.getElementById('xrp-quantity');
  const xrpTotalValueDisplay = document.getElementById('xrp-total-value');
  let xrpPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ripple')
      .then(response => response.json())
      .then(data => {
          const xrpData = data[0];
          xrpPrice = xrpData.current_price;
          document.getElementById('xrp-price').innerText = `$${xrpPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  xrpQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(xrpQuantityInput.value) || 0;
      const totalValue = quantity * xrpPrice;
      xrpTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
