import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default function App() {

  const handleSignature = (img) => {
    // Fix it so that you send the image data and it processes it, instead of the test_image path.
    var data = {'train_values': '2000', 'test_values': '1', 'k': '5', 'path': './data/test_image.png'}
    fetch('http://Comp4106server-env-1.eba-qzsq6qxv.us-east-2.elasticbeanstalk.com/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      response.json().then((data) => {
        console.log(data);
        navigation.navigate('Results', { data: data.businesses })
      });
    })
    .catch((error) => {
      console.error(error)
    });
  }

  const handleEmpty = () => {
    console.log("empty");
  }

  return (
    <View style={styles.container}>
      <Signature
        onOK={handleSignature}
        onEmpty={handleEmpty}
        descriptionText="Draw a number"
        clearText="Clear"
        confirmText="Save"
        backgroundColor="black"
        penColor="white"
        imageType="image/jpeg"
        trimWhitespace={true}
        autoClear={true}
        minWidth={10}
      />
    </View>
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
