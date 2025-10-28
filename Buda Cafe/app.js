// Sayfa yüklendiğinde bu fonksiyonu çalıştır
document.addEventListener("DOMContentLoaded", function() {
  
  // Menü verisini 'menu.json' dosyasından çek
  fetch('menu.json')
    .then(response => {
      // Çekme işlemi başarılı değilse hata fırlat
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Gelen veriyi JSON olarak işle
    })
    .then(data => {
      // JSON'dan gelen veriyi HTML'e dönüştür
      const menuAlani = document.getElementById('menu-alani');
      let htmlCikti = ""; // Boş bir HTML metni oluştur

      // Her kategori için dön
      data.kategoriler.forEach(kategori => {
        // Kategori başlığını ekle
        htmlCikti += `<h2 class="kategori-baslik">${kategori.ad}</h2>`;
        
        // Ürünler için bir liste grubu başlat
        htmlCikti += `<ul class="list-group list-group-flush mb-4 shadow-sm rounded">`;

        // Her ürünü dön ve liste öğesi olarak ekle
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

        htmlCikti += `</ul>`; // Liste grubunu kapat
      });

      // Oluşturulan tüm HTML'i 'menu-alani' ID'li div'in içine bas
      menuAlani.innerHTML = htmlCikti;
    })
    .catch(error => {
      // Bir hata olursa, 'menu-alani' içinde bir hata mesajı göster
      console.error('Menü yüklenirken hata oluştu:', error);
      const menuAlani = document.getElementById('menu-alani');
      menuAlani.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Menü yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.
        </div>`;
    });
});