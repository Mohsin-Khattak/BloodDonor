import React from 'react';
import {Image, Text, View} from 'react-native';

// import { appImages } from "../../../globals/utilities/assets";
import {PrimaryButton} from 'components/atoms/buttons';
import {styles} from './styles';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';

const VerifyEmail = props => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://png.pngtree.com/png-clipart/20230919/original/pngtree-comic-style-envelope-with-confirmed-document-icon-and-verify-cartoon-vector-png-image_12431478.png',
        }}
        style={styles.verifyEmailPic}
      />
      <Bold style={styles.resetPassword} label={'Verify your email'} />

      <Medium
        style={styles.checkEmailContent}
        label={'Check your email & click the link to activate your account'}
      />
      <PrimaryButton
        onPress={() => props.navigation.navigate('Login')}
        title="Continue"
        containerStyle={styles.contiueBtn}
      />
    </View>
  );
};

export default VerifyEmail;
