import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';

const Footer = () => {
  const isDarkMode = useSelector(state => state?.theme?.isDarkMode);

  return (
    <View
      style={[
        styles.footer,
        {backgroundColor: !isDarkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.columnLarge}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 20,
                  lineHeight: 27,
                  fontWeight: 600,
                  color: isDarkMode ? 'black' : 'white',
                },
              ]}>
              Discover, Watch, and Stay Updated with the Latest Movies!
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  lineHeight: 27,
                  fontWeight: 500,
                  color: isDarkMode ? 'black' : 'white',
                },
              ]}>
              Address: NetflixGPT, Amaya Complex 2nd floor, Noida Sector 62 Uttar
              Pradesh, India
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  lineHeight: 27,
                  fontWeight: 500,
                  color: isDarkMode ? 'black' : 'white',
                },
              ]}>
              Contact: 7084073798
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  lineHeight: 27,
                  fontWeight: 500,
                  color: isDarkMode ? 'black' : 'white',
                },
              ]}>
              Gmail: dvverma9211@gmail.com
            </Text>
          </View>

          <View style={{flexDirection: 'row', paddingTop: 40}}>
            <View style={styles.columnSmall}>
              <Text
                style={[
                  styles.heading,
                  {color: isDarkMode ? 'black' : 'white'},
                ]}>
                Useful Links
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL('/blog')}>
                <Text style={styles.link}>Blog</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('/')}>
                <Text style={styles.link}>Work</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('/about')}>
                <Text style={styles.link}>About</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.columnSmall}>
              <Text
                style={[
                  styles.heading,
                  {color: isDarkMode ? 'black' : 'white'},
                ]}>
                Terms
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL('/')}>
                <Text style={styles.link}>TOS</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('/')}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('/')}>
                <Text style={styles.link}>Refund Policy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.columnLarge}>
              <Text
                style={[
                  styles.heading,
                  {color: isDarkMode ? 'black' : 'white'},
                ]}>
                Support & Help
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL('/contact')}>
                <Text style={styles.link}>Open Support Ticket</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('/')}>
                <Text style={styles.link}>Terms of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('/about')}>
                <Text style={styles.link}>About</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.copyright}>
          Copyright © 2020 NetflixGPT. All Rights Reserved
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: 'white',
  },
  container: {
    maxWidth: 1200,
  },
  row: {
    flexDirection: 'col',
    with: '100%',
  },
  columnLarge: {
    flex: 1,
    width: '100%',
  },
  columnSmall: {
    flex: 1,
    paddingHorizontal: 10,
    maxWidth: '30%',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  text: {
    color: '#999',
    fontSize: 14,
  },
  heading: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  link: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  copyright: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Footer;
