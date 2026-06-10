import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FOCOS } from '../data/focos';
import { listarFavoritos, alternarFavorito } from '../services/storage';
import { StatusBadge, DetailRow, PrimaryButton } from '../components/ui';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function FocoDetalheScreen({ route }) {
  const { focoId } = route.params;
  const foco = FOCOS.find((f) => f.id === focoId);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    listarFavoritos().then((favs) => setFavorito(favs.includes(focoId)));
  }, [focoId]);

  async function handleFavoritar() {
    const favs = await alternarFavorito(focoId);
    setFavorito(favs.includes(focoId));
  }

  if (!foco) {
    return (
      <View style={styles.container}>
        <Text style={typography.body}>Foco não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.id}>{foco.id}</Text>
        <StatusBadge status={foco.status} />
      </View>

      <Text style={typography.title}>{foco.municipio}</Text>
      <Text style={styles.regiao}>{foco.regiao}</Text>

      <Text style={styles.descricao}>{foco.descricao}</Text>

      <View style={styles.painel}>
        <Text style={[typography.label, { marginBottom: spacing.xs }]}>
          Telemetria do satélite
        </Text>
        <DetailRow rotulo="Instrumento" valor={`${foco.instrument} · ${foco.satellite}`} />
        <DetailRow rotulo="Detecção" valor={`${foco.acq_date} às ${foco.acq_time} (UTC-3)`} />
        <DetailRow rotulo="Coordenadas" valor={`${foco.latitude}, ${foco.longitude}`} />
        <DetailRow rotulo="Brilho (Kelvin)" valor={`${foco.brightness} K`} />
        <DetailRow rotulo="FRP — Potência Radiativa" valor={`${foco.frp} MW`} />
        <DetailRow rotulo="Confiança da detecção" valor={foco.confidence} />
      </View>

      <PrimaryButton
        titulo={favorito ? '★ Acompanhando este foco' : '☆ Acompanhar este foco'}
        variant={favorito ? 'ember' : 'soft'}
        onPress={handleFavoritar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.space },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  id: { color: colors.signal, fontWeight: '700', letterSpacing: 1 },
  regiao: { color: colors.textDim, fontSize: 15, marginTop: 2 },
  descricao: {
    ...typography.body,
    color: colors.textDim,
    marginTop: spacing.md,
  },
  painel: {
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginVertical: spacing.lg,
  },
});
