import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import LearningScreen from './src/screens/LearningScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#6366f1',
                tabBarInactiveTintColor: '#9ca3af',
              }}
            >
              <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                  tabBarLabel: 'Home',
                }}
              />
              <Tab.Screen
                name="Learning"
                component={LearningScreen}
                options={{
                  tabBarLabel: 'Learn',
                }}
              />
              <Tab.Screen
                name="Courses"
                component={CoursesScreen}
                options={{
                  tabBarLabel: 'Courses',
                }}
              />
              <Tab.Screen
                name="Community"
                component={CommunityScreen}
                options={{
                  tabBarLabel: 'Community',
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarLabel: 'Profile',
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
