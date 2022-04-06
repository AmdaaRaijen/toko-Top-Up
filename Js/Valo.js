let harga = '';
let IDriot = '';
let TAG = '';
let buying_method = '';

fetch('json/Valo.json')
  .then((res) => res.json())
  .then((data) => {
    let harga = '';
    data.forEach((item) => {
      harga += `<div class="col-md-1 col-sm-3 coll-harga">
        <div class="card harga-content">
          <div class="card-body">
          <img class="miya" src="${item.pict}" style="margin-top:10px;" alt="..." />
            <h5 class="jumlah" style="margin-top:10px;">${item.jumlah} VP</h5>
            <p class="card-text">${item.harga}</p>
            <button type="button" class="btn btn-dark tombol modal-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-idPesanan="${item.jumlah}">Pesan</button>
          </div>
        </div>
      </div>`;
    });
    const hargaContainer = document.querySelector('.list-harga');
    hargaContainer.innerHTML = harga;
  });
function getPesanan(id) {
  return `     
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color: red;">Silahkan kirim bukti pembayaran dan chat penjual!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <p>ID : ${IDriot}${TAG}</strong></p>
        <p>Metode Pembayaran : ${buying_method} </p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="return checkIdentityIsNotEmpty()">Close</button>
    </div>
  `;
}

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-button')) {
    const jumlahPesanan = e.target.dataset.idpesanan;
    const modalContent = getPesanan(jumlahPesanan);
    const modalBody = document.querySelector('.pesanan');
    modalBody.innerHTML = modalContent;

    const encode = `Pesan VP : ${jumlahPesanan}\nID: ${IDriot}${TAG}`;

    const Chat = document.querySelector('.modal-footer');
    const chatText = `<a href="https://wa.me/6285156189563?text=${encodeURIComponent(encode.trim())}"><button type="button" class="btn btn-success" onclick="return checkIdentityIsNotEmpty()">Chat Penjual</button></a>`;

    Chat.innerHTML = chatText;
  }
});

const identities = document.querySelectorAll('.identity');
identities.forEach((identity) => {
  identity.addEventListener('input', (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    switch (inputName) {
      case 'IDriot':
        IDriot = value;
        break;
      case 'TAG':
        TAG = value;
        break;
    }
  });
});

function checkIdentityIsNotEmpty() {
  if (!idServer && !UID) {
    alert('Informasi akun masih kosong');
    return false;
  }
}

const buying_method_select = document.getElementById('buying_method');

buying_method_select.addEventListener('change', (e) => {
  buying_method = e.target.value;
});
