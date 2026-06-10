import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { salvarSessao } from '../services/storage';
import { PrimaryButton } from '../components/ui';
import { colors, radius, spacing, typography } from '../theme/theme';

const USUARIO_TESTE = { email: 'fiap@teste.com', senha: '123456' };

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Informe e-mail e senha para entrar.');
      return;
    }

    if (
      email.trim().toLowerCase() !== USUARIO_TESTE.email ||
      senha !== USUARIO_TESTE.senha
    ) {
      Alert.alert(
        'Credenciais inválidas',
        'Use as credenciais de teste:\nfiap@teste.com / 123456'
      );
      return;
    }

    setCarregando(true);
    await salvarSessao({ email: email.trim().toLowerCase(), nome: 'Avaliador FIAP' });
    setCarregando(false);
    navigation.replace('Main');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.brand}>
        <Text style={styles.brandOrbit}>● ─ ─ ─ ○</Text>
        <Text style={styles.brandName}>FireWatch SP</Text>
        <Text style={styles.brandTag}>
          Monitoramento orbital de queimadas{'\n'}Grande São Paulo · ODS 13
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={typography.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="fiap@teste.com"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[typography.label, { marginTop: spacing.md }]}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••"
          placeholderTextColor={colors.textFaint}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton
            titulo={carregando ? 'Conectando…' : 'Entrar'}
            onPress={handleLogin}
            disabled={carregando}
          />
        </View>

        <Text style={styles.hint}>
          Acesso de avaliação: fiap@teste.com · 123456
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.space,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  brand: { alignItems: 'center', marginBottom: spacing.xl },
  brandOrbit: { color: colors.signal, fontSize: 18, letterSpacing: 4, marginBottom: spacing.sm },
  brandName: { ...typography.title, fontSize: 32 },
  brandTag: {
    color: colors.textDim,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  form: {
    backgroundColor: colors.panel,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
  },
  input: {
    backgroundColor: colors.panelSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.line,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginTop: spacing.xs,
    fontSize: 15,
  },
  hint: {
    color: colors.textFaint,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
