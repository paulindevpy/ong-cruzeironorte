import { salvarNoStorage, buscarDoStorageSeguro } from './storage.js';

function sanitizarEntrada(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
}

export function renderizarVoluntarios() {
    const lista = buscarDoStorageSeguro('voluntarios');
    const container = document.getElementById('lista-cadastrados');
    if (!container) return;

    container.innerHTML = lista.map(v => `<p>Voluntário: <strong>${v.nome}</strong></p>`).join('');
}

export function escutarFormulario() {
    const form = document.getElementById('form-voluntario');
    const inputNome = document.getElementById('input-nome');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const nomeSanitizado = sanitizarEntrada(inputNome.value.trim());
            if (!nomeSanitizado) throw new Error("O campo Nome não pode estar vazio.");
            
            const lista = buscarDoStorageSeguro('voluntarios');
            lista.push({ nome: nomeSanitizado });
            salvarNoStorage('voluntarios', lista);
            
            renderizarVoluntarios();
            form.reset();
        } catch (erro) {
            alert(erro.message);
        }
    });
}

export function carregarGraficoDoacoes() {
    const ctx = document.getElementById('meuGrafico');
    if (!ctx || typeof Chart === 'undefined') return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Agasalho', 'Horta Comunitária', 'Informática'],
            datasets: [{
                label: 'Meta Atingida (%)',
                data: [85, 60, 40],
                backgroundColor: ['#1b4965', '#62b6cb', '#cae9ff']
            }]
        },
        options: { responsive: true }
    });
}
