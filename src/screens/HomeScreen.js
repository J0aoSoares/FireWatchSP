import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { RESUMO, FOCOS } from '../data/focos';
import { listarRelatos } from '../services/storage';
import { StatCard, FocoCard } from '../components/ui';
import { colors, spacing, typography } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  const [totalRelatos, setTotalRelatos] = useState(0);

  useFocusEffect(
    useCallback(() => {
      listarRelatos().then((r) => setTotalRelatos(r.length));
    }, [])
  );

  const focosAtivos = FOCOS.filter((f) => f.status === 'ativo');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={typography.label}>Última passagem orbital</Text>
      <Text style={styles.passagem}>{RESUMO.ultimaPassagem}</Text>

      <View style={styles.statsRow}>
        <StatCard valor={RESUMO.focosAtivos} rotulo="Focos ativos" destaque />
        <StatCard valor={RESUMO.emMonitoramento} rotulo="Em monitoramento" />
      </View>
      <View style={styles.statsRow}>
        <StatCard valor={RESUMO.ultimas72h} rotulo="Detecções 72h" />
        <StatCard valor={`${RESUMO.frpMedio}`} rotulo="FRP médio (MW)" />
      </View>
      <View style={styles.statsRow}>
        <StatCard valor={totalRelatos} rotulo="Relatos do cidadão" />
      </View>

      <Text style={[typography.label, styles.secao]}>Atenção imediata</Text>
      {focosAtivos.map((foco) => (
        <FocoCard
          key={foco.id}
          foco={foco}
          onPress={() => navigation.navigate('Focos', {
            screen: 'FocoDetalhe',
            params: { focoId: foco.id },
            initial: false,
          })}
        />
      ))}

      <Text style={styles.rodape}>
        Dados de detecção no formato NASA FIRMS (VIIRS/MODIS), integrados ao
        pipeline de Big Data do grupo — Global Solution 2026.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.space },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  passagem: {
    color: colors.signal,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: spacing.md,
  },
  statsRow: { flexDirection: 'row', gap: spacing.sm + 4, marginBottom: spacing.sm + 4 },
  secao: { marginTop: spacing.md, marginBottom: spacing.sm + 4 },
  rodape: {
    color: colors.textFaint,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
