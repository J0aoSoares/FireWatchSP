import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SESSAO: '@firewatch:sessao',
  RELATOS: '@firewatch:relatos',
  FAVORITOS: '@firewatch:favoritos',
};

export async function salvarSessao(usuario) {
  await AsyncStorage.setItem(KEYS.SESSAO, JSON.stringify(usuario));
}

export async function obterSessao() {
  const raw = await AsyncStorage.getItem(KEYS.SESSAO);
  return raw ? JSON.parse(raw) : null;
}

export async function encerrarSessao() {
  await AsyncStorage.removeItem(KEYS.SESSAO);
}

export async function listarRelatos() {
  const raw = await AsyncStorage.getItem(KEYS.RELATOS);
  return raw ? JSON.parse(raw) : [];
}

export async function adicionarRelato(relato) {
  const atuais = await listarRelatos();
  const novo = {
    id: `R-${Date.now()}`,
    criadoEm: new Date().toISOString(),
    ...relato,
  };
  const atualizados = [novo, ...atuais];
  await AsyncStorage.setItem(KEYS.RELATOS, JSON.stringify(atualizados));
  return novo;
}

export async function removerRelato(id) {
  const atuais = await listarRelatos();
  const atualizados = atuais.filter((r) => r.id !== id);
  await AsyncStorage.setItem(KEYS.RELATOS, JSON.stringify(atualizados));
  return atualizados;
}

export async function listarFavoritos() {
  const raw = await AsyncStorage.getItem(KEYS.FAVORITOS);
  return raw ? JSON.parse(raw) : [];
}

export async function alternarFavorito(focoId) {
  const atuais = await listarFavoritos();
  const atualizados = atuais.includes(focoId)
    ? atuais.filter((id) => id !== focoId)
    : [...atuais, focoId];
  await AsyncStorage.setItem(KEYS.FAVORITOS, JSON.stringify(atualizados));
  return atualizados;
}
