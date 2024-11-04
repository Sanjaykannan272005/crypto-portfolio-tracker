document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tron')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const trxData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('trx-price').innerText = `$${trxData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('trx-pcp24hr').innerText = `${trxData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('trx-marketrank').innerText = trxData.market_cap_rank;

      // Update the market cap
      document.getElementById('trx-marketcap').innerText = `$${trxData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('trx-tolvol').innerText = `$${trxData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('trx-high24h').innerText = `$${trxData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('trx-low24h').innerText = `$${trxData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('trx-pc24hr').innerText = `$${trxData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('trx-mcc24h').innerText = `$${trxData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('trx-mccp24h').innerText = `${trxData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('trx-24hrchg').innerText = trxData.total_volume / trxData.market_cap;

      // Update the circulating supply
      document.getElementById('trx-cs').innerText = trxData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('trx-ts').innerText = trxData.total_supply ? trxData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('trx-ms').innerText = trxData.max_supply ? trxData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = trxData.fully_diluted_valuation ? `$${trxData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(trxData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const trxQuantityInput = document.getElementById('trx-quantity');
  const trxTotalValueDisplay = document.getElementById('trx-total-value');
  let trxPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tron')
      .then(response => response.json())
      .then(data => {
          const trxData = data[0];
          trxPrice = trxData.current_price;
          document.getElementById('trx-price').innerText = `$${trxPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  trxQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(trxQuantityInput.value) || 0;
      const totalValue = quantity * trxPrice;
      trxTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
