import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: '80%',
  },
  buttonRefreshGPS: {
    backgroundColor: 'red',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonRefreshGPSText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  plainView: {
    width: 165,
    // height: 150,
  },
  calloutTitleText: {
    fontWeight: 'bold',
  },
  hyperlinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});