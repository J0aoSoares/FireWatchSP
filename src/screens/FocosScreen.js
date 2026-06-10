import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FOCOS } from '../data/focos';
import { listarFavoritos } from '../services/storage';
import { FocoCard } from '../components/ui';
import { colors, radius, spacing } from '../theme/theme';

const FILTROS = [
  { chave: 'todos', rotulo: 'Todos' },
  { chave: 'ativo', rotulo: 'Ativos' },
  { chave: 'monitoramento', rotulo: 'Monitoramento' },
  { chave: 'controlado', rotulo: 'Controlados' },
  { chave: 'extinto', rotulo: 'Extintos' },
];

export default function FocosScreen({ navigation }) {
  const [filtro, setFiltro] = useState('todos');
  const [favoritos, setFavoritos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      listarFavoritos().then(setFavoritos);
    }, [])
  );

  const dados =
    filtro === 'todos' ? FOCOS : FOCOS.filter((f) => f.status === filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        {FILTROS.map((f) => (
          <TouchableOpacity
            key={f.chave}
            style={[styles.chip, filtro === f.chave && styles.chipAtivo]}
            onPress={() => setFiltro(f.chave)}
          >
            <Text
              style={[
                styles.chipTexto,
                filtro === f.chave && styles.chipTextoAtivo,
              ]}
            >
              {f.rotulo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum foco com esse status no momento.
          </Text>
        }
        renderItem={({ item }) => (
          <FocoCard
            foco={item}
            favorito={favoritos.includes(item.id)}
            onPress={() =>
              navigation.navigate('FocoDetalhe', { focoId: item.id })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.space },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipAtivo: { backgroundColor: colors.ember, borderColor: colors.ember },
  chipTexto: { color: colors.textDim, fontSize: 12.5, fontWeight: '700' },
  chipTextoAtivo: { color: '#1A0D05' },
  lista: { padding: spacing.md, paddingTop: spacing.sm },
  vazio: {
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
