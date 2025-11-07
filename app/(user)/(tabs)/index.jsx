import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity, Dimensions, Switch, Modal, TextInput, Animated } from 'react-native'
import { useEffect, useState, useRef } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { realtimeDB } from '../../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { images } from '../../../constants';

const { width } = Dimensions.get('window');
const tabList = ['Monitoring', 'Threshold'];


const ThresholdScreen = () => {
  const [activeTab, setActiveTab] = useState(tabList[0]);
  
  const [temperature, setTemperature] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [gasStatus, setGasStatus] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [pressureMin, setPressureMin] = useState(null);
  const [pressureMax, setPressureMax] = useState(null);

  

  const [isTempModalVisible, setIsTempModalVisible] = useState(false);
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');

  const [isPressureModalVisible, setIsPressureModalVisible] = useState(false);
  const [minPressure, setMinPressure] = useState('');
  const [maxPressure, setMaxPressure] = useState('');

  useEffect(() => {
    if (isTempModalVisible) {
      const minRef = ref(realtimeDB, 'Temperature/Min');
      const maxRef = ref(realtimeDB, 'Temperature/Max');
  
      onValue(minRef, snapshot => {
        if (snapshot.exists()) setMinTemp(String(snapshot.val()));
      });
  
      onValue(maxRef, snapshot => {
        if (snapshot.exists()) setMaxTemp(String(snapshot.val()));
      });
    }
  }, [isTempModalVisible]);

  useEffect(() => {
    if (isPressureModalVisible) {
      const minRef = ref(realtimeDB, 'Pressure/Min');
      const maxRef = ref(realtimeDB, 'Pressure/Max');
  
      onValue(minRef, snapshot => {
        if (snapshot.exists()) setMinPressure(String(snapshot.val()));
      });
  
      onValue(maxRef, snapshot => {
        if (snapshot.exists()) setMaxPressure(String(snapshot.val()));
      });
    }
  }, [isPressureModalVisible]);

 
  const updateThreshold = async (path, minValue, maxValue) => {
    try {
      await set(ref(realtimeDB, `${path}/Min`), parseFloat(minValue));
      await set(ref(realtimeDB, `${path}/Max`), parseFloat(maxValue));
      console.log(`${path} threshold updated: Min=${minValue}, Max=${maxValue}`);
    } catch (error) {
      console.error("Error updating threshold:", error);
    }
  };
  
  useEffect(() => {
    
    const tempRef = ref(realtimeDB, 'Temperature/SensorValue');
    const pressureRef = ref(realtimeDB, 'Pressure/SensorValue');
    const gasStatusRef = ref(realtimeDB, 'GasStatus');
    const tempMinRef = ref(realtimeDB, 'Temperature/Min');
    const tempMaxRef = ref(realtimeDB, 'Temperature/Max');
    const pressureMinRef = ref(realtimeDB, 'Pressure/Min');
    const pressureMaxRef = ref(realtimeDB, 'Pressure/Max');

    const unsubTemp = onValue(tempRef, snapshot => {
      if (snapshot.exists()) setTemperature(snapshot.val());
    });

    const unsubPressure = onValue(pressureRef, snapshot => {
      if (snapshot.exists()) setPressure(snapshot.val());
    });

    const unsubGas = onValue(gasStatusRef, snapshot => { 
      if (snapshot.exists()) setGasStatus(snapshot.val());
    });

    const unsubTempMin = onValue(tempMinRef, (snap) => {
      if (snap.exists()) setTempMin(snap.val());
    });
    const unsubTempMax = onValue(tempMaxRef, (snap) => {
      if (snap.exists()) setTempMax(snap.val());
    });
    const unsubPressureMin = onValue(pressureMinRef, (snap) => {
      if (snap.exists()) setPressureMin(snap.val());
    });
    const unsubPressureMax = onValue(pressureMaxRef, (snap) => {
      if (snap.exists()) setPressureMax(snap.val());
    });

    return () => {
      unsubTemp();
      unsubPressure();
      unsubGas();
      unsubTempMin();
      unsubTempMax();
      unsubPressureMin();
      unsubPressureMax();
    };
  }, []);


  const renderContent = () => {
    if (activeTab === 'Monitoring') {
      return (
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.sensorMainContainer}>

              {/* 1st Container */}
              <View style={styles.cardContentContainer}>
                <View style={styles.sensorCard}>
                  <Text style={styles.cardTitle}>TEMPERATURE</Text>
                  <View style={styles.sensorReadingCard}>
                    <Image 
                      source={images.tempIcon}
                      style={styles.sensorIcon}
                      resizeMode='contain'
                    />
                    <View>
                      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sensorValueText}>{temperature !== null ? `${temperature}° C` : '...'}</Text>
                      <Text style={[
                          styles.sensorStatusText,
                          {
                            color:
                              temperature === null || tempMin === null || tempMax === null
                                ? 'gray'
                                : temperature > tempMax
                                ? 'red'
                                : temperature < tempMin
                                ? 'lightblue'
                                : 'green',
                          },
                        ]}
                      >
                        {temperature === null || tempMin === null || tempMax === null
                        ? 'Reading...'
                        : temperature > tempMax
                        ? 'High Temperature'
                        : temperature < tempMin
                        ? 'Low Temperature'
                        : 'Normal Temperature'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.sensorCard}>
                  <Text style={styles.cardTitle}>PRESSURE</Text>
                  <View style={styles.sensorReadingCard}>
                    <Image 
                      source={images.humidIcon}
                      style={styles.sensorIcon}
                      resizeMode='contain'
                    />
                    <View>
                      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sensorValueText}>{pressure !== null ? `${pressure}%` : '...'}</Text>
                      <Text style={[
                          styles.sensorStatusText,
                          {
                            color:
                            pressure === null || pressureMin === null || pressureMax === null
                                ? 'gray' 
                                : pressure > pressureMax
                                ? 'red'
                                : pressure < pressureMin
                                ? 'lightblue'
                                : 'green',
                          },
                        ]}
                      >
                        {pressure === null || pressureMin === null || pressureMax === null
                          ? 'Reading...'
                          : pressure > pressureMax
                          ? 'High Pressure'
                          : pressure < pressureMin
                          ? 'Low Pressure'
                          : 'Good Condition'}
                      </Text>
                    </View>
                  </View>
                </View>

              </View>

              {/* 2nd Container */}
              <View style={styles.fullWidthCardContainer}>
                <Text style={styles.cardTitle}>GAS STATUS</Text>

                <View style={[styles.sensorReadingCard, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
                  {gasStatus === 'On Process' && (
                    <MaterialCommunityIcons name="cog-sync" size={50} color="orange" />
                  )}
                  {gasStatus === 'Ready to Harvest' && (
                    <MaterialCommunityIcons name="check-decagram" size={50} color="green" />
                  )}
                  {!gasStatus && (
                    <MaterialCommunityIcons name="timer-sand" size={50} color="gray" />
                  )}

                  <View>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sensorValueText}>
                      {gasStatus ? gasStatus : 'Reading...'}
                    </Text>
                    <Text
                      style={[
                        styles.sensorStatusText,
                        {
                          color:
                            gasStatus === 'On Process'
                              ? 'orange'
                              : gasStatus === 'Ready to Harvest'
                              ? 'green'
                              : 'gray',
                        },
                      ]}
                    >
                      {gasStatus === 'On Process'
                        ? 'Currently Processing'
                        : gasStatus === 'Ready to Harvest'
                        ? 'Ready to Harvest'
                        : 'Waiting for Data'}
                    </Text>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </View>
      );
    }

    if (activeTab === 'Threshold') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>SELECT PARAMETERS</Text>
          <TouchableOpacity 
            style={styles.thresholdButton} 
            onPress={() => setIsTempModalVisible(true)}
          >
            <Text style={styles.thresholdButtonText}>Temperature</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.thresholdButton} 
            onPress={() => setIsPressureModalVisible(true)}
          >
            <Text style={styles.thresholdButtonText}>Pressure</Text>
          </TouchableOpacity>

        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        {tabList.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setActiveTab(item)}
            style={[
              styles.tabButton,
              activeTab === item ? styles.activeTabButton : styles.inactiveTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === item ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { flexGrow: 1 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={[styles.innerContainer, { flex: 1 }]}>
          {renderContent()}
        </View>
      </ScrollView>

      {/* TEMP MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTempModalVisible}
        onRequestClose={() => setIsTempModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Set Temperature Threshold</Text>

            <Text style={styles.modalInputTitle}>Min Temperature</Text>
            <TextInput 
              style={styles.modalInput}
              placeholder="Enter min temperature..."
              keyboardType="numeric"
              value={minTemp}
              onChangeText={setMinTemp}
            />

            <Text style={styles.modalInputTitle}>Max Temperature</Text>
            <TextInput 
              style={styles.modalInput}
              placeholder="Enter max temperature..."
              keyboardType="numeric"
              value={maxTemp}
              onChangeText={setMaxTemp}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: 'red' }]} 
                onPress={() => setIsTempModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: 'green' }]} 
                onPress={async () => {
                  await updateThreshold('Temperature', minTemp, maxTemp);
                  setIsTempModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* HUMID MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPressureModalVisible}
        onRequestClose={() => setIsPressureModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Set Pressure Threshold</Text>

            <Text style={styles.modalInputTitle}>Min Pressure</Text>
            <TextInput 
              style={styles.modalInput}
              placeholder="Enter min pressure..."
              keyboardType="numeric"
              value={minPressure}
              onChangeText={setMinPressure}
            />

            <Text style={styles.modalInputTitle}>Max Pressure</Text>
            <TextInput 
              style={styles.modalInput}
              placeholder="Enter max pressure..."
              keyboardType="numeric"
              value={maxPressure}
              onChangeText={setMaxPressure}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: 'red' }]} 
                onPress={() => setIsPressureModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: 'green' }]} 
                onPress={async () => {
                  await updateThreshold('Pressure', minPressure, maxPressure);
                  setIsPressureModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default ThresholdScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#c4c4c4',
    // backgroundColor: 'blue'
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#c4c4c4',
    borderRadius: 40,
    marginHorizontal: 20,
    overflow: 'hidden',
    // marginBottom: 10,
    // marginTop: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  activeTabButton: {
    backgroundColor: '#19354d',
  },
  
  inactiveTabButton: {
    backgroundColor: '#c4c4c4',
  },
  
  tabText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  
  activeTabText: {
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
  },
  
  inactiveTabText: {
    color: '#6b7280',
  },

  scrollContent: {
    // flex: 1,
    padding: 16,
    paddingBottom: 50,
    flexGrow: 1
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    height: 'auto',
    padding: 10,
    borderRadius: 20,
    // backgroundColor: '#c4c4c4'
  },
  contentTitle: {
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 'auto',
    fontSize: 26,
    marginBottom: 30
  },
  autoTitleText:{
    fontFamily: 'Poppins-SemiBold',
  },
  autoControlContainer:{
    backgroundColor: '#b2d4d6',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 12
  },
  switchContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 10,
    paddingBottom: 10
    // marginBottom: 10
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },
  switchText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginBottom: -2
  },

  // Sensors
  sensorMainContainer:{
    marginTop: 10
  },
  cardContentContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cardTitle:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center'
  },
  sensorCard:{
    width: width / 2 - 30,
  },
  sensorReadingCard:{
    backgroundColor: '#bbb6a3',
    borderRadius: 20,
    padding: 20
  },
  sensorIcon:{
    width: 40,
    height: 40
  },
  sensorValueText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 36,
    textAlign: 'center'
  },
  sensorStatusText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center'
  },

  iconButton: {
    marginLeft: 'auto'
  },
  accordionContent: {
    overflow: 'hidden',
    
  },
  innerContent: {
    padding: 15,
    borderTopWidth: 2,
    borderColor: 'gray',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },

  subSwitchText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: -2
  },

  subSwitchContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
    paddingTop: 10,
    paddingBottom: 10
  },

  // MODAL
  thresholdButton: {
    backgroundColor: '#82797a',
    padding: 18,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  thresholdButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 15,
  },
  modalInputTitle:{
    marginRight: 'auto',
    fontFamily: 'Poppins-Regular',
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 18,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  fullWidthCardContainer: {
    width: '100%',
    marginTop: 10,
  },
})
