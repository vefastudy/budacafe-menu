// Tüm menü verisini global bir değişkende tutacağız
let menuData = null;

// DOM yüklendiğinde çalışacak ana fonksiyon
document.addEventListener("DOMContentLoaded", function() {
  // Gerekli DOM elementlerini seç
  const kategoriAlani = document.getElementById('kategori-alani');
  const urunAlani = document.getElementById('urun-alani');

  // Menü verisini 'menu.json' dosyasından çek
  fetch('menu.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      menuData = data; // Veriyi global değişkene ata
      renderKategoriler(); // İlk olarak kategori listesini göster
    })
    .catch(error => {
      console.error('Menü yüklenirken hata oluştu:', error);
      kategoriAlani.innerHTML = `<div class="alert alert-danger">Menü yüklenemedi.</div>`;
    });
});

/**
 * Kategori listesini oluşturan ve ekrana basan fonksiyon
 */
function renderKategoriler() {
  // Alanları ayarla (Kategorileri göster, ürünleri gizle)
  document.getElementById('kategori-alani').style.display = 'block';
  document.getElementById('urun-alani').style.display = 'none';

  const kategoriListesi = document.getElementById('kategori-listesi');
  let htmlCikti = "";

  menuData.kategoriler.forEach(kategori => {
    htmlCikti += `
      <div class="col-md-4">
        <div class="card kategori-kart shadow-sm p-4 text-center" onclick="renderUrunler('${kategori.ad}')">
          <h3 class="h5">${kategori.ad}</h3>
        </div>
      </div>
    `;
  });

  kategoriListesi.innerHTML = htmlCikti;
}

/**
 * Belirli bir kategorinin ürünlerini oluşturan ve ekrana basan fonksiyon
 * @param {string} kategoriAdi - Gösterilecek kategorinin adı (örn: "Sıcak İçecekler")
 */
function renderUrunler(kategoriAdi) {
  // Alanları ayarla (Kategorileri gizle, ürünleri göster)
  document.getElementById('kategori-alani').style.display = 'none';
  document.getElementById('urun-alani').style.display = 'block';

  // Doğru kategoriyi verimizden bul
  const kategori = menuData.kategoriler.find(k => k.ad === kategoriAdi);
  const urunAlani = document.getElementById('urun-alani');
  
  if (!kategori) {
    urunAlani.innerHTML = `<p>Kategori bulunamadı.</p>`;
    return;
  }

  let htmlCikti = "";

  // "Geri Dön" butonu ve Kategori Başlığı
  htmlCikti += `
    <div class="d-flex justify-content-start align-items-center mb-4">
      <button class="btn btn-outline-secondary me-3" onclick="renderKategoriler()">
        &larr; Geri
      </button>
      <h2 class="kategori-baslik m-0">${kategori.ad}</h2>
    </div>
  `;

  // Ürün listesi
  htmlCikti += `<ul class="list-group list-group-flush mb-4 shadow-sm rounded">`;
  kategori.urunler.forEach(urun => {
    htmlCikti += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong class="urun-adi">${urun.ad}</strong>
          ${urun.aciklama ? `<br><small class="text-muted">${urun.aciklama}</small>` : ''}
        </div>
        <span class="badge fiyat-badge rounded-pill">${urun.fiyat}</span>
      </li>
    `;
  });
  htmlCikti += `</ul>`;

  urunAlani.innerHTML = htmlCikti;
}
