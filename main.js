<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastro de Vagas</title>
</head>
<body>
    <form id="cadastro-form">
        <input type="text" id="placa" placeholder="Placa" required>
        <input type="text" id="nome" placeholder="Nome" required>
        <input type="text" id="apartamento" placeholder="Apartamento" required>
        <input type="text" id="bloco" placeholder="Bloco" required>
        <input type="text" id="modelo" placeholder="Modelo do carro" required>
        <input type="text" id="cor" placeholder="Cor do carro" required>
        <input type="number" id="vaga" placeholder="Número da vaga" required>
        <button type="submit">Cadastrar</button>
    </form>

    <h2>Vagas Ocupadas</h2>
    <ul id="lista-vagas"></ul>

    <h2>Vagas Disponíveis</h2>
    <ul id="vagas-disponiveis"></ul>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("cadastro-form");
            const lista = document.getElementById("lista-vagas");
            const disponiveis = document.getElementById("vagas-disponiveis");

            let vagasTotais = Array.from({ length: 10 }, (_, i) => i + 1);
            let dados = JSON.parse(localStorage.getItem("reservas")) || [];

            if (form) {
                form.addEventListener("submit", function (e) {
                    e.preventDefault();

                    const placa = document.getElementById("placa");
                    const nome = document.getElementById("nome");
                    const apartamento = document.getElementById("apartamento");
                    const bloco = document.getElementById("bloco");
                    const modelo = document.getElementById("modelo");
                    const cor = document.getElementById("cor");
                    const vaga = document.getElementById("vaga");

                    const reserva = {
                        placa: placa.value,
                        nome: nome.value,
                        apartamento: apartamento.value,
                        bloco: bloco.value,
                        modelo: modelo.value,
                        cor: cor.value,
                        vaga: parseInt(vaga.value)
                    };

                    console.log(reserva);
                    dados.push(reserva);
                    localStorage.setItem("reservas", JSON.stringify(dados));
                    alert("Cadastro realizado com sucesso!");
                    form.reset();
                    location.reload(); // Atualiza para mostrar nova lista
                });
            }

            if (lista) {
                dados.forEach((item, index) => {
                    const li = document.createElement("li");
                    li.textContent = `${item.vaga} - ${item.placa} - ${item.nome}`;
                    const btn = document.createElement("button");
                    btn.textContent = "Remover";
                    btn.onclick = () => {
                        dados.splice(index, 1);
                        localStorage.setItem("reservas", JSON.stringify(dados));
                        location.reload();
                    };
                    li.appendChild(btn);
                    lista.appendChild(li);
                });
            }

            if (disponiveis) {
                const ocupadas = dados.map(r => r.vaga);
                const livres = vagasTotais.filter(v => !ocupadas.includes(v));
                livres.forEach(vaga => {
                    const li = document.createElement("li");
                    li.textContent = `Vaga ${vaga}`;
                    disponiveis.appendChild(li);
                });
            }
        });
    </script>
</body>
</html>
