import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  listarRelatos,
  adicionarRelato,
  removerRelato,
} from '../services/storage';
import { PrimaryButton } from '../components/ui';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function RelatarScreen() {
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [relatos, setRelatos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      listarRelatos().then(setRelatos);
    }, [])
  );

  async function handleEnviar() {
    if (!local.trim() || !descricao.trim()) {
      Alert.alert('Campos obrigatórios', 'Informe o local e a descrição do avistamento.');
      return;
    }
    await adicionarRelato({ local: local.trim(), descricao: descricao.trim() });
    setLocal('');
    setDescricao('');
    setRelatos(await listarRelatos());
    Alert.alert('Relato registrado', 'Obrigado! Seu relato foi salvo no dispositivo.');
  }

  function handleExcluir(id) {
    Alert.alert('Excluir relato', 'Deseja remover este relato?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => setRelatos(await removerRelato(id)),
      },
    ]);
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={relatos}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <Text style={typography.body}>
            Viu fumaça ou fogo na sua região? Registre aqui — relatos do cidadão
            ajudam a validar as detecções feitas por satélite.
          </Text>

          <Text style={[typography.label, { marginTop: spacing.lg }]}>Local</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Av. Cantareira, próximo ao parque"
            placeholderTextColor={colors.textFaint}
            value={local}
            onChangeText={setLocal}
          />

          <Text style={[typography.label, { marginTop: spacing.md }]}>
            Descrição
          </Text>
          <TextInput
            style={[styles.input, styles.inputArea]}
            placeholder="Descreva o que está vendo (fumaça, chamas, cheiro de queimado…)"
            placeholderTextColor={colors.textFaint}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={{ marginVertical: spacing.md }}>
            <PrimaryButton titulo="Enviar relato" onPress={handleEnviar} />
          </View>

          {relatos.length > 0 && (
            <Text style={[typography.label, { marginBottom: spacing.sm }]}>
              Meus relatos ({relatos.length})
            </Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.relato}>
          <View style={{ flex: 1 }}>
            <Text style={styles.relatoLocal}>{item.local}</Text>
            <Text style={styles.relatoDesc}>{item.descricao}</Text>
            <Text style={styles.relatoData}>
              {new Date(item.criadoEm).toLocaleString('pt-BR')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleExcluir(item.id)}>
            <Text style={styles.excluir}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.space },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  input: {
    backgroundColor: colors.panel,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.line,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginTop: spacing.xs,
    fontSize: 15,
  },
  inputArea: { minHeight: 100 },
  relato: {
    flexDirection: 'row',
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
    gap: spacing.sm,
  },
  relatoLocal: { color: colors.text, fontWeight: '700', fontSize: 15 },
  relatoDesc: { color: colors.textDim, fontSize: 13.5, marginTop: 3, lineHeight: 19 },
  relatoData: { color: colors.textFaint, fontSize: 11.5, marginTop: spacing.sm },
  excluir: { color: colors.alert, fontSize: 16, padding: 4 },
});
