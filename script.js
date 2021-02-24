const app = {};

app.coinswanted = 0;

app.getCryptoData = () => {
  return $.ajax({
    url: "https://api.coincap.io/v2/assets",
    method: "GET",
    dataType: "JSON",
  }).then((res) => {
    const controlledAmount = app.coinswanted > 100 ? 100 : app.coinswanted;
    return res.data.slice(0, controlledAmount);
  });
};

app.formatPrice = (x) => {
  let num = x.toFixed(2);
  return `$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

app.formatLargeNumbers = (n) => {
  if (n >= 1e12) {
    return +(n / 1e12).toFixed(1) + "T";
  } else if (n >= 1e9 && n < 1e12) {
    return +(n / 1e9).toFixed(1) + "B";
  } else if (n >= 1e6 && n < 1e9) {
    return +(n / 1e6).toFixed(1) + "M";
  } else if (n >= 1e3 && n < 1e6) {
    return +(n / 1e3).toFixed(1) + "K";
  } else return n;
};

app.setCryptoData = () => {
  const cryptoData = app.getCryptoData();

  cryptoData.done((res) => {
    return res.forEach((i) => {
      console.log(i);
      const cryptoItem = `
            <div class="cryptoItem">

            <div class='itemHeader' >
                <h2> #${i.rank} </h2>
                <h2> ${i.symbol} </h2>
            </div>

            <h1>${i.name}</h1>
            <p> Price: ${app.formatPrice(Number(i.priceUsd))} </p>
            <p> Market Cap: ${app.formatLargeNumbers(
              Number(i.marketCapUsd)
            )} </p>
            <p> 24 hour volume: ${app.formatLargeNumbers(
              Number(i.volumeUsd24Hr)
            )} </p>
            <a href='${i.explorer}' target=”_blank” > Explorer Link  </a>

            </div>
              `;

      $(".dataCont").append(cryptoItem);
    });
  });
};

app.addCoin = () => {
  $("#addCoin").click(() => {
    app.coinswanted++;
    $(".dataCont").empty();
    app.setCryptoData();
  });
};

app.clear = () => {
  $("#clear").click(() => {
    app.coinswanted = 0;
    $(".dataCont").empty();
  });
};

app.init = () => {
  app.addCoin();
  app.clear();
  app.setCryptoData();
};

$(() => {
  app.init();
});
