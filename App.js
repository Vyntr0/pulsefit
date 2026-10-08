import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import { usePersisted } from './src/util';
import Workouts from './src/screens/Workouts';
import Routines from './src/screens/Routines';
import Run from './src/screens/Run';
import Body from './src/screens/Body';

const TABS = [
  { key: 'workouts', label: 'Lift', icon: '🏋️' },
  { key: 'routines', label: 'Routines', icon: '⏱️' },
  { key: 'run', label: 'Run', icon: '🏃' },
  { key: 'body', label: 'Body', icon: '📈' },
];

export default function App() {
  const [tab, setTab] = useState('workouts');

  // All data lives on the device; nothing is sent anywhere.
  const [sets, setSets] = usePersisted('pf.sets', []);
  const [sessions, setSessions] = usePersisted('pf.sessions', []);
  const [runs, setRuns] = usePersisted('pf.runs', []);
  const [stepGoal, setStepGoal] = usePersisted('pf.stepGoal', 10000);
  const [body, setBody] = usePersisted('pf.body', []);
  const [profile, setProfile] = usePersisted('pf.profile', { heightCm: 0, goalKg: 0 });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="light" />
        {/* Screens stay mounted so a running routine timer survives tab switches. */}
        <View style={styles.body}>
          <View style={[styles.pane, tab !== 'workouts' && styles.hidden]}>
            <Workouts sets={sets} setSets={setSets} />
          </View>
          <View style={[styles.pane, tab !== 'routines' && styles.hidden]}>
            <Routines sessions={sessions} setSessions={setSessions} />
          </View>
          <View style={[styles.pane, tab !== 'run' && styles.hidden]}>
            <Run entries={runs} setEntries={setRuns} stepGoal={stepGoal} setStepGoal={setStepGoal} />
          </View>
          <View style={[styles.pane, tab !== 'body' && styles.hidden]}>
            <Body entries={body} setEntries={setBody} profile={profile} setProfile={setProfile} />
          </View>
        </View>
        <View style={styles.tabBar}>
          {TABS.map((t) => {
            const on = t.key === tab;
            return (
              <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
                <Text style={[styles.icon, { opacity: on ? 1 : 0.5 }]}>{t.icon}</Text>
                <Text style={[styles.label, { color: on ? colors.accent : colors.muted }]}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  pane: { flex: 1 },
  hidden: { display: 'none' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 6,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  icon: { fontSize: 22 },
  label: { fontSize: 11, fontWeight: '700', marginTop: 2 },
});
