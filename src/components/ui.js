import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

const STATUS_CONFIG = {
  ativo: { label: 'ATIVO', color: colors.alert },
  monitoramento: { label: 'MONITORAMENTO', color: colors.ember },
  controlado: { label: 'CONTROLADO', color: colors.signal },
  extinto: { label: 'EXTINTO', color: colors.ok },
};

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.monitoramento;
  return (
    <View style={[styles.badge, { borderColor: cfg.color }]}>
      <View style={[styles.badgeDot, { backgroundColor: cfg.color }]} />
      <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

export function FocoCard({ foco, onPress, favorito }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardId}>{foco.id}</Text>
        <StatusBadge status={foco.status} />
      </View>

      <Text style={styles.cardTitle}>
        {favorito ? '★ ' : ''}
        {foco.municipio}
      </Text>
      <Text style={styles.cardRegion}>{foco.regiao}</Text>

      <View style={styles.cardFooter}>
        <Text style={styles.cardMeta}>
          {foco.instrument} · {foco.satellite}
        </Text>
        <Text style={styles.cardMeta}>
          {foco.acq_date} {foco.acq_time}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function StatCard({ valor, rotulo, destaque }) {
  return (
    <View style={[styles.stat, destaque && styles.statDestaque]}>
      <Text style={[styles.statValor, destaque && { color: colors.ember }]}>
        {valor}
      </Text>
      <Text style={styles.statRotulo}>{rotulo}</Text>
    </View>
  );
}

export function PrimaryButton({ titulo, onPress, disabled, variant = 'ember' }) {
  const bg = variant === 'ember' ? colors.ember : colors.panelSoft;
  const fg = variant === 'ember' ? '#1A0D05' : colors.text;
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bg }, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.btnText, { color: fg }]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

export function DetailRow({ rotulo, valor }) {
  return (
    <View style={styles.detailRow}>
      <Text style={typography.label}>{rotulo}</Text>
      <Text style={styles.detailValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    gap: 5,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  card: {
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardId: { color: colors.signal, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  cardRegion: { color: colors.textDim, fontSize: 13, marginTop: 2 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm + 4,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: spacing.sm,
  },
  cardMeta: { color: colors.textFaint, fontSize: 11.5 },

  stat: {
    flex: 1,
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    alignItems: 'center',
  },
  statDestaque: { borderColor: colors.ember },
  statValor: { fontSize: 28, fontWeight: '800', color: colors.text },
  statRotulo: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.textFaint,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
    textAlign: 'center',
  },

  btn: {
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { fontSize: 15, fontWeight: '800', letterSpacing: 0.5 },

  detailRow: {
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    gap: 3,
  },
  detailValor: { color: colors.text, fontSize: 15, fontWeight: '500' },
});
