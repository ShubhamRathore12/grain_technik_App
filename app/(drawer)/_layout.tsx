import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { usePathname } from 'expo-router';
import DrawerContent from '@/components/DrawerContent';
import { useAuth } from '@/context/AuthContext';

export default function DrawerLayout() {
  const pathname = usePathname();
  const { user } = useAuth();

  // If user is not logged in, don't render the drawer
  if (!user) {
    return null;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#1F2937',
        headerTitleStyle: {
          fontWeight: '600',
        },
        sceneContainerStyle: { 
          backgroundColor: '#F9FAFB',
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="devices"
        options={{
          title: 'Devices',
          drawerLabel: 'Devices',
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
        }}
      />
      <Drawer.Screen
        name="registration"
        options={{
          title: 'Registration',
          drawerLabel: 'Registration',
        }}
      />
    </Drawer>
  );
}