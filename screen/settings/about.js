import React, { useEffect, useState } from 'react';
import { ScrollView, Linking, Dimensions, Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import {
  BlueTextCentered,
  BlueSpacing20,
  BlueButton,
  SafeBlueArea,
  BlueCard,
  BlueListItemHooks,
  BlueNavigationStyle,
  BlueLoadingHook,
} from '../../BlueComponents';
import { getApplicationName, getVersion, getBundleId, getBuildNumber } from 'react-native-device-info';
import Rate, { AndroidMarket } from 'react-native-rate';
import loc from '../../loc';

const { width, height } = Dimensions.get('window');

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 54,
    },
    logo: {
      width: 102,
      height: 124,
    },
    textFree: {
      maxWidth: 260,
      marginVertical: 24,
      color: '#9AA0AA',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '500',
    },
    textBackup: {
      maxWidth: 260,
      marginBottom: 40,
      color: colors.foregroundColor,
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '500',
    },
    buildWith: {
      backgroundColor: colors.inputBackgroundColor,
      padding: 16,
      paddingTop: 0,
      borderRadius: 8,
    },
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleOnReleaseNotesPress = () => {
    navigate('ReleaseNotes');
  };

  const handleOnSelfTestPress = () => {
    navigate('Selftest');
  };

  const handleOnLicensingPress = () => {
    navigate('Licensing');
  };

  const handleOnTwitterPress = () => {
    Linking.openURL('https://twitter.com/bluewalletio');
  };

  const handleOnGithubPress = () => {
    Linking.openURL('https://github.com/BlueWallet/BlueWallet');
  };

  const handleOnTelegramPress = () => {
    Linking.openURL('https://t.me/bluewallet');
  };

  const handleOnRatePress = () => {
    const options = {
      AppleAppID: '1376878040',
      GooglePackageName: 'io.bluewallet.bluewallet',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://bluewallet.io',
    };
    Rate.rate(options, success => {
      if (success) {
        console.log('User Rated.');
      }
    });
  };

  return isLoading ? (
    <BlueLoadingHook />
  ) : (
    <SafeBlueArea style={styles.root}>
      <ScrollView testID="AboutScrollView">
        <BlueCard>
          <View style={styles.center}>
            <Image style={styles.logo} source={require('../../img/bluebeast.png')} />
            <Text style={styles.textFree}>{loc.settings.about_free}</Text>
            <Text style={styles.textBackup}>{loc.settings.about_backup}</Text>
          </View>
        </BlueCard>
        <BlueSpacing20 />
        <BlueSpacing20 />
        <BlueTextCentered>
          {getApplicationName()} ver {getVersion()} (build {getBuildNumber()})
        </BlueTextCentered>
        <BlueTextCentered>{new Date(getBuildNumber() * 1000).toGMTString()}</BlueTextCentered>
        <BlueTextCentered>
          w, h = {width}, {height}
        </BlueTextCentered>
        <BlueSpacing20 />
        <BlueSpacing20 />
      </ScrollView>
    </SafeBlueArea>
  );
};

About.navigationOptions = () => ({
  ...BlueNavigationStyle(),
  headerTitle: loc.settings.about,
});
export default About;
