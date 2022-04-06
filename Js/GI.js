let harga = '';
let idServer = '';
let UID = '';
let buying_method = '';

fetch('json/GI.json')
  .then((res) => res.json())
  .then((data) => {
    const game = data;
    const gameList = document.querySelector('.harga-gi');
    game.forEach((game) => {
      const gameItem = `
        <div class="col-md-1 col-sm-3 coll-harga coll-gi">
        <div class="card harga-content content-gi">
          <div class="card-body">
          <img class="miya" style="margin-top: 15px;"  src="${game.pict}" alt="..." />
            <h5 class="jumlah">${game.jumlah} Genesis Crystal</h5>
            <p class="card-text">${game.Harga}</p>
            <button type="button" class="btn btn-dark tombol modal-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-idPesanan="${game.jumlah}">Pesan</button>
          </div>
        </div>
      </div>
        `;
      gameList.innerHTML += gameItem;
    });
  });

function getPesanan(id) {
  return `     
  <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel" style="color: red;">Silahkan kirim bukti pembayaran dan chat penjual!</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
      <p>ID Server : ${idServer}</p>
      <p>UID : ${UID}</strong></p>
      <p>Metode Pembayaran : ${buying_method} </p>
  </div>
  <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="return checkIdentityIsNotEmpty()">Close</button>
  </div>
`;
}

const identities = document.querySelectorAll('.identity');
identities.forEach((identity) => {
  identity.addEventListener('input', (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    switch (inputName) {
      case 'idServer':
        idServer = value;
        break;
      case 'UID':
        UID = value;
        break;
      case 'nickname':
        nickname = value;
        break;
    }
  });
});

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-button')) {
    const jumlahPesanan = e.target.dataset.idpesanan;
    const modalContent = getPesanan(jumlahPesanan);
    const modalBody = document.querySelector('.pesanan');
    modalBody.innerHTML = modalContent;

    const encode = `Pesan Genesis Crystal : ${jumlahPesanan}\nId Server: ${idServer}\nUID: ${UID}\nMetode Pembayaran: ${buying_method}`;

    const Chat = document.querySelector('.modal-footer');
    const chatText = `<a href="https://wa.me/6285156189563?text=${encodeURIComponent(encode.trim())}"><button type="button" class="btn btn-success" onclick="return checkIdentityIsNotEmpty()">Chat Penjual</button></a>`;

    Chat.innerHTML = chatText;
  }
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
