/*==================================================
    BLOOM BOUQUET
    SCRIPT.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initDarkMode();
    initBackToTop();
    initSmoothScroll();
    initSearch();

});


/*==================================================
    LOADER
==================================================*/

function initLoader(){

    window.addEventListener("load",()=>{

        const loader=document.querySelector(".loader");

        if(!loader) return;

        setTimeout(()=>{

            loader.classList.add("hide");

        },700);

    });

}


/*==================================================
    DARK MODE
==================================================*/

function initDarkMode(){

    const button=document.getElementById("themeBtn");

    if(!button) return;

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add("dark");

        button.innerHTML='<i class="fas fa-sun"></i>';

    }

    button.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            button.innerHTML='<i class="fas fa-sun"></i>';

        }else{

            localStorage.setItem("theme","light");

            button.innerHTML='<i class="fas fa-moon"></i>';

        }

    });

}


/*==================================================
    BACK TO TOP
==================================================*/

function initBackToTop(){

    const button=document.querySelector(".back-top");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*==================================================
    SMOOTH SCROLL
==================================================*/

function initSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}


/*==================================================
    LIVE SEARCH
==================================================*/

function initSearch(){

    const input=document.getElementById("search");

    if(!input) return;

    const products=document.querySelectorAll(".product-card");

    input.addEventListener("keyup",()=>{

        const keyword=input.value.toLowerCase();

        products.forEach(card=>{

            const title=card.querySelector("h3").textContent.toLowerCase();

            if(title.includes(keyword)){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

}
/*==================================================
    SHOPPING CART
==================================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector(".cart-count");

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

function updateCartCount(){

    if(!cartCount) return;

    const total = cart.reduce((sum,item)=>{

        return sum + item.quantity;

    },0);

    cartCount.textContent = total;

}

function addToCart(product){

    const exist = cart.find(item=>item.id===product.id);

    if(exist){

        exist.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    showToast(product.name + " berhasil ditambahkan");

}

document.querySelectorAll(".cartBtn").forEach(button=>{

    button.addEventListener("click",()=>{

        const card = button.closest(".product-card");

        const product = {

            id:Number(card.dataset.id),

            name:card.dataset.name,

            price:Number(card.dataset.price),

            image:card.dataset.image

        };

        addToCart(product);

    });

});

updateCartCount();
/*==================================================
    WISHLIST
==================================================*/

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistCount = document.querySelector(".wishlist-count");

function saveWishlist(){

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

}

function updateWishlistCount(){

    if(!wishlistCount) return;

    wishlistCount.textContent = wishlist.length;

}

function addToWishlist(product){

    const exists = wishlist.find(item=>item.id===product.id);

    if(exists){

        showToast("Produk sudah ada di Wishlist ❤️");

        return;

    }

    wishlist.push(product);

    saveWishlist();

    showToast(product.name + " ditambahkan ke Wishlist ❤️");

}

updateWishlistCount();


/*==================================================
    TOAST NOTIFICATION
==================================================*/

function showToast(message){

    let toast = document.querySelector(".toast");

    if(!toast){

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


/*==================================================
    ADD WISHLIST BUTTON
==================================================*/

document.querySelectorAll(".product-card").forEach(card=>{

    card.addEventListener("dblclick",()=>{

        const product={

            id:Number(card.dataset.id),

            name:card.dataset.name,

            price:Number(card.dataset.price),

            image:card.dataset.image

        };

        addToWishlist(product);

    });

});


/*==================================================
    CART BUTTON ANIMATION
==================================================*/

document.querySelectorAll(".cartBtn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.add("clicked");

        setTimeout(()=>{

            button.classList.remove("clicked");

        },300);

    });

});


document.querySelectorAll(".wishlistBtn").forEach(button=>{

    button.addEventListener("click",()=>{

        const card=button.closest(".product-card");

        const product={

            id:Number(card.dataset.id),

            name:card.dataset.name,

            price:Number(card.dataset.price),

            image:card.dataset.image

        };

        toggleWishlist(product,button);

    });

});

function toggleWishlist(product,button){

    const index=wishlist.findIndex(item=>item.id===product.id);

    if(index>-1){

        wishlist.splice(index,1);

        button.classList.remove("active");

        button.innerHTML='<i class="far fa-heart"></i>';

        showToast("Produk dihapus dari Wishlist");

    }else{

        wishlist.push(product);

        button.classList.add("active");

        button.innerHTML='<i class="fas fa-heart"></i>';

        showToast("Produk ditambahkan ke Wishlist");

    }

    saveWishlist();

}


/*==================================================
    RESTORE WISHLIST
==================================================*/

function restoreWishlist(){

    document.querySelectorAll(".product-card").forEach(card=>{

        const id=Number(card.dataset.id);

        const button=card.querySelector(".wishlistBtn");

        if(!button) return;

        const exists=wishlist.find(item=>item.id===id);

        if(exists){

            button.classList.add("active");

            button.innerHTML='<i class="fas fa-heart"></i>';

        }

    });

}

restoreWishlist();
/*==================================================
    PART 5
    QUICK VIEW
==================================================*/

const quickView=document.getElementById("quickView");

const quickImage=document.getElementById("quickImage");

const quickTitle=document.getElementById("quickTitle");

const quickPrice=document.getElementById("quickPrice");

const quickCart=document.getElementById("quickCart");

const closeQuick=document.querySelector(".closeQuick");

document.querySelectorAll(".product-card img").forEach(image=>{

    image.addEventListener("click",()=>{

        const card=image.closest(".product-card");

        quickImage.src=card.dataset.image;

        quickTitle.textContent=card.dataset.name;

        quickPrice.textContent=
        "Rp"+Number(card.dataset.price).toLocaleString("id-ID");

        quickCart.dataset.id=card.dataset.id;

        quickView.classList.add("show");

    });

});

closeQuick.addEventListener("click",()=>{

    quickView.classList.remove("show");

});

quickView.addEventListener("click",(e)=>{

    if(e.target===quickView){

        quickView.classList.remove("show");

    }

});

quickCart.addEventListener("click",()=>{

    const card=document.querySelector(
        `.product-card[data-id="${quickCart.dataset.id}"]`
    );

    if(!card) return;

    const product={

        id:Number(card.dataset.id),

        name:card.dataset.name,

        price:Number(card.dataset.price),

        image:card.dataset.image

    };

    addToCart(product);

    quickView.classList.remove("show");

});
