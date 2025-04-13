const clientes = document.getElementById("lista-clientes");

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

function listar() {
    fetch("https://ca6540313b924b1031de.free.beeceptor.com/api/users/")
        .then(response => response.json())
        .then(listaDeClientes => {
            clientes.innerHTML = "";
            listaDeClientes.forEach(cliente => {
                const item = document.createElement("li");
                item.setAttribute('data-id', cliente.id); 
                item.innerHTML = `
                    Nome: ${cliente.nome}<br>
                    Email: ${cliente.email}
                    <button onclick="remove('${cliente.id}')">Excluir</button>
                `;
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

document.getElementById("adc").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const novoCadastro = document.createElement("li");
    
    novoCadastro.innerHTML = `
        Nome: ${nome}<br>
        Email: ${email}
        <button onclick="this.parentElement.remove()">Excluir</button>
    `;
    clientes.appendChild(novoCadastro);
    limparCampos();

  
    fetch("https://ca6540313b924b1031de.free.beeceptor.com/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(data => {
        novoCadastro.setAttribute('data-id', data.id);
        novoCadastro.querySelector('button').onclick = () => remove(data.id);
    })
    .catch(error => {
        console.error("Erro ao cadastrar:", error);
    });
});