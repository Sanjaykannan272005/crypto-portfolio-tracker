<?php 
session_start();

	include("connection.php");
	include("functions.php");
    include("save_portfolio.php")
    // include("fetch_portfolio.php")


?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cryptocurrency Portfolio</title>

  <!-- 
    - favicon
  -->
  <link rel="shortcut icon" href="./favicon.svg" type="image/svg+xml">

  <!-- 
    - custom css link
  -->
  <link rel="stylesheet" href="./assets/css/style12.css">
  <!-- <link rel="stylesheet" href="./assets/css/bitcoin.css"> -->
  <link rel="stylesheet" href="display_portfolio.css"> 



  <!-- 
    - google font link
  -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script> -->

  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"> 


  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

<!-- <style>
    .container {
      margin: 0 !important;
    }
  </style> -->
</head>

<body>

  <!-- 
    - #HEADER
  -->

  <header class="header" data-header>
    <div class="container">

      <a href="#" class="logo">
        <img src="./assets/images/logo.svg" width="32" height="32" alt="Cryptex logo">
        Crypto Portfolio Tracker
      </a>

      <nav class="navbar" data-navbar>
        <ul class="navbar-list">

          <li class="navbar-item">
            <a href="index1.html" class="navbar-link" data-nav-link>Homepage</a>
          </li>

          <li class="navbar-item">
            <a href="portindex.php" class="navbar-link" data-nav-link>Buy Crypto</a>
          </li>

          <li class="navbar-item">
            <a href="index1.html" class="navbar-link" data-nav-link>Markets</a>
          </li>

          <li class="navbar-item">
            <a href="" class="navbar-link  active" data-nav-link>My Portfolio</a>
          </li>

          <li class="navbar-item">
            <a href="sell.php" class="navbar-link" data-nav-link>Sell Crypto</a>
          </li>

          <a href="logout.php" class="navbar-link" data-nav-link onclick="return confirmLogout();">Logout</a>

<script type="text/javascript">
    function confirmLogout() {
        return confirm("Are you sure you want to logout?");
    }
</script>

        </ul>
      </nav>

      <button class="nav-toggle-btn" aria-label="Toggle menu" data-nav-toggler>
        <span class="line line-1"></span>
        <span class="line line-2"></span>
        <span class="line line-3"></span>
      </button>

      <!-- <a href="#" class="btn btn-outline">Wallet</a> -->

    </div>
  </header>





  <main>
    <article>

      <section class="portfolio-table">
        <h2 id="myport">My Portfolio</h2>
        <div class="container">
            
        <table id="portfolio-table">
<thead>
    <tr>
        <th>Cryptocurrency</th>
        <th>Invested Amount (USD)</th>
        <th>Purchase Price (USD)</th>
        <th id="currentval">Current Value (USD)</th>
        <th>Current amount</th>
        <th>Return</th>
        <th>Return percentage</th>
    </tr>
</thead>
<tbody>
    <!-- Data rows will be dynamically added here -->
</tbody>
</table>
        </div>
    </section>
</main>
<script>
$(document).ready(async function() {
  const tbody = $('#portfolio-table tbody');
  const totalDiv = $('#total-summary');

  try {
    const data = await $.ajax({
      type: 'GET',
      url: 'fetch_portfolio.php',
      dataType: 'json',
    });

    if (data.length === 0) {
      tbody.append('<tr><td colspan="8">No data available</td></tr>');
      return;
    }

    const pricePromises = data.map(async (item) => {
      const currentPrice = await fetchCurrentPrice(item.cryptoId);
      return {
        item,
        currentPrice,
      };
    });

    const results = await Promise.all(pricePromises);

    const totals = results.reduce((acc, { item, currentPrice }) => {
      const cryptoQuantity = (item.investedAmount / item.cryptoPrice);
      const currentValue = cryptoQuantity * currentPrice;
      const returnAmount = (currentValue - item.investedAmount);
      const returnPercentage = ((returnAmount / item.investedAmount) * 100);

      acc.totalCurrentValue += currentValue;
      acc.totalReturn += returnAmount;
      acc.totalInvestedAmount += parseFloat(item.investedAmount);

      return acc;
    }, {
      totalCurrentValue: 0,
      totalReturn: 0,
      totalInvestedAmount: 0,
    });

    const rowsHtml = results.map(({ item, currentPrice }) => {
      const cryptoQuantity = (item.investedAmount / item.cryptoPrice);
      const currentValue = cryptoQuantity * currentPrice;
      const returnAmount = (currentValue - item.investedAmount);
      const returnPercentage = ((returnAmount / item.investedAmount) * 100);

      return `
        <tr id="row-${item.cryptoId}">
          <td>${item.cryptoName}</td>
          <td>$${item.investedAmount}</td>
          <td>$${item.cryptoPrice}</td>
          <td>$${currentPrice.toFixed(2) || 'N/A'}</td>
          <td>$${currentValue.toFixed(2)}</td>
          <td>$${returnAmount.toFixed(2)}</td>
          <td>${returnPercentage.toFixed(2)}%</td>
        </tr>
      `;
    }).join('');

    tbody.html(rowsHtml);

    const totalReturnPercentage = ((totals.totalReturn / totals.totalInvestedAmount) * 100);

    const totalHtml = `
      <div id="total-summary">
        <p style="padding-bottom: 10px;font-size: larger;"><strong>Total Invested Amount:</strong> $${totals.totalInvestedAmount.toFixed(2)}</p>
        <p style="padding-bottom: 10px;font-size: larger;"><strong>Total Current Value:</strong> $${totals.totalCurrentValue.toFixed(2)}</p>
        <p style="padding-bottom: 10px;font-size: larger;"><strong>Total Return:</strong> $${totals.totalReturn.toFixed(2)}</p>
        <p style="padding-bottom: 10px;font-size: larger;"><strong>Total Return Percentage:</strong> ${totalReturnPercentage.toFixed(2)}%</p>
      </div>
    `;

    if (totalDiv.length) {
      totalDiv.html(totalHtml);
    } else {
      $('#portfolio-table').before(totalHtml);
    }
  } catch (error) {
    console.error(error);
  }
});

async function fetchCurrentPrice(cryptoId) {
  const cache = {};
  if (cache[cryptoId]) {
    return cache[cryptoId];
  }

  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
  const data = await response.json();
  cache[cryptoId] = data[cryptoId]?.usd;
  return cache[cryptoId];
}
``</script>


        <!-- 
        - #ABOUT
      -->

      <!-- <section class="section about" aria-label="about" data-section>
        <div class="container">

          <figure class="about-banner">
            <img src="./assets/images/bitcoin-img.svg" width="748" height="436" loading="lazy" alt="about banner"
              class="w-100">
          </figure>

          <div class="about-content">

            <h2 class="h2 section-title">What Is Bitcoin?</h2>

            <p class="section-text">
              Bitcoin (BTC) is a cryptocurrency (a virtual currency) designed to act as money and a form of payment outside the control of any one person, group, or entity. This removes the need for trusted third-party involvement (e.g., a mint or bank) in financial transactions.

              Bitcoin was introduced to the public in 2009 by an anonymous developer or group of developers using the name Satoshi Nakamoto. It has since become the most well-known and largest cryptocurrency in the world. Its popularity has inspired the development of many other cryptocurrencies.
              
              Read on to learn more about the <a href="https://bitcoin.org/" class="copyright-link">Bitcoin</a> that started it all—the history behind it, how to buy it, mine it, and what it can be used for.
              
            </p>

            

            <a href="https://bitcoin.org/bitcoin.pdf" class="btn btn-primary">Whitepaper</a>

          </div>

        </div>
      </section>
 -->









    </article>
  </main>





  <!-- 
    - #FOOTER
  -->

  <footer class="footer">

    <div class="footer-top" data-section>
      <div class="container">

        <div class="footer-brand">

          <a href="#" class="logo">
            <img src="./assets/images/logo.svg" width="50" height="50" alt="Cryptex logo">
            Crypto Portfolio Tracker
          </a>

          <h2 class="footer-title">Let's talk! 🤙</h2>

          <a href="tel:+123456789101" class="footer-contact-link">+12 345 678 9101</a>

          <a href="capstoneproject4221gmail.com" class="footer-contact-link">capstoneproject4221gmail.com</a>

          <address class="footer-contact-link">
            Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522
          </address>

        </div>

        <ul class="footer-list">

          <li>
            <p class="footer-list-title">Products</p>
          </li>

          <li>
            <a href="#" class="footer-link">Spot</a>
          </li>

          <li>
            <a href="#" class="footer-link">Inverse Perpetual</a>
          </li>

          <li>
            <a href="#" class="footer-link">USDT Perpetual</a>
          </li>

          <li>
            <a href="#" class="footer-link">Exchange</a>
          </li>

          <li>
            <a href="#" class="footer-link">Launchpad</a>
          </li>

          <li>
            <a href="#" class="footer-link">Binance Pay</a>
          </li>

        </ul>

        <ul class="footer-list">

          <li>
            <p class="footer-list-title">Services</p>
          </li>

          <li>
            <a href="#" class="footer-link">Buy Crypto</a>
          </li>

          <li>
            <a href="#" class="footer-link">Markets</a>
          </li>

          <li>
            <a href="#" class="footer-link">Portfolio Tracker</a>
          </li>

          <!-- <li>
            <a href="#" class="footer-link">Affiliate Program</a>
          </li>

          <li>
            <a href="#" class="footer-link">Referral Program</a>
          </li> -->

          <li>
            <a href="#" class="footer-link">API</a>
          </li>

        </ul>

        <ul class="footer-list">

          <li>
            <p class="footer-list-title">Support</p>
          </li>

          <!-- <li>
            <a href="#" class="footer-link">Bybit Learn</a>
          </li> -->

          <li>
            <a href="#" class="footer-link">Help Center</a>
          </li>

          <li>
            <a href="#" class="footer-link">User Feedback</a>
          </li>

          <li>
            <a href="#" class="footer-link">Submit a request</a>
          </li>

          <li>
            <a href="#" class="footer-link">API Documentation</a>
          </li>

          <li>
            <a href="#" class="footer-link">Trading Rules</a>
          </li>

        </ul>

        <ul class="footer-list">

          <li>
            <p class="footer-list-title">About Us</p>
          </li>

          <!-- <li>
            <a href="#" class="footer-link">About Bybit</a>
          </li> -->

          <li>
            <a href="#" class="footer-link">Authenticity Check</a>
          </li>

          <li>
            <a href="#" class="footer-link">Careers</a>
          </li>

          <li>
            <a href="#" class="footer-link">Business Contacts</a>
          </li>

          <li>
            <a href="#" class="footer-link">Blog</a>
          </li>

        </ul>

      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">

        <p class="copyright">
          &copy; 2024 Crypto Portfolio Tracker All Rights Reserved by <a href="capstoneproject4221gmail.com" class="copyright-link">Capstone project</a>
        </p>

        <ul class="social-list">

          <li>
            <a href="#" class="social-link">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>

          <li>
            <a href="#" class="social-link">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>

          <li>
            <a href="#" class="social-link">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>

          <li>
            <a href="#" class="social-link">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>

        </ul>

      </div>
    </div>

  </footer>





  <!-- 
    - custom js link
  -->
  <script src="portindex.js" defer></script> 
  <!-- <script src="./assets/js/script.js" defer></script> -->


  <!-- 
    - ionicon link
  -->
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

</body>

</html>