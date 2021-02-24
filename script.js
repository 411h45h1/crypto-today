const app = {};

app.coinswanted = 0;

app.getCryptoData = () =>
  $.ajax({
    url: "https://api.coincap.io/v2/assets",
    method: "GET",
    dataType: "JSON",
  }).then((res) => {
    const controlledAmount = app.coinswanted > 100 ? 100 : app.coinswanted;
    return res.data.slice(0, controlledAmount);
  });

app.formatPrice = (n) =>
  `$${n
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

app.formatLargeNumbers = (n) =>
  n >= 1e12
    ? (n / 1e12).toFixed(2) + "T"
    : n >= 1e9 && n < 1e12
    ? (n / 1e9).toFixed(2) + "B"
    : n >= 1e6 && n < 1e9
    ? (n / 1e6).toFixed(2) + "M"
    : n >= 1e3 && n < 1e6
    ? (n / 1e3).toFixed(2) + "K"
    : n;

app.setCryptoData = () =>
  app.getCryptoData().done((res) =>
    res.forEach((i) =>
      $(".dataCont").append(`
      <div class="cryptoItem">

        <div class='itemHeader' >
          <h2> #${i.rank} </h2>
          <h2> ${i.symbol} </h2>
        </div>

        <h1>${i.name}</h1>
        <p> Price: ${app.formatPrice(Number(i.priceUsd))} </p>
        <p> Market Cap: $${app.formatLargeNumbers(Number(i.marketCapUsd))} </p>
        <p> 24 hour volume: $${app.formatLargeNumbers(
          Number(i.volumeUsd24Hr)
        )} </p>
        <a href='${i.explorer}' target="_blank" > Explorer Link  </a>

      </div>
        `)
    )
  );

app.addCoin = () =>
  $("#addCoin").click(() => {
    app.coinswanted++;
    $(".dataCont").empty();
    app.setCryptoData();
  });

app.clear = () =>
  $("#clear").click(() => {
    app.coinswanted = 0;
    $(".dataCont").empty();
  });

app.init = () => {
  app.addCoin();
  app.clear();
  app.setCryptoData();
};

$(() => app.init());

// My goal was to finish my script page with the least amount of lines possible
// app.formatLargeNumbers() isnt easy on the eyes, here's the samee code in an if statement

// const formatLargeNumbers = () => {

//   if (n >= 1e12) {

//     return (n / 1e12).toFixed(2) + "T";

//   } else if (n >= 1e9 && n < 1e12) {

//     return (n / 1e9).toFixed(2) + "B";

//   } else if (n >= 1e6 && n < 1e9) {

//     return (n / 1e6).toFixed(2) + "M";

//   } else if (n >= 1e3 && n < 1e6) {

//     return (n / 1e3).toFixed(2) + "K";

//   } else return n;

// };
