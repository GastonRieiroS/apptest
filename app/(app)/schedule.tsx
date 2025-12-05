import React, { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';

import { Screen } from '@components/Screen';
import { subscribeToClasses } from '@services/bookings';
import { useAppStore } from '@services/store';
import { palette, spacing, typography } from '@styles/theme';

export default function Schedule() {
  const { sessions, setSessions } = useAppStore();

  useEffect(() => {
    const unsubscribe = subscribeToClasses(setSessions);
    return unsubscribe;
  }, [setSessions]);

  const grouped = useMemo(() => {
    return sessions.reduce<Record<string, typeof sessions>>((acc, session) => {
      const day = session.startTime.split('T')[0];
      acc[day] = acc[day] ? [...acc[day], session] : [session];
      return acc;
    }, {});
  }, [sessions]);

  return (
    <Screen>
      <Text style={{ color: palette.text, font: typography.heading, marginBottom: spacing[4] }}>
        Calendario
      </Text>
      {Object.keys(grouped).map((day) => (
        <View key={day} style={{ marginBottom: spacing[4] }}>
          <Text style={{ color: palette.accent, font: typography.body, marginBottom: spacing[2] }}>
            {day}
          </Text>
          {grouped[day].map((session) => (
            <View
              key={session.id}
              style={{ backgroundColor: '#1f2937', padding: spacing[3], borderRadius: 10, marginBottom: spacing[2] }}
            >
              <Text style={{ color: palette.text }}>
                {session.activity} · {session.startTime} ({session.reserved}/{session.capacity})
              </Text>
            </View>
          ))}
        </View>
      ))}
      {sessions.length === 0 && <Text style={{ color: palette.muted }}>No hay clases programadas.</Text>}
    </Screen>
  );
}
