document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the CoinGecko API
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=uniswap')
      .then(response => response.json())
      .then(data => {
        // Log the data to verify the structure
        console.log(data);
  
        // Update the HTML elements with the fetched data
        const uniData = data[0];  // Assuming data[0] contains the Bitcoin data
  
        // Update the Bitcoin price
        document.getElementById('uni-price').innerText = `$${uniData.current_price}`;
  
        // Update the price change percentage in 24 hours
        document.getElementById('uni-pcp24hr').innerText = `${uniData.price_change_percentage_24h}%`;
  
        // Update the market rank
        document.getElementById('uni-marketrank').innerText = uniData.market_cap_rank;
  
        // Update the market cap
        document.getElementById('uni-marketcap').innerText = `$${uniData.market_cap.toLocaleString()}`;
  
        // Update the total volume
        document.getElementById('uni-tolvol').innerText = `$${uniData.total_volume.toLocaleString()}`;
  
        // Update the highest price in 24 hours
        document.getElementById('uni-high24h').innerText = `$${uniData.high_24h}`;
  
        // Update the lowest price in 24 hours
        document.getElementById('uni-low24h').innerText = `$${uniData.low_24h}`;
  
        // Update the price change in 24 hours
        document.getElementById('uni-pc24hr').innerText = `$${uniData.price_change_24h}`;
  
        // Update the market cap change in 24 hours
        document.getElementById('uni-mcc24h').innerText = `$${uniData.market_cap_change_24h.toLocaleString()}`;
  
        // Update the market cap change percentage in 24 hours
        document.getElementById('uni-mccp24h').innerText = `${uniData.market_cap_change_percentage_24h}%`;
  
        // Update the volume/market cap ratio
        document.getElementById('uni-24hrchg').innerText = uniData.total_volume / uniData.market_cap;
  
        // Update the circulating supply
        document.getElementById('uni-cs').innerText = uniData.circulating_supply.toLocaleString();
  
        // Update the total supply
        document.getElementById('uni-ts').innerText = uniData.total_supply ? uniData.total_supply.toLocaleString() : 'N/A';
  
        // Update the max supply
        document.getElementById('uni-ms').innerText = uniData.max_supply ? uniData.max_supply.toLocaleString() : 'N/A';
  
        // Update the fully diluted market cap
        document.getElementById('fdv').innerText = uniData.fully_diluted_valuation ? `$${uniData.fully_diluted_valuation.toLocaleString()}` : 'N/A';
  
        // Update the last updated time
        document.getElementById('last-updated').innerText = new Date(uniData.last_updated).toLocaleString();
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  
  
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const uniQuantityInput = document.getElementById('uni-quantity');
    const uniTotalValueDisplay = document.getElementById('uni-total-value');
    let uniPrice = 0;
  
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=uniswap')
        .then(response => response.json())
        .then(data => {
            const uniData = data[0];
            uniPrice = uniData.current_price;
            document.getElementById('uni-price').innerText = `$${uniPrice}`;
            updateTotalValue();
        })
        .catch(error => console.error('Error fetching data:', error));
  
    uniQuantityInput.addEventListener('input', updateTotalValue);
  
    function updateTotalValue() {
        const quantity = parseFloat(uniQuantityInput.value) || 0;
        const totalValue = quantity * uniPrice;
        uniTotalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
    }
  });
  