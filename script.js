const app = {};

app.getCryptoData = () => {
  return $.ajax({
    url: "https://api.coincap.io/v2/assets",
    method: "GET",
    dataType: "JSON",
  }).then((res) => {
    return res.data.slice(0, 20);
  });
};

app.setCryptoData = () => {
  const cryptoData = app.getCryptoData();

  cryptoData.done((res) => {
    return res.forEach((i) => {
      const cryptoItem = `
            <div class="cryptoItem">
                <h1>${i.id}</h1>
              </div>
              `;

      $(".dataCont").append(cryptoItem);
    });
  });
};

app.init = () => {
  app.getCryptoData();
  app.setCryptoData();
};

$(() => {
  app.init();
});
