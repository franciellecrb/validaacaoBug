/* ==========================================
   QA STORES
   storage.js
========================================== */

const STORAGE={
    USERS:"qa_users",
    SESSION:"qa_logged_user",
    CART:"qa_cart",
    ORDERS:"qa_orders"
};

function getUsers(){
    const users=localStorage.getItem(STORAGE.USERS);
    if(users){
        return JSON.parse(users);
    }
    return [];
}
function saveUsers(users){
    localStorage.setItem(
        STORAGE.USERS,
        JSON.stringify(users)
    );
}

function getSession(){
    const session=localStorage.getItem(
        STORAGE.SESSION
    );
    if(session){
        return JSON.parse(session);
    }
    return null;
}
function saveSession(user){
    localStorage.setItem(
        STORAGE.SESSION,
        JSON.stringify(user)
    );
}
function clearSession(){
    localStorage.removeItem(
        STORAGE.SESSION
    );
}

function getCart(){
    const cart=localStorage.getItem(
        STORAGE.CART
    );
    if(cart){
        return JSON.parse(cart);
    }
    return [];
}
function saveCart(cart){
    localStorage.setItem(
        STORAGE.CART,
        JSON.stringify(cart)
    );
}
function clearCart(){
    localStorage.removeItem(
        STORAGE.CART
    );
}

function getOrders(){
    const orders=localStorage.getItem(
        STORAGE.ORDERS
    );
    if(orders){
        return JSON.parse(orders);
    }
    return [];
}
function saveOrders(orders){
    localStorage.setItem(
        STORAGE.ORDERS,
        JSON.stringify(orders)
    );
}

function resetDatabase(){
    localStorage.removeItem(STORAGE.USERS);
    localStorage.removeItem(STORAGE.SESSION);
    localStorage.removeItem(STORAGE.CART);
    localStorage.removeItem(STORAGE.ORDERS);
}
function databaseInfo(){
    console.log("Usuários:",getUsers());
    console.log("Sessão:",getSession());
    console.log("Carrinho:",getCart());
    console.log("Pedidos:",getOrders());
}

(function(){
    if(!localStorage.getItem(STORAGE.USERS)){
        saveUsers([]);
    }
    if(!localStorage.getItem(STORAGE.CART)){
        saveCart([]);
    }
    if(!localStorage.getItem(STORAGE.ORDERS)){
        saveOrders([]);
    }
})();