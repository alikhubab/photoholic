import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import {ActivityIndicator, BackHandler, StyleSheet, View} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef(null);
  SplashScreen.hide();

  const onAndroidBackPress = () => {
    if (canGoBack && ref) {
      ref.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
  }, []);

  return (
    <>
      <WebView
        ref={ref}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
        originWhitelist={['*']}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}
        source={{uri: 'https://photoholic.sociallz.com/'}}
      />
      {isLoading && (
        <ActivityIndicator
          size={'large'}
          color={'blue'}
          style={{
            position: 'absolute',
            zIndex: 5,
            top: '35%',
            left: 0,
            right: 0,
          }}
        />
      )}
    </>
  );
}

export default App;
