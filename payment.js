const cart =
JSON.parse(localStorage.getItem("cart")) || [];

const summary =
document.getElementById("orderSummary");

const grand =
document.getElementById("grandTotal");

let total=0;

cart.forEach(item=>{

total += item.price * item.quantity;

summary.innerHTML += `

<p>

${item.name}

(${item.quantity}x)

<span>

Rp${(item.price*item.quantity)
.toLocaleString("id-ID")}

</span>

</p>

`;

});

total += 20000;

grand.textContent =
"Rp"+total.toLocaleString("id-ID");

document
.getElementById("payNow")
.addEventListener("click",()=>{

alert("Pembayaran Berhasil 🎉");

localStorage.removeItem("cart");

window.location.href="success.html";

});