import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { obterSessao, encerrarSessao } from '../services/storage';
import { DetailRow, PrimaryButton } from '../components/ui';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function PerfilScreen({ navigation }) {
  const [sessao, setSessao] = useState(null);

  useEffect(() => {
    obterSessao().then(setSessao);
  }, []);

  function handleSair() {
    Alert.alert('Encerrar sessão', 'Deseja sair do FireWatch SP?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await encerrarSessao();
          navigation.getParent()?.replace('Login');
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.painel}>
        <Text style={[typography.label, { marginBottom: spacing.xs }]}>
          Sessão ativa
        </Text>
        <DetailRow rotulo="Usuário" valor={sessao?.nome ?? '—'} />
        <DetailRow rotulo="E-mail" valor={sessao?.email ?? '—'} />
      </View>

      <View style={styles.painel}>
        <Text style={[typography.label, { marginBottom: spacing.xs }]}>
          Sobre o projeto
        </Text>
        <Text style={typography.body}>
          O FireWatch SP conecta a exploração espacial a um problema real na
          Terra: as queimadas na Grande São Paulo. Sensores orbitais
          (VIIRS e MODIS, via NASA FIRMS) detectam focos de calor que são
          tratados pelo pipeline de Big Data do grupo e apresentados aqui ao
          cidadão, que também contribui com relatos locais.
        </Text>
        <View style={{ height: spacing.md }} />
        <DetailRow rotulo="Global Solution" valor="2026 · Espaço — Exploração Espacial e Soluções para a Terra" />
        <DetailRow rotulo="Disciplina" valor="Mobile Development e IoT" />
        <DetailRow rotulo="ODS" valor="13 — Ação Contra a Mudança Global do Clima" />
        <DetailRow rotulo="Fontes de dados" valor="NASA FIRMS (VIIRS/MODIS) · OpenWeather" />
      </View>

      <PrimaryButton titulo="Sair da conta" variant="soft" onPress={handleSair} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.space },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  painel: {
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
});
