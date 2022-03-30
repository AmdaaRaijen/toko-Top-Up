let harga = '';

fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    let harga = '';
    data.forEach((item) => {
      console.log(item);
      harga += `<div class="col-md-4 my-3 coll-harga">
        <div class="card harga-content">
          <div class="card-body">
            <h5 class="card-title">${item.jumlah} Diamond</h5>
            <h6 class="card-subtitle mb-2 text-dark"><strike>${item.diskon}</strike></h6>
            <p class="card-text">${item.harga}</p>
            <button type="button" class="btn btn-dark tombol" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${item.id}">Pesan</button>
          </div>
        </div>
      </div>`;
    });
    const hargaContainer = document.querySelector('.list-harga');
    hargaContainer.innerHTML = harga;
  });

function getPesanan() {
  pass;
}

const encode = 'Pesan Diamond: (jumlah)\nID: (id kamu)\nID server: (id server kamu)';

console.log(encode);

const Chat = document.querySelector('.modal-footer');
const chatText = `<a href="https://wa.me/6285156189563?text=${encodeURIComponent(encode.trim())}"><button type="button" class="btn btn-success">Chat Penjual</button></a>`;

Chat.innerHTML = chatText;
