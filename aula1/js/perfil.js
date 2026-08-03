/* ==========================================
   QA STORES
   perfil.js
========================================== */

/*
    BUGS PROPOSITAIS

    BUG 31 - Avatar não atualiza após alterar nome.
    BUG 32 - Botão Salvar mostra sucesso mesmo sem alterações.
    BUG 33 - Histórico de pedidos é igual para todos.
*/

const SESSION_KEY = "qa_logged_user";

function getLoggedUser(){
    const user = localStorage.getItem(SESSION_KEY);
    if(user){
        return JSON.parse(user);
    }
    return null;
}

function loadProfile(){
    const usuario = getLoggedUser();
    if(!usuario){
        window.location.href="login.html";
        return;
    }
    const nome = document.getElementById("userName");
    const email = document.getElementById("userEmail");
    if(nome){
        nome.textContent = usuario.nome;
    }
    if(email){
        email.textContent = usuario.email;
    }
    preencherFormulario(usuario);
    carregarPedidos();
}

function preencherFormulario(usuario){
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoTelefone = document.getElementById("telefone");
    if(campoNome){
        campoNome.value = usuario.nome;
    }
    if(campoEmail){
        campoEmail.value = usuario.email;
    }
    if(campoTelefone){
        campoTelefone.value = usuario.telefone;
    }
}

function carregarPedidos(){
    const tabela = document.getElementById("ordersTable");
    if(!tabela){
        return;
    }
    tabela.innerHTML = `
    <tr>
        <td>#1001</td>
        <td>15/07/2026</td>
        <td>R$ 2.499,90</td>
        <td>
            <span class="status status-success">Entregue</span>
        </td>
    </tr>
    <tr>
        <td>#1002</td>
        <td>22/07/2026</td>
        <td>R$ 349,90</td>
        <td>
            <span class="status status-warning">Em transporte</span>
        </td>
    </tr>
    `;
}

function loadAvatar(){
    const usuario = getLoggedUser();
    if(!usuario){
        return;
    }
    const avatar = document.querySelector(".profile-avatar img");
    if(!avatar){
        return;
    }
    avatar.src = "https://ui-avatars.com/api/?background=667A4F&color=ffffff&name="+
    encodeURIComponent(usuario.nome);
}

const profileForm = document.getElementById("profileForm");
if(profileForm){
    profileForm.addEventListener("submit",function(event){
        event.preventDefault();
        alert("Alterações salvas com sucesso!");
    });
}

const passwordForm = document.getElementById("passwordForm");
if(passwordForm){
    passwordForm.addEventListener("submit",function(event){
        event.preventDefault();
        alert("Senha alterada com sucesso!");
    });
}

const logout = document.getElementById("logout");
if(logout){
    logout.addEventListener("click",function(){
        window.location.href="login.html";
    });
}

window.addEventListener("load",function(){
    loadProfile();
    loadAvatar();
});