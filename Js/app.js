let harga = '';
let userId = '';
let idServer = '';
let nickname = '';
let buying_method = '';

fetch('json/data.json')
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
  return fetch('data.json')
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="border: none;"><path style="border: none;" fill="#ffffff" fill-opacity="1" d="M0,96L16,85.3C32,75,64,53,96,90.7C128,128,160,224,192,234.7C224,245,256,171,288,144C320,117,352,139,384,144C416,149,448,139,480,122.7C512,107,544,85,576,90.7C608,96,640,128,672,144C704,160,736,160,768,144C800,128,832,96,864,85.3C896,75,928,85,960,128C992,171,1024,245,1056,282.7C1088,320,1120,320,1152,282.7C1184,245,1216,171,1248,133.3C1280,96,1312,96,1344,106.7C1376,117,1408,139,1424,149.3L1440,160L1440,0L1424,0C1408,0,1376,0,1344,0C1312,0,1280,0,1248,0C1216,0,1184,0,1152,0C1120,0,1088,0,1056,0C1024,0,992,0,960,0C928,0,896,0,864,0C832,0,800,0,768,0C736,0,704,0,672,0C640,0,608,0,576,0C544,0,512,0,480,0C448,0,416,0,384,0C352,0,320,0,288,0C256,0,224,0,192,0C160,0,128,0,96,0C64,0,32,0,16,0L0,0Z"></path></svg>
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
