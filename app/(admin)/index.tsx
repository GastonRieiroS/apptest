import React from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@components/Button';
import { Screen } from '@components/Screen';
import { palette, spacing, typography } from '@styles/theme';

export default function AdminPanel() {
  return (
    <Screen>
      <Text style={{ color: palette.text, font: typography.heading, marginBottom: spacing[4] }}>
        Panel de administración
      </Text>
      <View style={{ gap: spacing[3] }}>
        <Button label="Crear/editar clase" onPress={() => Alert.alert('Acción', 'Crear clase')} />
        <Button label="Editar cupos" variant="secondary" onPress={() => Alert.alert('Acción', 'Editar cupos')} />
        <Button label="Ver reservas" variant="ghost" onPress={() => Alert.alert('Acción', 'Ver reservas')} />
      </View>
      <Text style={{ color: palette.muted, marginTop: spacing[4] }}>
        Este panel consume los mismos servicios Firebase que la app principal.
      </Text>
    </Screen>
  );
}
