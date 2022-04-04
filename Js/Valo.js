fetch('json/Valo.json')
  .then((res) => res.json())
  .then((data) => {
    let harga = '';
    data.forEach((item) => {
      harga += `<div class="col-md-1 col-sm-3 coll-harga">
        <div class="card harga-content">
          <div class="card-body">
          <img class="miya" src="${item.pict}" style="margin-top:20px;" alt="..." />
            <h5 class="jumlah" style="margin-top:10px;">${item.jumlah} Diamond</h5>
            <p class="card-text">${item.harga}</p>
            <button type="button" class="btn btn-dark tombol modal-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-idPesanan="${item.jumlah}">Pesan</button>
          </div>
        </div>
      </div>`;
    });
    const hargaContainer = document.querySelector('.list-harga');
    hargaContainer.innerHTML = harga;
  });
