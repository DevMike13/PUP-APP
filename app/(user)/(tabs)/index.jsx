import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity, Dimensions, Switch, Modal, TextInput, Animated } from 'react-native'
import { useEffect, useState, useRef } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { realtimeDB } from '../../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { images } from '../../../constants';

const { width } = Dimensions.get('window');
// const tabList = ['Monitoring', 'Threshold'];


const ThresholdScreen = () => {
  // const [activeTab, setActiveTab] = useState(tabList[0]);
  
  const [temperature, setTemperature] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [gasStatus, setGasStatus] = useState(null);
  // const [tempMin, setTempMin] = useState(null);
  // const [tempMax, setTempMax] = useState(null);
  // const [pressureMin, setPressureMin] = useState(null);
  // const [pressureMax, setPressureMax] = useState(null);

  

  // const [isTempModalVisible, setIsTempModalVisible] = useState(false);
  // const [minTemp, setMinTemp] = useState('');
  // const [maxTemp, setMaxTemp] = useState('');

  // const [isPressureModalVisible, setIsPressureModalVisible] = useState(false);
  // const [minPressure, setMinPressure] = useState('');
  // const [maxPressure, setMaxPressure] = useState('');

  // useEffect(() => {
  //   if (isTempModalVisible) {
  //     const minRef = ref(realtimeDB, 'Temperature/Min');
  //     const maxRef = ref(realtimeDB, 'Temperature/Max');
  
  //     onValue(minRef, snapshot => {
  //       if (snapshot.exists()) setMinTemp(String(snapshot.val()));
  //     });
  
  //     onValue(maxRef, snapshot => {
  //       if (snapshot.exists()) setMaxTemp(String(snapshot.val()));
  //     });
  //   }
  // }, [isTempModalVisible]);

  // useEffect(() => {
  //   if (isPressureModalVisible) {
  //     const minRef = ref(realtimeDB, 'Pressure/Min');
  //     const maxRef = ref(realtimeDB, 'Pressure/Max');
  
  //     onValue(minRef, snapshot => {
  //       if (snapshot.exists()) setMinPressure(String(snapshot.val()));
  //     });
  
  //     onValue(maxRef, snapshot => {
  //       if (snapshot.exists()) setMaxPressure(String(snapshot.val()));
  //     });
  //   }
  // }, [isPressureModalVisible]);

 
  // const updateThreshold = async (path, minValue, maxValue) => {
  //   try {
  //     await set(ref(realtimeDB, `${path}/Min`), parseFloat(minValue));
  //     await set(ref(realtimeDB, `${path}/Max`), parseFloat(maxValue));
  //     console.log(`${path} threshold updated: Min=${minValue}, Max=${maxValue}`);
  //   } catch (error) {
  //     console.error("Error updating threshold:", error);
  //   }
  // };
  
  useEffect(() => {
    
    const tempRef = ref(realtimeDB, 'Temperature/SensorValue');
    const pressureRef = ref(realtimeDB, 'Pressure/SensorValue');
    const gasStatusRef = ref(realtimeDB, 'GasStatus');
    // const tempMinRef = ref(realtimeDB, 'Temperature/Min');
    // const tempMaxRef = ref(realtimeDB, 'Temperature/Max');
    // const pressureMinRef = ref(realtimeDB, 'Pressure/Min');
    // const pressureMaxRef = ref(realtimeDB, 'Pressure/Max');

    const unsubTemp = onValue(tempRef, snapshot => {
      if (snapshot.exists()) setTemperature(snapshot.val());
    });

    const unsubPressure = onValue(pressureRef, snapshot => {
      if (snapshot.exists()) setPressure(snapshot.val());
    });

    const unsubGas = onValue(gasStatusRef, snapshot => { 
      if (snapshot.exists()) setGasStatus(snapshot.val());
    });

    // const unsubTempMin = onValue(tempMinRef, (snap) => {
    //   if (snap.exists()) setTempMin(snap.val());
    // });
    // const unsubTempMax = onValue(tempMaxRef, (snap) => {
    //   if (snap.exists()) setTempMax(snap.val());
    // });
    // const unsubPressureMin = onValue(pressureMinRef, (snap) => {
    //   if (snap.exists()) setPressureMin(snap.val());
    // });
    // const unsubPressureMax = onValue(pressureMaxRef, (snap) => {
    //   if (snap.exists()) setPressureMax(snap.val());
    // });

    return () => {
      unsubTemp();
      unsubPressure();
      unsubGas();
      // unsubTempMin();
      // unsubTempMax();
      // unsubPressureMin();
      // unsubPressureMax();
    };
  }, []);


  const renderContent = () => {
    // if (activeTab === 'Monitoring') {
      return (
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.sensorMainContainer}>

              {/* 1st Container */}
              <View style={styles.cardContentContainer}>
                <View style={styles.sensorCard}>
                  {/* <Text style={styles.cardTitle}>TEMPERATURE</Text> */}
                  <View style={styles.sensorReadingCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{ padding: 7, borderRadius: 100, backgroundColor: "#ffffff2e", alignSelf: "flex-start"  }}>
                        <Ionicons name="thermometer-outline" size={20} color="#fff" />
                      </View>
                      <View style={[
                          { 
                            padding: 7, 
                            borderRadius: 100, 
                            backgroundColor: "#ffffff2e", 
                            alignSelf: "flex-start"  
                          },
                          {
                            backgroundColor:
                            temperature === null
                              ? "#ffffff2e"
                              : temperature <= 30
                              ? "#4db8ff30"     // Low Temp (blue)
                              : temperature >= 31 && temperature <= 36
                              ? "#4dff4d30"     // Normal Temp (green)
                              : temperature >= 37 && temperature <= 44
                              ? "#ffa64d30"     // Optimal Temp (orange)
                              : temperature >= 48
                              ? "#ff4d4d30"     // High Temp (red)
                              : "#ffffff2e",
                          }
                        ]}
                      >
                        <Text numberOfLines={1} style={[
                            styles.sensorStatusText,
                            {
                              color:
                              temperature === null
                                ? 'gray'
                                : temperature <= 30
                                ? 'lightblue'
                                : temperature >= 31 && temperature <= 36
                                ? 'green'
                                : temperature >= 37 && temperature <= 44
                                ? 'orange'
                                : temperature >= 48
                                ? 'red'
                                : 'gray',
                            },
                          ]}
                        >
                          {temperature === null
                            ? 'Reading...'
                            : temperature <= 30
                            ? 'Low Temp'
                            : temperature >= 31 && temperature <= 36
                            ? 'Normal Temp'
                            : temperature >= 37 && temperature <= 44
                            ? 'Optimal Temp'
                            : temperature >= 48
                            ? 'High Temp'
                            : 'Reading...'}
                        </Text>
                      </View>
                    </View>
                    <View>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sensorValueText}>
                      {temperature !== null ? (
                        <>
                          {parseFloat(temperature).toFixed(2)}
                          <Text style={{ color: '#6b6b6b', fontFamily: 'Poppins-Regular', fontSize: 20 }}> °C</Text>
                        </>
                      ) : (
                        '...'
                      )}
                    </Text>
                    <Text numberOfLines={1} style={{ color: "#fff", fontFamily: 'Poppins-Light', textAlign: 'center', marginTop: -10 }}>Temperature</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.sensorCard}>
                  {/* <Text style={styles.cardTitle}>PRESSURE</Text> */}
                  <View style={styles.sensorReadingCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{ padding: 7, borderRadius: 100, backgroundColor: "#ffffff2e", alignSelf: "flex-start"  }}>
                        <Ionicons name="speedometer-outline" size={20} color="#fff" />
                      </View>
                      <View style={[
                          { 
                            padding: 7, 
                            borderRadius: 100, 
                            backgroundColor: "#ffffff2e", 
                            alignSelf: "flex-start"  
                          },
                          {
                            backgroundColor:
                            pressure === null
                              ? "#ffffff2e"
                              : pressure >= 90
                              ? "#ff4d4d30"      // High (red)
                              : pressure >= 50 && pressure <= 80
                              ? "#4dff4d30"      // Optimal (green)
                              : pressure <= 40
                              ? "#4db8ff30"      // Low (blue)
                              : "#ffffff2e",
                          }
                        ]}
                      >
                        <Text numberOfLines={1} style={[
                            styles.sensorStatusText,
                            {
                              color:
                              pressure === null
                                ? 'gray'
                                : pressure >= 90
                                ? 'red'
                                : pressure >= 50 && pressure <= 80
                                ? 'green'
                                : pressure <= 40
                                ? 'lightblue'
                                : 'gray',
                            },
                          ]}
                        >
                          {pressure === null
                            ? 'Reading...'
                            : pressure >= 90
                            ? 'High Pressure'
                            : pressure >= 50 && pressure <= 80
                            ? 'Optimal Pressure'
                            : pressure <= 40
                            ? 'Low Pressure'
                            : 'Reading...'}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sensorValueText}>
                        {pressure !== null ? (
                          <>
                            {pressure}
                            <Text style={{ color: '#6b6b6b', fontFamily: 'Poppins-Regular', fontSize: 20 }}> %</Text>
                          </>
                        ) : (
                          '...'
                        )}
                      </Text>
                      <Text numberOfLines={1} style={{ color: "#fff", fontFamily: 'Poppins-Light', textAlign: 'center', marginTop: -10 }}>Pressure</Text>
                    </View>
                  </View>
                </View>

              </View>
              
              <View style={styles.fullWidthCardContainer}>
                <View>
                  {/* <Text style={styles.cardTitle}>PRESSURE</Text> */}
                  <View style={styles.sensorReadingCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{ padding: 7, borderRadius: 100, backgroundColor: "#ffffff2e", alignSelf: "flex-start" }}>
                        {gasStatus === null ? (
                          <MaterialCommunityIcons name="timer-sand" size={20} color="#fff" />
                        ) : gasStatus === 'Biogas Detected' ? (
                          <MaterialCommunityIcons name="check-decagram" size={20} color="#fff" />
                        ) : (
                          <MaterialCommunityIcons name="close-circle-outline" size={20} color="#fff" />
                        )}
                      </View>
                      <View style={[
                          { 
                            padding: 7, 
                            borderRadius: 100, 
                            backgroundColor: "#ffffff2e", 
                            alignSelf: "flex-start"  
                          },
                          {
                            backgroundColor:
                              gasStatus === 'Biogas Detected'
                                ? "#4dff4d30"
                                : "#ffffff2e",
                          }
                        ]}
                      >
                        <Text numberOfLines={1} style={[
                            styles.sensorStatusText,
                            {
                              color:
                                gasStatus === 'Biogas Detected'
                                  ? 'green'
                                  : 'gray',
                            },
                          ]}
                        >
                          {gasStatus === 'Biogas Detected'
                            ? 'Biogas Detected'
                            : 'No Biogas Detected'}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sensorValueText}>
                        {gasStatus ? gasStatus : 'Reading...'}
                      </Text>
                      <Text numberOfLines={1} style={{ color: "#fff", fontFamily: 'Poppins-Light', textAlign: 'center', marginTop: -10 }}>Gas Status</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* ADDED */}
              <View style={[styles.fullWidthCardContainer, { marginTop: 10 }]}>
                <View>
                  <View style={styles.sensorReadingCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{ padding: 7, borderRadius: 100, backgroundColor: "#ffffff2e" }}>
                        {pressure === 100 ? (
                          <MaterialCommunityIcons name="gas-cylinder" size={20} color="#fff" />
                        ) : (
                          <MaterialCommunityIcons name="progress-clock" size={20} color="#fff" />
                        )}
                      </View>
                      {/* STATUS BADGE */}
                      <View style={{
                        padding: 7,
                        borderRadius: 100,
                        backgroundColor: "#ffffff2e"
                      }}>
                        <Text style={[
                          styles.sensorStatusText,
                          { paddingTop: 3, color: 'gray' }
                        ]}>
                          Available Gas
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sensorValueText}>
                        {pressure !== null ? `${pressure}%` : '...'}
                      </Text>
                      <Text style={{
                        color: "#fff",
                        fontFamily: 'Poppins-Light',
                        textAlign: 'center',
                        marginTop: -10
                      }}>
                        {pressure === null
                          ? 'Checking Status...'
                          : pressure === 100
                          ? 'Biogas available for harvesting'
                          : 'Not Ready for Harvest'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              
            </View>
          </View>
        </View>
      );
    // }

    // if (activeTab === 'Threshold') {
    //   return (
    //     <View style={styles.contentContainer}>
    //       <Text style={styles.contentTitle}>Select Parameters</Text>
    //       <TouchableOpacity 
    //         style={styles.thresholdButton} 
    //         onPress={() => setIsTempModalVisible(true)}
    //       >
    //         <View style={{ padding: 7, borderRadius: 100, backgroundColor: "#ffffff2e", alignSelf: "flex-start"  }}>
    //           <Ionicons name="thermometer-outline" size={20} color="#fff" />
    //         </View>
    //         <Text style={styles.thresholdButtonText}>Temperature</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity 
    //         style={styles.thresholdButton} 
    //         onPress={() => setIsPressureModalVisible(true)}
    //       >
    //         <View style={{ padding: 7, borderRadius: 100, backgroundColor: "#ffffff2e", alignSelf: "flex-start"  }}>
    //           <Ionicons name="speedometer-outline" size={20} color="#fff" />
    //         </View>
    //         <Text style={styles.thresholdButtonText}>Pressure</Text>
    //       </TouchableOpacity>

    //     </View>
    //   );
    // }

    // return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.tabContainer}>
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
      </View> */}

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
      {/* <Modal
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
                style={[styles.modalButton, { backgroundColor: '#242328', borderColor: '#ccc', borderWidth: 1 }]} 
                onPress={() => setIsTempModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#1654ff' }]} 
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
      </Modal> */}

      {/* HUMID MODAL */}
      {/* <Modal
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
      </Modal> */}
    </SafeAreaView>
  )
}

export default ThresholdScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    // backgroundColor: '#c4c4c4',
    // backgroundColor: 'blue'
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 40,
    gap: 10,
    marginHorizontal: 12,
    overflow: 'hidden',
    // marginBottom: 10,
    // marginTop: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  
  activeTabButton: {
    backgroundColor: '#1654ff',
  },
  
  inactiveTabButton: {
    backgroundColor: '#232227',
  },
  
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  
  activeTabText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
  },
  
  inactiveTabText: {
    color: '#ffffff',
  },

  scrollContent: {
    padding: 5,
    paddingBottom: 60,
    flexGrow: 1
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    height: 'auto',
    padding: 10,
    borderRadius: 20,
  },
  contentTitle: {
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 'auto',
    fontSize: 26,
    marginBottom: 20,
    marginTop: 20,
    color: '#fff'
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
    marginBottom: 10,
  },
  cardTitle:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center'
  },
  sensorCard:{
    width: '49%',
  },
  sensorReadingCard:{
    backgroundColor: '#242328',
    borderRadius: 40,
    padding: 20,
    height: 180,
  },
  sensorIcon:{
    width: 40,
    height: 40
  },
  sensorValueText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
    color: "#fff"
  },
  sensorStatusText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 3
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
    backgroundColor: '#242328',
    padding: 18,
    borderRadius: 20,
    marginTop: 20,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  thresholdButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#242328',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold'
  },
  modalInputTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    fontFamily: 'Poppins-Regular'
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#3b3b3b',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: 'Poppins-Regular'
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  fullWidthCardContainer: {
    width: '100%',
  },
})
