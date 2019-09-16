import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import CountArea from './components/CountArea';
import ImgArea from './components/ImgArea';
import Footer from './components/Footer';


export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <UserInfo />
      <CountArea />
      <View style={{ flex: 5.5 }}>
        <ImgArea />
      </View>
      <Footer />
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
});
