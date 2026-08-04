/* ==========================================
   QA STORES
   produtos.js
   Parte 1 - Catálogo e Renderização
========================================== */

/*
    BUGS PROPOSITAIS

    BUG 11 - Produto com preço negativo
    BUG 12 - Produto sem imagem
    BUG 13 - Produto duplicado
    BUG 14 - Produto sem descrição
    BUG 15 - Busca diferencia maiúsculas e minúsculas
    BUG 16 - Busca pesquisa apenas pelo nome
    BUG 17 - Filtro "Todos" não restaura corretamente
    BUG 18 - Ordenação altera permanentemente o vetor original
*/

const produtos=[
    {
        id:1,
        nome:"Notebook Dell Inspiron 15",
        categoria:"notebooks",
        preco:4299.90,
        precoAntigo:4899.90,
        descricao:"Notebook Intel Core i7, 16GB RAM e SSD de 512GB.",
        imagem:"https://images.pexels.com/photos/18105/pexels-photo.jpg"
    },
    {
        id:2,
        nome:"MacBook Air M3",
        categoria:"notebooks",
        preco:8999.90,
        precoAntigo:9499.90,
        descricao:"Chip Apple M3, 16GB RAM e SSD de 512GB.",
        imagem:"https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg"
    },
    {
        id:3,
        nome:"Samsung Galaxy S25",
        categoria:"smartphones",
        preco:5299.90,
        precoAntigo:5799.90,
        descricao:"Tela AMOLED de 6.7'', 256GB.",
        imagem:"https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg"
    },
    {
        id:4,
        nome:"iPhone 17",
        categoria:"smartphones",
        preco:8299.90,
        precoAntigo:8799.90,
        descricao:"Apple A19, 256GB.",
        imagem:"https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"
    },
    {
        id:5,
        nome:"Monitor LG UltraWide 29",
        categoria:"monitores",
        preco:1499.90,
        precoAntigo:1699.90,
        descricao:"Monitor IPS Full HD UltraWide.",
        imagem:"https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
    },
    {
        id:6,
        nome:"Teclado Mecânico Redragon",
        categoria:"perifericos",
        preco:289.90,
        precoAntigo:359.90,
        descricao:"Switch Blue ABNT2.",
        imagem:"https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg"
    },
    {
        id:7,
        nome:"Mouse Logitech G502",
        categoria:"perifericos",
        preco:249.90,
        precoAntigo:319.90,
        descricao:"Mouse Gamer RGB.",
        imagem:"https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg"
    },
    {
        id:8,
        nome:"Headset HyperX Cloud II",
        categoria:"audio",
        preco:399.90,
        precoAntigo:499.90,
        descricao:"Áudio 7.1 Virtual.",
        imagem:"https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
    },
    {
        id:9,
        nome:"Echo Dot",
        categoria:"audio",
        preco:299.90,
        precoAntigo:349.90,
        descricao:"Assistente virtual Alexa.",
        imagem:"https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg"
    },
    {
        id:10,
        nome:"SSD Kingston 1TB",
        categoria:"perifericos",
        preco:-599.90,
        precoAntigo:699.90,
        descricao:"SSD NVMe PCIe.",
        imagem:"https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
    },
    {
        id:11,
        nome:"Monitor Samsung Odyssey",
        categoria:"monitores",
        preco:2899.90,
        precoAntigo:3199.90,
        descricao:"Monitor Gamer Curvo 32''.",
        imagem:""
    },
    {
        id:7,
        nome:"Mouse Logitech G502",
        categoria:"perifericos",
        preco:249.90,
        precoAntigo:319.90,
        descricao:"Mouse Gamer RGB.",
        imagem:"https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg"
    },
    {
        id:12,
        nome:"Galaxy Buds Pro",
        categoria:"audio",
        preco:799.90,
        precoAntigo:899.90,
        descricao:"",
        imagem:"https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg"
    }
];

function renderProducts(lista=produtos){
    const container=document.getElementById("products");
    if(!container){
        return;
    }
    container.innerHTML="";
    lista.forEach(produto=>{
        container.innerHTML+=`
        <article class="product-card">
            <img
                class="product-image"
                src="${produto.imagem}"
                alt="${produto.nome}">
            <div class="product-info">
                <span class="category">${produto.categoria}</span>
                <h3 class="product-name">${produto.nome}</h3>
                <p class="product-description">${produto.descricao}</p>
                <div class="price-area">
                    <span class="old-price">
                        R$ ${produto.precoAntigo.toFixed(2)}
                    </span>
                    <span class="price">
                        R$ ${produto.preco.toFixed(2)}
                    </span>
                </div>
                <button class="btn-buy" onclick="comprar(${produto.id})">Comprar</button>
            </div>
        </article>
        `;
    });
}

function comprar(id){
    const produto=produtos.find(function(item){
        return item.id===id;
    });
    if(!produto){
        return;
    }
    addToCart(
        produto.id,
        produto.nome,
        produto.preco,
        produto.imagem
    );
}

window.addEventListener("load",function(){
    renderProducts();
});

const campoPesquisa=document.getElementById("search");
const botaoPesquisa=document.getElementById("btnPesquisar");
if(botaoPesquisa){
    botaoPesquisa.addEventListener("click",pesquisar);
}
if(campoPesquisa){
    campoPesquisa.addEventListener("keyup",function(event){
        if(event.key==="Enter"){
            pesquisar();
        }
    });
}

function pesquisar(){
    const texto=campoPesquisa.value;
    const resultado=produtos.filter(function(produto){
        return produto.nome.includes(texto);
    });
    renderProducts(resultado);
}

const filtroCategoria=document.getElementById("categoria");
if(filtroCategoria){
    filtroCategoria.addEventListener("change",filtrarCategoria);
}

function filtrarCategoria(){
    const categoria=filtroCategoria.value;
    if(categoria==="todos"){
        const resultado=produtos.filter(function(produto){
            return produto.categoria==="notebooks";
        });
        renderProducts(resultado);
        return;
    }
    const resultado=produtos.filter(function(produto){
        return produto.categoria===categoria;
    });
    renderProducts(resultado);
}

const ordenacao=document.getElementById("ordenacao");
if(ordenacao){
    ordenacao.addEventListener("change",ordenarProdutos);
}

function ordenarProdutos(){
    const tipo=ordenacao.value;
    if(tipo==="menor"){
        produtos.sort(function(a,b){
            return a.preco-b.preco;
        });
    }
    if(tipo==="maior"){
        produtos.sort(function(a,b){
            return b.preco-a.preco;
        });
    }
    if(tipo==="nome"){
        produtos.sort(function(a,b){
            return a.nome.localeCompare(b.nome);
        });
    }
    renderProducts(produtos);
}

function limparBusca(){
    if(campoPesquisa){
        campoPesquisa.value="";
    }
    renderProducts(produtos);
}
