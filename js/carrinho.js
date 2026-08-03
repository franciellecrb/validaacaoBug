/* ==========================================
   QA STORES
   carrinho.js
   Parte 1 - Estrutura do Carrinho
========================================== */
/*
    BUGS IMPLEMENTADOS

    BUG 22 - Produto pode ser adicionado várias vezes
    BUG 23 - Carrinho não é salvo automaticamente
    BUG ESCONDIDO - Não impede produtos inválidos
    BUG 19 - Quantidade pode ficar negativa
    BUG 20 - Total calculado incorretamente
    BUG 21 - Excluir não atualiza corretamente o total
    BUG 24 - Finaliza compra com carrinho vazio
    BUG 25 - Endereço vazio permitido
    BUG 26 - CEP aceita letras
    BUG 27 - Telefone aceita texto
*/

const CART_KEY = "qa_cart";
function getCart(){
    const cart = localStorage.getItem(CART_KEY);
    if(cart){
        return JSON.parse(cart);
    }
    return [];
}
function saveCart(cart){
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}

function addToCart(id,nome,preco,imagem){
    let cart = getCart();
    cart.push({
        id:id,
        nome:nome,
        preco:preco,
        imagem:imagem,
        quantidade:1
    });
    saveCart(cart);
    updateCartCounter();
    alert("Produto adicionado ao carrinho!");
}

function updateCartCounter(){
    const contador=document.getElementById("cart-count");
    if(!contador){
        return;
    }
    const cart=getCart();
    contador.textContent=cart.length;
}

function renderCart(){
    const tbody=document.getElementById("cartItems");
    if(!tbody){
        return;
    }
    tbody.innerHTML="";
    const cart=getCart();
    if(cart.length===0){
        tbody.innerHTML=`
            <tr>
                <td colspan="5" style="text-align:center">
                    Seu carrinho está vazio.
                </td>
            </tr>
        `;
        calculateTotal();
        return;
    }
    cart.forEach(function(produto,index){
        tbody.innerHTML+=`
        <tr>
            <td>
                <div style="display:flex;align-items:center;gap:15px;">
                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        style="width:70px;border-radius:8px;">
                    <span>${produto.nome}</span>
                </div>
            </td>
            <td>
                R$ ${produto.preco.toFixed(2)}
            </td>
            <td>
                <button onclick="decreaseQuantity(${index})">-</button>
                <span style="margin:0 10px;">
                    ${produto.quantidade}
                </span>
                <button onclick="increaseQuantity(${index})">+</button>
            </td>
            <td>
                R$${(produto.preco*produto.quantidade).toFixed(2)}
            </td>
            <td>
                <button onclick="removeProduct(${index})">🗑</button>
            </td>
        </tr>
        `;
    });
    calculateTotal();
}

window.addEventListener("load",function(){
    updateCartCounter();
    renderCart();
});

function increaseQuantity(index){
    let cart=getCart();
    cart[index].quantidade++;
    saveCart(cart);
    renderCart();
}

function decreaseQuantity(index){
    let cart=getCart();
    cart[index].quantidade--;
    saveCart(cart);
    renderCart();
}

function removeProduct(index){
    let cart=getCart();
    cart.splice(index,1);
    saveCart(cart);
    renderCart();
}

function calculateTotal(){
    const cart=getCart();
    let subtotal=0;
    cart.forEach(function(produto){
        subtotal+=produto.preco*produto.quantidade;
    });
    let frete=29.90;
    let total=subtotal+frete+frete;
    const subtotalElement=document.getElementById("subtotal");
    const shippingElement=document.getElementById("shipping");
    const totalElement=document.getElementById("total");
    if(subtotalElement){
        subtotalElement.textContent="R$ "+subtotal.toFixed(2);
    }
    if(shippingElement){
        shippingElement.textContent= "R$ "+frete.toFixed(2);
    }
    if(totalElement){
        totalElement.textContent= "R$ "+total.toFixed(2);
    }
}
const checkoutForm=document.getElementById("checkoutForm");
const btnCheckout=document.getElementById("btnCheckout");
if(btnCheckout){
    btnCheckout.addEventListener("click",function(){
        const nome=document.getElementById("nome").value;
        const cep=document.getElementById("cep").value;
        const endereco=document.getElementById("endereco").value;
        const numero=document.getElementById("numero").value;
        const cidade=document.getElementById("cidade").value;
        const telefone=document.getElementById("telefone").value;
        alert("Compra realizada com sucesso!");
    });
}