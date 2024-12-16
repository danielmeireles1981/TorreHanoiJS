// script.js

let origem = [];
let auxiliar = [];
let destino = [];
let torres = { origem, auxiliar, destino };
let contadorMovimentos = 0;
let contadorDiscos = {};

// Função para configurar o número de discos e inicializar as torres
function inicializarTorres(numDiscos) {
    origem = Array.from({ length: numDiscos }, (_, i) => numDiscos - i); // Torre de origem com discos
    auxiliar = [];
    destino = [];
    
    torres = { origem, auxiliar, destino };
    contadorMovimentos = 0;
    contadorDiscos = {};  // Reinicia o contador de movimentos para cada disco

    // Inicializa o contador de cada disco com 0 movimentos
    for (let i = 1; i <= numDiscos; i++) {
        contadorDiscos[i] = 0;
    }

    document.getElementById("movimentos").innerText = `Movimentos Executados: ${contadorMovimentos}`;
    atualizarContadorDiscos();
    criarDiscos();
}

// Função para criar visual dos discos com base no estado das torres
function criarDiscos() {
    for (let torre in torres) {
        const torreDiv = document.getElementById(torre);
        torreDiv.innerHTML = "";  // Limpa a torre

        torres[torre].forEach((disco, index) => {
            const discoDiv = document.createElement("div");
            discoDiv.className = `disco disco-${disco}`; // Aplica a classe específica de cor
            discoDiv.style.bottom = `${index * 25}px`;
            torreDiv.appendChild(discoDiv);
        });
    }
}

// Função para gerar a sequência de movimentos da Torre de Hanoi
function gerarMovimentos(n, origem, destino, auxiliar, movimentos) {
    if (n > 0) {
        gerarMovimentos(n - 1, origem, auxiliar, destino, movimentos);
        movimentos.push({ from: origem, to: destino });
        gerarMovimentos(n - 1, auxiliar, destino, origem, movimentos);
    }
}

// Função para atualizar a exibição da contagem de movimentos de cada disco
function atualizarContadorDiscos() {
    const contadorDiv = document.getElementById("contadorDiscos");
    contadorDiv.innerHTML = "";  // Limpa o conteúdo

    for (let disco in contadorDiscos) {
        const discoContagem = document.createElement("p");
        discoContagem.innerText = `Disco ${disco}: ${contadorDiscos[disco]} movimentos`;
        contadorDiv.appendChild(discoContagem);
    }
}

// Função para executar os movimentos com animação
function executarMovimentos(movimentos) {
    if (movimentos.length === 0) return;

    const { from, to } = movimentos.shift();
    const disco = from[from.length - 1];  // Identifica qual disco está sendo movido
    to.push(from.pop());
    contadorMovimentos++;
    contadorDiscos[disco]++;  // Incrementa a contagem para o disco específico

    document.getElementById("movimentos").innerText = `Movimentos Executados: ${contadorMovimentos}`;
    atualizarContadorDiscos();  // Atualiza a exibição da contagem de movimentos por disco
    criarDiscos();

    setTimeout(() => executarMovimentos(movimentos), 500);
}

// Função para iniciar a Torre de Hanoi com o número de discos especificado
function iniciarHanoi() {
    const numDiscos = parseInt(document.getElementById("numDiscos").value);
    if (isNaN(numDiscos) || numDiscos < 1) {
        alert("Por favor, insira um número válido de discos (mínimo 1).");
        return;
    }

    const movimentos = [];
    inicializarTorres(numDiscos);
    gerarMovimentos(numDiscos, origem, destino, auxiliar, movimentos);
    executarMovimentos(movimentos);
}
