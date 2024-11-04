document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the CoinGecko API
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=chainlink')
    .then(response => response.json())
    .then(data => {
      // Log the data to verify the structure
      console.log(data);

      // Update the HTML elements with the fetched data
      const linkData = data[0];  // Assuming data[0] contains the Bitcoin data

      // Update the Bitcoin price
      document.getElementById('link-price').innerText = `$${linkData.current_price}`;

      // Update the price change percentage in 24 hours
      document.getElementById('link-pcp24hr').innerText = `${linkData.price_change_percentage_24h}%`;

      // Update the market rank
      document.getElementById('link-marketrank').innerText = linkData.market_cap_rank;

      // Update the market cap
      document.getElementById('link-marketcap').innerText = `$${linkData.market_cap.toLocaleString()}`;

      // Update the total volume
      document.getElementById('link-tolvol').innerText = `$${linkData.total_volume.toLocaleString()}`;

      // Update the highest price in 24 hours
      document.getElementById('link-high24h').innerText = `$${linkData.high_24h}`;

      // Update the lowest price in 24 hours
      document.getElementById('link-low24h').innerText = `$${linkData.low_24h}`;

      // Update the price change in 24 hours
      document.getElementById('link-pc24hr').innerText = `$${linkData.price_change_24h}`;

      // Update the market cap change in 24 hours
      document.getElementById('link-mcc24h').innerText = `$${linkData.market_cap_change_24h.toLocaleString()}`;

      // Update the market cap change percentage in 24 hours
      document.getElementById('link-mccp24h').innerText = `${linkData.market_cap_change_percentage_24h}%`;

      // Update the volume/market cap ratio
      document.getElementById('link-24hrchg').innerText = linkData.total_volume / linkData.market_cap;

      // Update the circulating supply
      document.getElementById('link-cs').innerText = linkData.circulating_supply.toLocaleString();

      // Update the total supply
      document.getElementById('link-ts').innerText = linkData.total_supply ? linkData.total_supply.toLocaleString() : 'N/A';

      // Update the max supply
      document.getElementById('link-ms').innerText = linkData.max_supply ? linkData.max_supply.toLocaleString() : 'N/A';

      // Update the fully diluted market cap
      document.getElementById('fdv').innerText = linkData.fully_diluted_valuation ? `$${linkData.fully_diluted_valuation.toLocaleString()}` : 'N/A';

      // Update the last updated time
      document.getElementById('last-updated').innerText = new Date(linkData.last_updated).toLocaleString();
    })
    .catch(error => console.error('Error fetching data:', error));
});






document.addEventListener('DOMContentLoaded', () => {
  const linkQuantityInput = document.getElementById('link-quantity');
  const linkTotalValueDisplay = document.getElementById('link-total-value');
  let linkPrice = 0;

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=chainlink')
      .then(response => response.json())
      .then(data => {
          const linkData = data[0];
          linkPrice = linkData.current_price;
          document.getElementById('link-price').innerText = `$${linkPrice}`;
          updateTotalValue();
      })
      .catch(error => console.error('Error fetching data:', error));

  linkQuantityInput.addEventListener('input', updateTotalValue);

  function updateTotalValue() {
      const quantity = parseFloat(linkQuantityInput.value) || 0;
      const totalValue = quantity * linkPrice;
      linkTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
  }
});
