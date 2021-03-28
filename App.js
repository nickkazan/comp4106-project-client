import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default function App() {

  const [prediction, setPrediction] = useState('?');
  const [candidates, setCandidates] = useState([]);

  const handleSignature = (img) => {
    var data = {'train_values': '5000', 'test_values': '1', 'k': '9', 'image': img}
    fetch('http://Comp4106server-env-1.eba-qzsq6qxv.us-east-2.elasticbeanstalk.com/process-image', {
      // fetch('http://127.0.0.1:5000/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      const prediction = data[0]
      const candidates = data.slice(1)
      console.log(prediction)
      console.log(candidates)
      setPrediction(prediction)
      setCandidates(candidates)
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
        imageType="image/png"
        trimWhitespace={true}
        autoClear={true}
        minWidth={15}
      />
      <Text style={styles.primaryText}>
        {prediction}
      </Text>
      <Text style={styles.secondaryText}>
        KNN: {candidates}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    fontSize: 54,
  },
  secondaryText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    fontSize: 30,
  }
});
