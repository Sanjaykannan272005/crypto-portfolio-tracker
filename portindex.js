 
document.addEventListener('DOMContentLoaded', () => { 
  const cryptoDropdown = document.getElementById('crypto-dropdown'); 
  const amountInvestedInput = document.getElementById('amount-invested'); 
  const buyButton = document.getElementById('buy-crypto'); 
  const portfolioTableBody = document.getElementById('portfolio-table').querySelector('tbody'); 
  const cryptoNameElement = document.getElementById('crypto-name'); 
  const cryptoPriceElement = document.getElementById('crypto-price'); 
  const totalValueOutput = document.getElementById('total-value'); 
  let portfolio = []; 
  let currentCryptoPrice = 0; // To store the current crypto price for 

  let priceCache = {}; // Cache for storing fetched crypto prices 
  // Fetch current price for the selected cryptocurrency (cached to avoid 
 
  function fetchCurrentPrice(cryptoId) { 
    if (priceCache[cryptoId]) { 
      return Promise.resolve(priceCache[cryptoId]); 
    }    
 return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoId}`) 
      .then(response => response.json()) 
      .then(data => { 
        const price = data[0].current_price; 
        priceCache[cryptoId] = price; // Store in cache 
        currentCryptoPrice = price; 
        return currentCryptoPrice; 
      }) 
      .catch(error => { 
        console.error('Error fetching price:', error); 
        return 0; // Default value in case of error 
      }); 
  } 
  // Update portfolio table with the new data 
  function updatePortfolioTable() { 
    portfolioTableBody.innerHTML = ''; 
    let totalValue = 0; 
    portfolio.forEach(holding => { 
      const currentValue = holding.investedAmount; // No need for quantity
      const row = document.createElement('tr'); 
      row.innerHTML = ` 
        <td>${holding.cryptoName}</td> 
        <td>$${holding.investedAmount.toFixed(2)}</td> 
        <td>$${holding.purchasePrice.toFixed(2)}</td> 
      `; 
      portfolioTableBody.appendChild(row); 
      
    });  
  } 
  // Update the displayed cryptocurrency information 
  function updateCryptoInfo(cryptoId) { 
    console.log(`Selected Crypto ID: ${cryptoId}`); // Debugging log 
    fetchCurrentPrice(cryptoId).then(currentPrice => { console.log(`Fetched Price for ${cryptoId}: $${currentPrice.toFixed(2)}`); // Debugging log 
      cryptoNameElement.innerText = cryptoDropdown.options[cryptoDropdown.selectedIndex].text; 
      cryptoPriceElement.innerText = `$${currentPrice.toFixed(2)}`; 
    }); 
  } 
  // Event listener for buying cryptocurrency 
  buyButton.addEventListener('click', () => { 
    const cryptoId = cryptoDropdown.value; 
    const cryptoName = cryptoDropdown.options[cryptoDropdown.selectedIndex].text; 
    const amountInvested = parseFloat(amountInvestedInput.value); 
    if (isNaN(amountInvested) || amountInvested <= 0) { 
      alert('Please enter a valid amount to invest.'); 
      return; 
    } 
    fetchCurrentPrice(cryptoId).then(currentPrice => { 
      const purchasePrice = currentPrice; // The price to be stored in the 
 
      portfolio.push({ 
        cryptoId, 
        cryptoName, 
        investedAmount: amountInvested, 
        purchasePrice, 
      }); 
      updatePortfolioTable(); 
      // Save portfolio data to the database via AJAX 
      $.ajax({ 
        type: 'POST', 
        url: 'save_portfolio.php', 
        data: { 
          crypto_id: cryptoId, 
          crypto_name: cryptoName, 
          invested_amount: amountInvested, 
          purchase_price: purchasePrice, 
        }, 
        dataType: 'json', 
        success: function(response) { 
          alert(response.message); 
        }, 
        error: function(xhr) { 
          console.error(xhr.responseText); 
        } 
      }); 
    }); 
  }); 
  // Debounce function to reduce excessive API calls during dropdown change 
  function debounce(func, delay) { 
    let timeout; 
    return function(...args) { 
      clearTimeout(timeout); 
      timeout = setTimeout(() => func.apply(this, args), delay); 
    }; 
  } 
  // Update cryptocurrency info when dropdown changes (debounced) 
  cryptoDropdown.addEventListener('change', debounce(() => { 
    const selectedCrypto = cryptoDropdown.value; 
    updateCryptoInfo(selectedCrypto); 
  }, 300)); // Adjust delay as needed 
  // Initial setup for Bitcoin 
  updateCryptoInfo('bitcoin'); 
});