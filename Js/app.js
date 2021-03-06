let harga = '';
let userId = '';
let idServer = '';
let nickname = '';
let buying_method = '';

fetch('json/ML.json')
  .then((res) => res.json())
  .then((data) => {
    let harga = '';
    data.forEach((item) => {
      harga += `<div class="col-md-1 col-sm-3 coll-harga">
        <div class="card harga-content">
          <div class="card-body">
          <img class="miya" src="${item.pict}" alt="..." />
            <h5 class="jumlah">${item.jumlah}</h5>
            <h6 class="card-subtitle mb-2 text-dark"><strike>${item.diskon}</strike></h6>
            <p class="card-text">${item.harga}</p>
            <button type="button" class="btn btn-dark tombol modal-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-idPesanan="${item.jumlah}">Pesan</button>
          </div>
        </div>
      </div>`;
    });
    const hargaContainer = document.querySelector('.list-harga');
    hargaContainer.innerHTML = harga;
  });

function returnId(id) {
  return fetch('ML.json')
    .then((res) => res.json())
    .then((data) => {
      return data.id;
    });
}

function getPesanan(id) {
  return `<div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" style="color: red;">Proses Cepat dan Aman!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <p>Pesan Diamond: ${id}</p>
              <p>ID: ${userId}</p>
              <p>ID server: ${idServer}</p>
              <p>NICK NAME: ${nickname}</p>
              <p>METODE PEMBAYARAN: ${buying_method}</p>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="return checkIdentityIsNotEmpty()">Close</button>
          </div>`;
}

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-button')) {
    const jumlahPesanan = e.target.dataset.idpesanan;
    const modalContent = getPesanan(jumlahPesanan);
    const modalBody = document.querySelector('.pesanan');
    modalBody.innerHTML = modalContent;

    const encode = `Pesan Diamond ML: ${jumlahPesanan}\nID: ${userId}\nID server: ${idServer}\nNICKNAME: ${nickname}\nMetode Pembayaran: ${buying_method}`;

    const Chat = document.querySelector('.modal-footer');
    const chatText = `<a href="https://wa.me/6285156189563?text=${encodeURIComponent(encode.trim())}"><button type="button" class="btn btn-success" onclick="return checkIdentityIsNotEmpty()">Chat Penjual</button></a>`;

    Chat.innerHTML = chatText;
  }
});

// form navbar
const identities = document.querySelectorAll('.identity');
identities.forEach((identity) => {
  identity.addEventListener('input', (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    switch (inputName) {
      case 'userId':
        userId = value;
        break;
      case 'idServer':
        idServer = value;
        break;
      case 'nickname':
        nickname = value;
        break;
    }
  });
});

function checkIdentityIsNotEmpty() {
  if (!nickname && !userId && !idServer) {
    alert('Informasi akun masih kosong');
    return false;
  }
}

// UNTUK INDEX.HTML

fetch('json/pilihan-game.json')
  .then((res) => res.json())
  .then((data) => {
    let pilihan = '';
    data.forEach((item) => {
      pilihan += `<div class="col col-pilihan">
      <div class="card pilihan-game" style="width: 12rem">
        <img src="${item.pict}" class="card-img-top" alt="...">
        ${item.wave}
        <a href="${item.link}">
          <div class="card-body">
            <h2>${item.nama}</h2>
          </div>
        </a>
        </div>
    </div>`;
    });
    const pilihanContainer = document.querySelector('.row-pilihan-game');
    pilihanContainer.innerHTML = pilihan;
  });

const buying_method_select = document.getElementById('buying_method');

buying_method_select.addEventListener('change', (e) => {
  buying_method = e.target.value;
});
