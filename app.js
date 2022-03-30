let harga = '';
let userId = '';
let idServer = '';
let nickname = '';

fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    let harga = '';
    data.forEach((item) => {
      harga += `<div class="col-md-4 my-3 coll-harga">
        <div class="card harga-content">
          <div class="card-body">
            <h5 class="card-title">${item.jumlah} Diamond</h5>
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
              <h5 class="modal-title" id="exampleModalLabel">Silahkan kirim bukti pembayaran dan chat penjual</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <p>Pesan Diamond: ${id}</p>
              <p>ID: ${userId}</p>
              <p>ID server: ${idServer}</p>
              <p>NICK NAME: ${nickname}</p>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>`;
}

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-button')) {
    const jumlahPesanan = e.target.dataset.idpesanan;
    const modalContent = getPesanan(jumlahPesanan);
    const modalBody = document.querySelector('.pesanan');
    modalBody.innerHTML = modalContent;

    const encode = `Pesan Diamond: ${jumlahPesanan}\nID: ${userId}\nID server: ${idServer}\nNICKNAME: ${nickname}`;

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
