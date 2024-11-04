$.getJSON("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,solana,ripple,dogecoin,cardano,tron,uniswap,shiba,polkadot,chainlink,near,litecoin,kaspa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=2",function(data){
  console.log(data)

  $('#btc-price').html("$"+data.bitcoin.usd)
  $('#btc-marketcap').html(+data.bitcoin.usd_market_cap)
  $('#btc-24hrvol').html(+data.bitcoin.usd_24h_vol)
  $('#btc-24hrchg').html(+data.bitcoin.usd_24h_change)
  $('#btc-lastup').html(+data.bitcoin.last_updated_at)


  $('#eth-price').html("$"+data.ethereum.usd)
  $('#eth-marketcap').html(+data.ethereum.usd_market_cap)
  $('#eth-24hrvol').html(+data.ethereum.usd_24h_vol)
  $('#eth-24hrchg').html(+data.ethereum.usd_24h_change)
  $('#eth-lastup').html(+data.ethereum.last_updated_at)


  $('#usdt-price').html("$"+data.tether.usd)
  $('#usdt-marketcap').html(+data.tether.usd_market_cap)
  $('#usdt-24hrvol').html(+data.tether.usd_24h_vol)
  $('#usdt-24hrchg').html(+data.tether.usd_24h_change)
  $('#usdt-lastup').html(+data.tether.last_updated_at)


  $('#bnb-price').html("$"+data.binancecoin.usd)
  $('#bnb-marketcap').html(+data.binancecoin.usd_market_cap)
  $('#bnb-24hrvol').html(+data.binancecoin.usd_24h_vol)
  $('#bnb-24hrchg').html(+data.binancecoin.usd_24h_change)
  $('#bnb-lastup').html(+data.binancecoin.last_updated_at)


  $('#sol-price').html("$"+data.solana.usd)
  $('#sol-marketcap').html(+data.solana.usd_market_cap)
  $('#sol-24hrvol').html(+data.solana.usd_24h_vol)
  $('#sol-24hrchg').html(+data.solana.usd_24h_change)
  $('#sol-lastup').html(+data.solana.last_updated_at)


  $('#xrp-price').html("$"+data.ripple.usd)
  $('#xrp-marketcap').html(+data.ripple.usd_market_cap)
  $('#xrp-24hrvol').html(+data.ripple.usd_24h_vol)
  $('#xrp-24hrchg').html(+data.ripple.usd_24h_change)
  $('#xrp-lastup').html(+data.ripple.last_updated_at)


  $('#doge-price').html("$"+data.dogecoin.usd)
  $('#doge-marketcap').html(+data.dogecoin.usd_market_cap)
  $('#doge-24hrvol').html(+data.dogecoin.usd_24h_vol)
  $('#doge-24hrchg').html(+data.dogecoin.usd_24h_change)
  $('#doge-lastup').html(+data.dogecoin.last_updated_at)


  $('#ada-price').html("$"+data.cardano.usd)
  $('#ada-marketcap').html(+data.cardano.usd_market_cap)
  $('#ada-24hrvol').html(+data.cardano.usd_24h_vol)
  $('#ada-24hrchg').html(+data.cardano.usd_24h_change)
  $('#ada-lastup').html(+data.cardano.last_updated_at)


  $('#trx-price').html("$"+data.tron.usd)
  $('#trx-marketcap').html(+data.tron.usd_market_cap)
  $('#trx-24hrvol').html(+data.tron.usd_24h_vol)
  $('#trx-24hrchg').html(+data.tron.usd_24h_change)
  $('#trx-lastup').html(+data.tron.last_updated_at)


  $('#uni-price').html("$"+data.uniswap.usd)
  $('#uni-marketcap').html(+data.uniswap.usd_market_cap)
  $('#uni-24hrvol').html(+data.uniswap.usd_24h_vol)
  $('#uni-24hrchg').html(+data.uniswap.usd_24h_change)
  $('#uni-lastup').html(+data.uniswap.last_updated_at)


  $('#shib-price').html("$"+data.shiba.usd)
  $('#shib-marketcap').html(+data.shiba.usd_market_cap)
  $('#shib-24hrvol').html(+data.shiba.usd_24h_vol)
  $('#shib-24hrchg').html(+data.shiba.usd_24h_change)
  $('#shib-lastup').html(+data.shiba.last_updated_at)


  $('#dot-price').html("$"+data.polkadot.usd)
  $('#dot-marketcap').html(+data.polkadot.usd_market_cap)
  $('#dot-24hrvol').html(+data.polkadot.usd_24h_vol)
  $('#dot-24hrchg').html(+data.polkadot.usd_24h_change)
  $('#dot-lastup').html(+data.polkadot.last_updated_at)


  $('#link-price').html("$"+data.chainlink.usd)
  $('#link-marketcap').html(+data.chainlink.usd_market_cap)
  $('#link-24hrvol').html(+data.chainlink.usd_24h_vol)
  $('#link-24hrchg').html(+data.chainlink.usd_24h_change)
  $('#link-lastup').html(+data.chainlink.last_updated_at)


  $('#near-price').html("$"+data.near.usd)
  $('#near-marketcap').html(+data.near.usd_market_cap)
  $('#near-24hrvol').html(+data.near.usd_24h_vol)
  $('#near-24hrchg').html(+data.near.usd_24h_change)
  $('#near-lastup').html(+data.near.last_updated_at)


  $('#ltc-price').html("$"+data.litecoin.usd)
  $('#ltc-marketcap').html(+data.litecoin.usd_market_cap)
  $('#ltc-24hrvol').html(+data.litecoin.usd_24h_vol)
  $('#ltc-24hrchg').html(+data.litecoin.usd_24h_change)
  $('#ltc-lastup').html(+data.litecoin.last_updated_at)


  $('#kas-price').html("$"+data.kaspa.usd)
  $('#kas-marketcap').html(+data.kaspa.usd_market_cap)
  $('#kas-24hrvol').html(+data.kaspa.usd_24h_vol)
  $('#kas-24hrchg').html(+data.kaspa.usd_24h_change)
  $('#kas-lastup').html(+data.kaspa.last_updated_at)



  





















})


