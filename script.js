const elements = document.querySelectorAll('.fade-left, .fade-right');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    elements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.classList.add('show');
        }
    });
}

window.addEventListener('scroll', checkScroll);
checkScroll(); // cek saat halaman pertama kali dimuat

//========================= Upadate Cart & Notifikasi ==========================//
// AMBIL CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE BADGE
function updateCartUI() {
    let count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
}

function tambahPesanan(nama, harga, gambar) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    keranjang.push({
        nama: nama,
        harga: harga,
        gambar: gambar
    });

    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    alert(nama + " berhasil ditambahkan!");
}

function tampilPesanan() {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    let list = document.getElementById("order-list");
    let total = 0;

    if (!list) return;

    list.innerHTML = "";

    keranjang.forEach(item => {
        list.innerHTML += `
            <div class="order-item">
                <img src="${item.gambar}" width="70">
                <div>
                    <h4>${item.nama}</h4>
                    <p>Rp ${item.harga}</p>
                </div>
            </div>
        `;
        total += item.harga;
    });

    document.getElementById("total").innerText = total;
}

// tampil otomatis
if (document.getElementById("order-list")) {
    tampilPesanan();
}

// pilih metode
function pilihMetode() {
    let metode = document.getElementById("metode").value;
    let qr = document.getElementById("qr-container");

    if (metode === "qr") {
        qr.classList.remove("hidden");
    } else {
        qr.classList.add("hidden");
    }
}

// checkout animasi
function prosesPesanan() {
    let status = document.getElementById("status");

    status.innerHTML = "👨‍🍳 Pesanan sedang dibuat...";

    setTimeout(() => {
        status.innerHTML = "🔥 Sedang dimasak...";
    }, 2000);

    setTimeout(() => {
        status.innerHTML = "🚚 Sedang diantar...";
    }, 4000);

    setTimeout(() => {
        status.innerHTML = "🎉 Pesanan selesai! Terima kasih 🙏";
        localStorage.removeItem("keranjang");
    }, 6000);
}

function checkout() {
    let metode = document.getElementById("metode").value;
    let status = document.getElementById("status");

    status.classList.remove("hidden");

    if (metode === "qr") {
        status.innerHTML = "📱 Silakan scan QR dan lakukan pembayaran...";
        document.getElementById("konfirmasi-bayar").classList.remove("hidden");
    } else {
        prosesPesanan();
    }
}

function konfirmasiBayar() {
    let status = document.getElementById("status");

    status.innerHTML = "✅ Pembayaran berhasil diverifikasi!";
    
    setTimeout(() => {
        prosesPesanan();
    }, 1500);
}

// LOAD PESANAN
function loadOrder() {
    let list = document.getElementById("order-list");
    let total = 0;

    if (!list) return;

    list.innerHTML = "";

    cart.forEach(item => {
        total += item.price;

        list.innerHTML += `
            <div class="order-item">
                <span>${item.name}</span>
                <span>Rp ${item.price}</span>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

loadOrder();

function kePesanan() {
    window.location.href = "pesanan.html";
}

// STATUS PESANAN
function startStatus() {
    let status = document.getElementById("status");
    let text = document.getElementById("status-text");

    status.classList.remove("hidden");
    status.classList.add("animate");

    text.innerText = "Pesanan sedang dibuat...";

    setTimeout(() => {
        text.innerText = "Pesanan sedang diantar...";
    }, 3000);

    setTimeout(() => {
        text.innerText = "Pesanan selesai ✅";
        status.classList.remove("animate");

        // kosongkan cart
        localStorage.removeItem("cart");
    }, 6000);
}

// NOTIFIKASI
function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// LOAD SAAT HALAMAN DIBUKA
updateCartUI();

function tambahPesanan(nama, harga, gambar) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    keranjang.push({ nama, harga, gambar });

    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    alert("Berhasil ditambahkan!");
}

//========================= AUTO SLIDE ==========================//

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");

    index++;
    if (index >= slides.length) index = 0;
}

// ganti setiap 3 detik
setInterval(showSlide, 3000);


//========================= Image about us ==========================//

const revealSection = document.querySelector('.image-reveal');

function revealOnScroll() {
    const trigger = window.innerHeight * 0.8;
    const top = revealSection.getBoundingClientRect().top;

    if (top < trigger) {
        revealSection.classList.add('active');
    }
}

window.addEventListener('scroll', revealOnScroll);

//========================= About ==========================//

const about = document.querySelector('.about-content');

window.addEventListener('scroll', () => {
    const pos = about.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
        about.classList.add('show');
    }
});

//========================= ANIMASI KEREN ==========================//

function checkout() {
    let status = document.getElementById("status");

    status.innerHTML = "⏳ Pesanan sedang dibuat...";

    setTimeout(() => {
        status.innerHTML = "🚚 Pesanan sedang diantar...";
    }, 3000);

    setTimeout(() => {
        status.innerHTML = "✅ Pesanan selesai!";
        localStorage.removeItem("keranjang");
    }, 6000);
}

// ========================= AUTO LOAD ===========================//
document.addEventListener("DOMContentLoaded", function () {
    tampilPesanan();
});


// ========================= COOKIE ACCEPT ===========================//
function acceptCookies() {
    document.getElementById("cookie-box").style.display = "none";
    localStorage.setItem("cookiesAccepted", "true");
}

// cek saat load
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("cookiesAccepted") === "true") {
        let box = document.getElementById("cookie-box");
        if (box) box.style.display = "none";
    }
});

// ========================= SEARCH BOX ===========================//
function toggleSearch() {
    document.getElementById("search-box").classList.toggle("hidden");
}

function closeSearch() {
    document.getElementById("search-box").classList.add("hidden");
}

document.getElementById("search-input").addEventListener("keyup", function() {
    let keyword = this.value.toLowerCase();
    // nanti hubungkan ke menu
});