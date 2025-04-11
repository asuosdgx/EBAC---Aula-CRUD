const clientes = document.getElementById("lista-clientes");

// Função para limpar campos após cadastro
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

// Cadastrar usuário (POST)
document.getElementById("adc").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    fetch("https://ca6540313b924b1031de.free.beeceptor.com/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    })
        .then(response => response.json())
        .then(() => {
            limparCampos(); 
            document.getElementById("msg").textContent = "Usuário cadastrado com sucesso!";
        })
        .catch(error => console.error("Erro ao cadastrar:", error));
});


function listar() {
    fetch("https://ca6540313b924b1031de.free.beeceptor.com/api/users/")
        .then(response => response.json())
        .then(listaDeClientes => {
            clientes.innerHTML = ""; 

            listaDeClientes.forEach(cliente => {
                const item = document.createElement("li");
                item.setAttribute("data-id", cliente.id); 
                item.innerHTML = `
                Nome: ${cliente.nome} 
                Email: ${cliente.email} 
                <button onclick="remove('${cliente.id}')">Excluir</button>`;
                clientes.appendChild(item);
            });
        })
        .catch(error => console.error("Erro ao listar:", error));
}


function remove(id) {
    fetch(`https://ca6540313b924b1031de.free.beeceptor.com/api/users/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                const item = document.querySelector(`li[data-id="${id}"]`);
                if (item) item.remove();
            }
        })
        .catch(error => console.error("Erro ao excluir:", error));
}