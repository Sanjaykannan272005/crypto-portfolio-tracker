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
            <a href="display_portfolio.php" class="navbar-link" data-nav-link>My Portfolio</a>
          </li>

          <li class="navbar-item">
            <a href="" class="navbar-link active" data-nav-link>Sell Crypto</a>
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
                <div class="container">
                    <h2 style="font-size: xx-large;padding-top: 25px;padding-bottom: 25px;">Sell Crypto</h2>
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
                <th>Sell</th>
            </tr>
        </thead>
        <tbody>
            <!-- Data rows will be dynamically added here -->
        </tbody>
    </table>
                </div>
            </section>
        
        <script>
    $(document).ready(function() {
        // Fetch data from the PHP file
        $.ajax({
            type: 'GET',
            url: 'fetch_portfolio.php',
            dataType: 'json',
            success: function(data) {
                var tbody = $('#portfolio-table tbody');
                tbody.empty(); // Clear existing rows
    
                if (data.length > 0) {
                    var pricePromises = data.map(function(item) {
                        return fetchCurrentPrice(item.cryptoId).then(currentPrice => {
                            // Handle cases where current price is not available
                            if (!currentPrice) {
                                currentPrice = 0; // Set to 0 if current price isn't available
                            }
    
                            var cryptoQuantity = (item.investedAmount / item.cryptoPrice);
                            var currentValue = cryptoQuantity * currentPrice;
                            var returnAmount = (currentValue - item.investedAmount);
                            var returnPercentage = ((returnAmount / item.investedAmount) * 100);
    
                            // Create the table row
                            var row = `<tr id="row-${item.cryptoId}">
                                <td>${item.cryptoName}</td>
                                <td>$${item.investedAmount}</td>
                                <td>$${item.cryptoPrice}</td>
                                <td>$${currentPrice.toFixed(2) || 'N/A'}</td>
                                <td>$${currentValue.toFixed(2)}</td>
                                <td>$${returnAmount.toFixed(2)}</td>
                                <td>${returnPercentage.toFixed(2)}%</td>
                                <td><button class="sell-btn" data-crypto-id="${item.cryptoId}" data-crypto-name="${item.cryptoName}" data-crypto-price="${item.cryptoPrice}" style="color: red;">Sell</button></td> <!-- Sell button -->
                            </tr>`;
                            tbody.append(row);
                        });
                    });
    
                    // Wait for all price fetches to complete
                    Promise.all(pricePromises).then(() => {
                        // Add event listeners for sell buttons after the table is populated
                        $(document).on('click', '.sell-btn', function() {
                            var cryptoId = $(this).data('crypto-id');
                            var cryptoName = $(this).data('crypto-name');
                            var cryptoPrice = $(this).data('crypto-price');
                            var rowId = '#row-' + cryptoId;
    
                            // Confirm the sell action with the user
                            if (confirm("Are you sure you want to sell this cryptocurrency?")) {
                                // Make an AJAX request to delete the crypto from the database
                                $.ajax({
                                    type: 'POST',
                                    url: 'sell_crypto.php',
                                    data: {
                                        cryptoName: cryptoName,
                                        cryptoPrice: cryptoPrice
                                    },
                                    success: function(response) {
                                        if (response === 'success') {
                                            // Remove the row from the table after successful deletion
                                            $(rowId).remove();
                                        } else {
                                            alert("Error selling cryptocurrency. Please try again.");
                                        }
                                    }
                                });
                            }
                        });
                    });
                }
            }
        });
    
        function fetchCurrentPrice(cryptoId) {
            return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`)
                .then(response => response.json())
                .then(data => data[cryptoId]?.usd);
        }
    });
    </script>
    
    

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