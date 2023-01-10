import { StyleSheet, Text, View, FlatList } from 'react-native';
import CategoriesScreens from './screens/CategoriesScreens';

export default function App() {
  return (
     <CategoriesScreens/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
