"use client"
import { useAuthStore } from '../../src/state/useAuthStore';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Text } from '../../src/components/primitives/Text';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../src/components/primitives/EmptyState';
import { StyledButton } from '../../src/components/StyledButton';
import {Badge} from "@/components/primitives";
import { ping } from '@/services/pingService';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { user, logout } = useAuthStore();
  const [online, setOnline] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

useEffect(() => {
  ping()
  .then(() => {setOnline(true); setLoading(false)})
  .catch(() => {setOnline(false); setLoading(false)})
}, [])

  if (loading) {return (<Screen> <View style={styles.center}><Text>Loading...</Text></View></Screen>)}

  if (!online){ return (<Screen><View style={styles.center}><Text>You seem to be offline...</Text></View></Screen>)}

  return (
    <Screen padding="lg">
      <Stack gap="lg">
        <Text size="xl" weight="bold">
          {user !== null ? `Welcome, ${user.name}` : 'Welcome'}
        </Text>
        <Text>Your items will appear here once you connect Supabase.</Text>
        <Badge label={'Succes badge'} variant={"success"} />
        <EmptyState
          title="No items yet"
          description="Implement getItems() in your itemService to load data."
        />
        <StyledButton label="Log out" onPress={logout} variant="secondary" />
      </Stack>
      </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

