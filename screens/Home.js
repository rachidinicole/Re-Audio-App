import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function Home() {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);

  useEffect(() => {
    // Set up audio mode when the component mounts
    setupAudioMode();
  }, []);

  const setupAudioMode = async () => {
    try {
      const { status } = await Audio.setAudioModeAsync({
        allowsRecordingIOS: true, // Allow recording on iOS
        playsInSilentModeIOS: true, // Allow playback in silent mode on iOS
      });

      if (status !== "granted") {
        console.log("Permission to access audio is denied");
      }
    } catch (error) {
      console.error("Error setting up audio mode:", error);
    }
  };

  const startRecording = async () => {
    try {
      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingObject.startAsync();
      setRecording(recordingObject);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
    } catch (error) {
      console.error("Error stopping recording:", error);
    } finally {
      setIsRecording(false);
    }
  };

  const saveRecording = async () => {
    if (!audioUri) return;

    const timestamp = new Date().getTime();
    const fileName = `audio_${timestamp}.wav`;
    const directory = `${FileSystem.documentDirectory}audio/`;

    try {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      const newUri = `${directory}${fileName}`;

      await FileSystem.moveAsync({
        from: audioUri,
        to: newUri,
      });

      setAudioUri(newUri);
    } catch (error) {
      console.error("Error saving recording:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Recording App</Text>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      {audioUri && (
        <View>
          <Text style={styles.audioUri}>Audio URI: {audioUri}</Text>
          <Button title="Save Recording" onPress={saveRecording} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  audioUri: {
    marginTop: 20,
  },
});
