/*==================================================
    BLOOM BOUQUET
    CART.JS
==================================================*/

const SHIPPING_COST = 20000;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");


/*==================================================
    FORMAT RUPIAH
==================================================*/

function formatRupiah(number){

    return new Intl.NumberFormat("id-ID",{
        style:"currency",
        currency:"IDR",
        minimumFractionDigits:0
    }).format(number);

}


/*==================================================
    SIMPAN CART
==================================================*/

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/*==================================================
    HITUNG TOTAL
==================================================*/

function updateSummary(){

    const subtotalHarga = cart.reduce((sum,item)=>{

        return sum + item.price * item.quantity;

    },0);

    document.getElementById("subtotal").textContent=
    formatRupiah(subtotalHarga);

    document.getElementById("discount").textContent=
    formatRupiah(discount);

    document.getElementById("total").textContent=
    formatRupiah(

        subtotalHarga
        + SHIPPING_COST
        - discount

    );

}


/*==================================================
    EMPTY CART
==================================================*/

function renderEmptyCart(){

    cartItems.innerHTML = `

        <div class="empty-cart">

            <h2>🛒 Keranjang Masih Kosong</h2>

            <p>

                Silakan pilih buket favoritmu terlebih dahulu.

            </p>

            <a href="index.html"
               class="btn">

                Mulai Belanja

            </a>

        </div>

    `;

    subtotal.textContent = formatRupiah(0);

    total.textContent = formatRupiah(SHIPPING_COST);

}
/*==================================================
    RENDER CART
==================================================*/

function renderCart(){

    if(cart.length===0){

        renderEmptyCart();

        return;

    }

    cartItems.innerHTML="";

    cart.forEach((product,index)=>{

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${product.image}"
                 alt="${product.name}">

            <div class="cart-info">

                <h3>${product.name}</h3>

                <h4>${formatRupiah(product.price)}</h4>

                <div class="quantity-box">

                    <button
                        class="minus"
                        data-index="${index}">

                        -

                    </button>

                    <span>

                        ${product.quantity}

                    </span>

                    <button
                        class="plus"
                        data-index="${index}">

                        +

                    </button>

                </div>

            </div>

            <button
                class="remove"
                data-index="${index}">

                <i class="fas fa-trash"></i>

            </button>

        </div>

        `;

    });
let discount = 0;
    updateSummary();

    attachEvents();

}
/*==================================================
    EVENT BUTTON
==================================================*/

function attachEvents(){

    document.querySelectorAll(".plus").forEach(button=>{

        button.addEventListener("click",()=>{

            const index=Number(button.dataset.index);

            cart[index].quantity++;

            saveCart();

            renderCart();

        });

    });


    document.querySelectorAll(".minus").forEach(button=>{

        button.addEventListener("click",()=>{

            const index=Number(button.dataset.index);

            if(cart[index].quantity>1){

                cart[index].quantity--;

            }else{

                cart.splice(index,1);

            }

            saveCart();
const couponButton=document.getElementById("applyCoupon");

if(couponButton){

    couponButton.addEventListener("click",()=>{

        const code=document
        .getElementById("couponInput")
        .value
        .toUpperCase();

        if(code==="BLOOM10"){

            discount=10000;

            showMessage("Voucher berhasil digunakan.");

        }

        else if(code==="FLOWER50"){

            discount=50000;

            showMessage("Voucher berhasil digunakan.");

        }

        else{

            discount=0;

            showMessage("Voucher tidak valid.");

        }

        updateSummary();

    });

}
            renderCart();

        });

    });


    document.querySelectorAll(".remove").forEach(button=>{

        button.addEventListener("click",()=>{

            const index=Number(button.dataset.index);

            if(confirm("Hapus produk dari keranjang?")){

                cart.splice(index,1);

                saveCart();

                renderCart();

            }

        });

    });

}
/*==================================================
    CHECKOUT BUTTON
==================================================*/

const checkoutButton=document.querySelector(".checkoutBtn");

if(checkoutButton){

    checkoutButton.addEventListener("click",()=>{

        if(cart.length===0){

            alert("Keranjang masih kosong.");

            return;

        }

        window.location.href="checkout.html";

    });

}


/*==================================================
    INIT
==================================================*/

renderCart();

function showMessage(message){

    alert(message);

}