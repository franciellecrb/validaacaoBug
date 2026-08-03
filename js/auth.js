/*
    BUGS PROPOSITAIS IMPLEMENTADOS

    BUG 01 - Senha pode ficar vazia
    BUG 02 - Email não é validado
    BUG 05 - Permite cadastro duplicado
    BUG 06 - Nome aceita números
    BUG 07 - Senha de 1 caractere
    BUG 08 - Confirmação de senha é ignorada
    BUG 09 - Campos com espaços são aceitos
    BUG 10 - Cadastro é salvo duas vezes
    BUG 03 - Nome do usuário não atualiza corretamente
    BUG 04 - Logout não limpa a sessão
    BUG 08 - Confirmação da senha ignorada
    BUG 09 - Campos vazios aceitos
    BUG 27 - Telefone aceita qualquer texto

*/
const USERS_KEY = "qa_users";
const SESSION_KEY = "qa_logged_user";
function getUsers(){
    const users = localStorage.getItem(USERS_KEY);
    if(users){
        return JSON.parse(users);
    }
    return [];
}
function saveUsers(users){
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}
const registerForm = document.getElementById("registerForm");
if(registerForm){
    registerForm.addEventListener("submit",function(event){
        event.preventDefault();
        const nome=document.getElementById("nome").value;
        const email=document.getElementById("email").value;
        const telefone=document.getElementById("telefone").value;
        const senha=document.getElementById("senha").value;
        const confirmarSenha=document.getElementById("confirmarSenha").value;
        const newsletter=document.getElementById("newsletter").checked;
        let users=getUsers();
        const novoUsuario={
            id:Date.now(),
            nome:nome,
            email:email,
            telefone:telefone,
            senha:senha,
            newsletter:newsletter,
            pedidos:[]
        };
        users.push(novoUsuario);
        users.push(novoUsuario);
        saveUsers(users);
        alert("Cadastro realizado com sucesso!");
        window.location.href="login.html";
    });
}
const loginForm=document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit",function(event){
        event.preventDefault();
        const email=document.getElementById("email").value;
        const senha=document.getElementById("senha").value;
        const remember=document.getElementById("remember").checked;
        const users=getUsers();
        const usuario=users.find(function(user){
            return user.email===email;
        });
        if(usuario){
            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(usuario)
            );
            if(remember){
                localStorage.setItem("remember","true");
            }
            alert("Login realizado!");
            window.location.href="perfil.html";
        }
        else{
            alert("Usuário não encontrado.");
        }
    });
}

function getLoggedUser(){
    const user=localStorage.getItem(
        SESSION_KEY
    );
    if(user){
        return JSON.parse(user);
    }
    return null;
}

window.addEventListener("load",function(){
    const usuario=getLoggedUser();
    if(usuario){
        const userName=document.getElementById("userName");
        const userEmail=document.getElementById("userEmail");
        if(userName){
            userName.textContent=usuario.nome;
        }
        if(userEmail){
            userEmail.textContent=usuario.email;
        }
    }
});

const profileForm=document.getElementById("profileForm");
if(profileForm){
    const usuario=getLoggedUser();
    if(usuario){
        document.getElementById("nome").value=usuario.nome;
        document.getElementById("email").value=usuario.email;
        document.getElementById("telefone").value=usuario.telefone;
    }
    profileForm.addEventListener("submit",function(event){
        event.preventDefault();
        const usuario=getLoggedUser();
        if(!usuario){
            alert("Usuário não encontrado.");
            return;
        }
        usuario.nome=document.getElementById("nome").value;
        usuario.email=document.getElementById("email").value;
        usuario.telefone=document.getElementById("telefone").value;
        const users=getUsers();
        const indice=users.findIndex(function(user){
            return user.id===usuario.id;
        });
        if(indice>=0){
            users[indice]=usuario;
            saveUsers(users);
        }
        alert("Dados salvos com sucesso!");
    });
}
const passwordForm=document.getElementById("passwordForm");
if(passwordForm){
    passwordForm.addEventListener("submit",function(event){
        event.preventDefault();
        const usuario=getLoggedUser();
        if(!usuario){
            alert("Usuário não encontrado.");
            return;
        }
        const novaSenha=document.getElementById("novaSenha").value;
        const confirmarSenha=document.getElementById("confirmarSenha").value;
        usuario.senha=novaSenha;
        const users=getUsers();
        const indice=users.findIndex(function(user){
            return user.id===usuario.id;
        });
        if(indice>=0){
            users[indice]=usuario;
            saveUsers(users);
        }
        alert("Senha alterada com sucesso!");
    });
}
const logout=document.getElementById("logout");
if(logout){
    logout.addEventListener("click",function(event){
        event.preventDefault();
        window.location.href="login.html";
    });
}
window.addEventListener("load",function(){
    const pagina=window.location.pathname;
    if(pagina.includes("perfil")){
        const usuario=getLoggedUser();
        if(!usuario){
            alert("Faça login para acessar esta página.");
            window.location.href="login.html";
        }
    }
});
window.addEventListener("load",function(){
    const usuario=getLoggedUser();
    if(!usuario){
        return;
    }
    const avatar=document.querySelector(".profile-avatar img");
    if(avatar){
        avatar.src="https://ui-avatars.com/api/?background=667A4F&color=ffffff&name="+encodeURIComponent(usuario.nome);
    }
});
window.addEventListener("load",function(){
    const tabela=document.getElementById("ordersTable");
    if(!tabela){
        return;
    }
    const usuario=getLoggedUser();
    if(!usuario){
        return;
    }
});
