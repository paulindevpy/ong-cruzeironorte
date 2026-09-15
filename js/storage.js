export function salvarNoStorage(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
    } catch (e) {
        console.error("Erro ao salvar no localStorage", e);
    }
}

export function buscarDoStorageSeguro(chave) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        console.error(`[Storage Error]: Dados corrompidos na chave "${chave}".`, e);
        localStorage.removeItem(chave);
        return [];
    }
}
