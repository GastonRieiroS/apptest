import React, { useEffect } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { Button } from '@components/Button';
import { Screen } from '@components/Screen';
import { subscribeToClasses } from '@services/bookings';
import { useAppStore } from '@services/store';
import { palette, spacing, typography } from '@styles/theme';
import { ClassSession } from '@utils/types';

const SessionCard: React.FC<{ session: ClassSession; onReserve: (session: ClassSession) => void }> = ({
  session,
  onReserve,
}) => {
  const available = session.capacity - session.reserved;
  const isFull = available <= 0;

  return (
    <View
      style={{
        backgroundColor: '#1f2937',
        padding: spacing[4],
        marginBottom: spacing[4],
        borderRadius: 12,
      }}
    >
      <Text style={{ color: palette.text, font: typography.heading }}>
        {session.activity === 'functional' ? 'Funcional' : 'Pilates Reformer'}
      </Text>
      <Text style={{ color: palette.muted, marginTop: spacing[2] }}>
        {session.startTime} - {session.endTime} · Coach {session.coach}
      </Text>
      <Text style={{ color: palette.text, marginTop: spacing[2] }}>
        Cupos: {session.reserved}/{session.capacity} ({available > 0 ? `${available} disponibles` : 'Completo'})
      </Text>
      <View style={{ marginTop: spacing[3], gap: spacing[3] }}>
        <Button
          label={isFull ? 'Lista de espera' : 'Reservar'}
          onPress={() => onReserve(session)}
          disabled={isFull}
        />
        <Link href="/(app)/schedule" style={{ color: palette.accent }}>
          Ver calendario
        </Link>
      </View>
    </View>
  );
};

export default function Home() {
  const { sessions, setSessions } = useAppStore();

  useEffect(() => {
    const unsubscribe = subscribeToClasses(setSessions);
    return unsubscribe;
  }, [setSessions]);

  const handleReserve = (session: ClassSession) => {
    // Wire up to reserveClass; kept light for demo
    console.log('reserve', session.id);
  };

  return (
    <Screen>
      <Text style={{ color: palette.text, font: typography.heading, marginBottom: spacing[4] }}>
        Clases destacadas
      </Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionCard session={item} onReserve={handleReserve} />}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
        ListEmptyComponent={<Text style={{ color: palette.muted }}>No hay clases disponibles.</Text>}
      />
    </Screen>
  );
}
