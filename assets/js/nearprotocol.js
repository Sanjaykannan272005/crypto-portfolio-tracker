document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=near')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const nearData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('near-price').innerText = `$${nearData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('near-pcp24hr').innerText = `${nearData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('near-marketrank').innerText = nearData.market_cap_rank;

      // Update the market cap
      document.getElementById('near-marketcap').innerText = `$${nearData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('near-tolvol').innerText = `$${nearData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('near-high24h').innerText = `$${nearData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('near-low24h').innerText = `$${nearData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('near-pc24hr').innerText = `$${nearData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('near-mcc24h').innerText = `$${nearData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('near-mccp24h').innerText = `${nearData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('near-24hrchg').innerText = nearData.total_volume / nearData.market_cap;

      // Update the circulating supply
      document.getElementById('near-cs').innerText = nearData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('near-ts').innerText = nearData.total_supply ? nearData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('near-ms').innerText = nearData.max_supply ? nearData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = nearData.fully_diluted_valuation ? `$${nearData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(nearData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const nearQuantityInput = document.getElementById('near-quantity');
  const nearTotalValueDisplay = document.getElementById('near-total-value');
  let nearPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=near')
      .then(response => response.json())
      .then(data => {
          const nearData = data[0];
          nearPrice = nearData.current_price;
          document.getElementById('near-price').innerText = `$${nearPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  nearQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(nearQuantityInput.value) || 0;
      const totalValue = quantity * nearPrice;
      nearTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
