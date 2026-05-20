import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

const ManualScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Text style={styles.title}>User Manual</Text> */}
        <View style={styles.manualContainer}>

          <Text style={styles.header}>
            SMALL-SCALE BIOGAS SYSTEM
          </Text>

          <Text style={styles.subHeader}>
            User Manual and Safety Instructions
          </Text>

          <Text style={styles.paragraphItalic}>
            Please read this manual carefully before operating the system and keep it for future reference.
            Images and illustrations are for reference only and may vary from the final prototype.
          </Text>

          <Text style={styles.sectionTitle}>
            IMPORTANT SAFETY PRECAUTIONS
          </Text>

          <Text style={styles.paragraph}>
            When operating the Biogas System, basic safety precautions must always be followed, including
            the instructions below. Failure to follow these precautions may result in injury, gas leakage,
            fire hazards, or damage to the system.
          </Text>

        </View>
        
        <View style={styles.tableContainer}>
          {/* Precautions on Use */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>Precautions on Use</Text>
            <Text style={styles.rightCol}>
              • Do not allow people with physical, cognitive, or mental disability or those lacking relevant knowledge or experience including children, to operate the product.{"\n"}{"\n"}
              • Do not allow children to approach, touch, play with, or use the product.
            </Text>
          </View>

          {/* Restrictions */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>Restrictions on Use</Text>
            <Text style={styles.rightCol}>
              • Do not place the product close to a fire or heat source and install in well-ventilated areas.{"\n"}{"\n"}
              • Ensure food waste does not contain bones or non-biodegradable matter.{"\n"}{"\n"}
              • Avoid using dried cow dung as it reduces biogas efficiency.
            </Text>
          </View>

          {/* Electric Power */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>Precautions on Electric Power</Text>
            <Text style={styles.rightCol}>
              • Always switch OFF and disconnect before inspection or maintenance.{"\n"}{"\n"}
              • Keep out of reach of children to avoid electric shock.{"\n"}{"\n"}
              • Do not use wet hands when handling plugs.{"\n"}{"\n"}
              • Use insulated wires and replace damaged parts with professionals.
            </Text>
          </View>

          {/* Environment */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>Environment</Text>
            <Text style={styles.rightCol}>
              • Do not allow slurry to enter drains or water sources.{"\n"}{"\n"}
              • Use by-products properly as fertilizer.{"\n"}{"\n"}
              • Keep area clean to avoid pests and odor.
            </Text>
          </View>

          {/* In Use */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>In Use</Text>
            <Text style={styles.rightCol}>
              • Do not exceed system capacity.{"\n"}{"\n"}
              • Check for leaks, noise, or issues during operation.{"\n"}{"\n"}
              • Keep fire and sparks away.{"\n"}{"\n"}
              • Ensure trained users operate the system.
            </Text>
          </View>

          {/* After Use */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>After Use</Text>
            <Text style={styles.rightCol}>
              • Shut down electrical components and close gas valves.{"\n"}{"\n"}
              • Inspect system after operation.{"\n"}{"\n"}
              • Store components in a clean and dry area.
            </Text>
          </View>

          {/* Maintenance */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>Cleaning and Maintenance</Text>
            <Text style={styles.rightCol}>
              • Remove dirt and waste buildup.{"\n"}{"\n"}
              • Check wires, pipes, and connections regularly.{"\n"}{"\n"}
              • Perform routine checks for safe operation.
            </Text>
          </View>

          {/* Fault */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>Abnormality or Fault</Text>
            <Text style={styles.rightCol}>
              • Turn OFF system if unusual sounds or leaks occur.{"\n"}{"\n"}
              • Disconnect power immediately.{"\n"}{"\n"}
              • Do not attempt complex repairs without expertise.{"\n"}{"\n"}
              • Fix issues before reuse.
            </Text>
          </View>

          {/* Mobile App */}
          <View style={styles.row}>
            <Text style={styles.leftCol}>Mobile Application</Text>
            <Text style={styles.rightCol}>
              • Use official mobile app to operate system.{"\n"}{"\n"}
              • Maintain stable internet connection.{"\n"}{"\n"}
              • Monitor readings, alerts, and notifications.
            </Text>
          </View>

        </View>

        <View style={styles.manualContainer}>
          <Text style={styles.sectionTitle}>
            PRODUCT DESCRIPTION
          </Text>

          <Text style={styles.paragraph}>
            The Biogas System consists of several major components that work together to convert food waste into usable biogas. These components include a food waste shredder, an anaerobic digester, a gas storage container, a sensor module, an ESP32 microcontroller, a mobile monitoring application, a gas outlet valve with hose, an electrical power supply, and a mixer.
          </Text>

          <Text style={styles.paragraph}>
            The anaerobic digester drum serves as an airtight container that houses the food waste slurry and is equipped with inlet, outlet, and sensor ports.
          </Text>

          <Text style={styles.paragraph}>
            The gas storage system collects the biogas produced during the digestion process and is designed to operate only under low-pressure conditions.
          </Text>

          <Text style={styles.paragraph}>
            The sensor enclosure protects the MQ-4 gas sensor, pressure sensor, and temperature sensor from environmental damage.
          </Text>

          <Text style={styles.paragraph}>
            The control unit uses an ESP32 microcontroller with Wi-Fi capability to transmit real-time sensor data to the Firebase database, allowing continuous monitoring through the mobile application.
          </Text>

        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            SYSTEM FUNCTION OVERVIEW
          </Text>

          <Text style={styles.paragraph}>
            The system converts biodegradable food waste into methane gas through an anaerobic digestion process. It continuously monitors key operational parameters, including temperature, gas pressure, and gas presence, to ensure safe and efficient biogas production. All collected data are transmitted in real time to a mobile application, where users can view system status and receive alerts and safety notifications as needed.
          </Text>

          <Text style={styles.sectionTitle}>
            INSTRUCTIONS FOR USE
          </Text>

          <Text style={styles.subHeader}>
            Before First Use
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. Place the system in a well-ventilated outdoor location.{"\n"}{"\n"}
            2. Ensure the digester drum is clean and dry.{"\n"}{"\n"}
            3. Confirm that all hoses and valves are tightly secured.{"\n"}{"\n"}
            4. Verify that sensors are connected and functioning.{"\n"}{"\n"}
            5. Open the mobile application and check system status.
          </Text>
        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            PREPARATION OF FOOD WASTE
          </Text>

          {/* Header Row */}
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableHeaderCell}>ALLOWED</Text>
            <Text style={styles.tableHeaderCell}>NOT ALLOWED</Text>
          </View>

          {/* Row 1 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Rice</Text>
            <Text style={styles.tableCell}>Plastic</Text>
          </View>

          {/* Row 2 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Vegetables</Text>
            <Text style={styles.tableCell}>Metal</Text>
          </View>

          {/* Row 3 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Fruits</Text>
            <Text style={styles.tableCell}>Glass</Text>
          </View>

          {/* Row 4 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Bread</Text>
            <Text style={styles.tableCell}>Bones / Shells</Text>
          </View>

          {/* Row 5 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Small amounts of meat and dairy</Text>
            <Text style={styles.tableCell}>Chemicals, detergents, oils</Text>
          </View>

        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            SLURRY PREPARATION AND SHREDDING PROCESS
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. Mix food waste with clean water at a 1:1 ratio before shredding.{"\n"}{"\n"}
            2. Pour the prepared mixture into the shredder inlet.{"\n"}{"\n"}
            3. Turn ON the shredder and allow the mixture to be processed.{"\n"}{"\n"}
            4. The shredder automatically transfers the shredded slurry to the first digestion chamber.{"\n"}{"\n"}
            5. Turn OFF and unplug the shredder after the process is completed.
          </Text>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠ Do not overload the shredder to prevent motor damage and uneven shredding.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            LOADING AND MIXING IN THE FIRST CHAMBER
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. The shredded slurry is directly fed into the first anaerobic chamber.{"\n"}{"\n"}
            2. A built-in mixer operates to ensure uniform mixing of the contents.{"\n"}{"\n"}
            3. Proper mixing prevents sedimentation and improves microbial activity.
          </Text>

        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            Anaerobic Digestion Operation
          </Text>

          <Text style={styles.paragraph}>
            Anaerobic digestion begins once the digester chamber is properly sealed. Oxygen must not enter the chamber during operation to maintain anaerobic conditions. Microbial activity breaks down the organic matter and gradually produces biogas over several days.
          </Text>

          <Text style={styles.sectionTitle}>
            MOBILE APPLICATION OPERATION
          </Text>

          <Text style={styles.paragraph}>
            The mobile application is used to monitor the real-time operating condition of the biogas
            system. It displays the current temperature in degrees Celsius, gas pressure in kilopascals,
            and the biogas detection status. The biogas detection status is clearly indicated as either <Text style={{ fontFamily: 'Poppins-SemiBold' }}>“NO BIOGAS DETECTED”</Text> or <Text style={{ fontFamily: 'Poppins-SemiBold' }}>“BIOGAS DETECTED”</Text> allowing immediate identification of
gas production.
          </Text>

          <Text style={styles.paragraph}>
            The application automatically generates alerts and notifications to support safe and efficient system operation. Temperature readings are interpreted by the system to guide digestion performance. When the temperature is low, the application displays the message <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"Temperature is low, slow digestion"</Text>. During normal operation, the message <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"Temperature is normal, digesting"</Text> is shown. When the optimal temperature range is reached, the application displays <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"Temperature is optimal, works best for digestion"</Text>. If the temperature exceeds safe limits, a warning message stating <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"Temperature is too high"</Text> is displayed.
          </Text>

          <Text style={styles.paragraph}>
            Gas pressure is continuously monitored by the system. When the pressure reaches an optimal level, the application displays the message <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"Pressure reached optimal level, collect biogas now"</Text>. If the pressure becomes too high, a warning message stating <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"Pressure too high, release valve"</Text> is shown. Biogas detection is also indicated clearly by the application, displaying either <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"Biogas Detected"</Text> or <Text style={{ fontFamily: 'Poppins-SemiBold' }}>"No Biogas Detected"</Text> to inform the current gas production status.
          </Text>
        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            GAS LEAK DETECTION AND RESPONSE
          </Text>

          <Text style={styles.subHeader}>
            Leak Detection Method
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. An MQ-4 methane sensor is installed inside the enclosure to monitor gas levels.
            {"\n"}{"\n"}2. The sensor detects methane concentrations outside normal operating conditions.
            {"\n"}{"\n"}3. The system sends real-time alerts to the mobile application when a leak is detected.
          </Text>

          <Text style={styles.subHeader}>
            Leak Response Procedure
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. Close the gas valve immediately to stop the gas flow.
            {"\n"}{"\n"}2. Power off the electrical system to eliminate ignition sources.
            {"\n"}{"\n"}3. Ventilate the surrounding area to disperse accumulated gas.
            {"\n"}{"\n"}4. Inspect the hoses, valves, and seals for possible sources of leakage.
            {"\n"}{"\n"}5. Perform necessary repairs before resuming system operation.
          </Text>
        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            MAINTENANCE AND CLEANING
          </Text>

          <Text style={styles.subHeader}>
            Daily Maintenance
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ➢ Check the mobile application readings to ensure that the system is operating properly.
            {"\n"}{"\n"}➢ Observe any gas odor or abnormal sound during operation.
          </Text>

          <Text style={styles.subHeader}>
            Weekly Maintenance
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ➢ Weekly maintenance involves inspecting the gas hoses and clamps for any signs of leaks, wear, or looseness.
            {"\n"}{"\n"}➢ The shredder components should also be cleaned regularly to prevent buildup and to ensure efficient system performance.
          </Text>

          <Text style={styles.subHeader}>
            Monthly Maintenance
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ➢ Monthly maintenance includes inspecting the digester drum structure for signs of damage, corrosion, or misalignment.
            {"\n"}{"\n"}➢ Sensor accuracy must be checked and recalibrated if necessary to maintain reliable monitoring.
            {"\n"}{"\n"}➢ All fittings should be tightened regularly to preserve system integrity and prevent gas leaks.
          </Text>
        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            SLURRY REMOVAL
          </Text>

          <Text style={styles.paragraph}>
            Slurry removal should be performed after a retention period of 20 to 30 days. The removed digestate can be properly processed and reused as an organic fertilizer.
          </Text>

          <Text style={styles.subHeader}>
            Step 1: Safety First
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ● Wear gloves and boots (slurry can be messy and contain germs).
            {"\n"}{"\n"}● Keep the area clean and well-ventilated.
            {"\n"}{"\n"}● Avoid inhaling gas directly from the drum.
          </Text>

          <Text style={styles.subHeader}>
            Step 2: Check Gas Production
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ● Make sure most of the gas has been used or stored.
            {"\n"}{"\n"}● Slurry removal is easier when gas pressure inside the drum is low.
          </Text>

          <Text style={styles.subHeader}>
            Step 3: Prepare Containers
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ● Have a bucket or small container ready for collecting slurry.
            {"\n"}{"\n"}● You can also have a small plastic funnel to make pouring easier.
          </Text>

          <Text style={styles.subHeader}>
            Step 4: Open the Slurry Outlet
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ● Slowly open the valve to start draining the slurry.
          </Text>

          <Text style={styles.subHeader}>
            Step 5: Collect or Transfer Slurry
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ● Let the slurry flow into your bucket or pit.
            {"\n"}{"\n"}● If it’s thick, you can use a small stick or ladle to help it flow.
            {"\n"}{"\n"}● Be careful: don’t remove too much at once — leave some slurry for the next batch to start digestion.
          </Text>

          <Text style={styles.subHeader}>
            Step 6: Close the Outlet
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ● Once the slurry is removed, securely close the valve.
            {"\n"}{"\n"}● Make sure there’s no leak for safety and hygiene.
          </Text>

          <Text style={styles.subHeader}>
            Step 7: Clean Up
          </Text>

          <Text style={styles.paragraphNotJustify}>
            ● Rinse the outlet and any tools you use.
            {"\n"}{"\n"}● Wash hands thoroughly after handling slurry.
            {"\n"}{"\n"}● The removed slurry can be used directly as fertilizer or mixed with water for safe application.
          </Text>
        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            SENSOR LIMITATIONS
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. The MQ-4 gas sensor is designed to detect the presence of methane gas exclusively and does not provide precise quantitative concentration measurements.
            {"\n"}{"\n"}2. The performance and accuracy of the MQ-4 sensor may be influenced by environmental factors, particularly high humidity levels and the presence of alcohol or other volatile vapors.
            {"\n"}{"\n"}3. The pressure sensor is intended for low-pressure biogas systems only and is unsuitable for applications involving compressed gas storage.
            {"\n"}{"\n"}4. The pressure sensor is not engineered to withstand or accurately measure high-pressure gas conditions, and exposure to such conditions may result in sensor failure.
            {"\n"}{"\n"}5. The temperature sensor measures localized thermal conditions and may not accurately represent the average temperature distribution within the anaerobic digester.
          </Text>
        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            RISK AND MITIGATION PLAN
          </Text>

          {/* Header Row */}
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableHeaderCell}>RISK</Text>
            <Text style={styles.tableHeaderCell}>CAUSE</Text>
            <Text style={styles.tableHeaderCell}>MITIGATION</Text>
          </View>

          {/* Row 1 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Gas leakage</Text>
            <Text style={styles.tableCell}>Loose fittings</Text>
            <Text style={styles.tableCell}>MQ-4 alerts</Text>
          </View>

          {/* Row 2 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Overpressure</Text>
            <Text style={styles.tableCell}>Excess gas</Text>
            <Text style={styles.tableCell}>Pressure Sensor</Text>
          </View>

          {/* Row 3 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Fire hazard</Text>
            <Text style={styles.tableCell}>Open flame</Text>
            <Text style={styles.tableCell}>Safety labels</Text>
          </View>

          {/* Row 4 */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Sensor failure</Text>
            <Text style={styles.tableCell}>Aging</Text>
            <Text style={styles.tableCell}>Scheduled maintenance</Text>
          </View>

        </View>

        <View style={[styles.manualContainer, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>
            EMERGENCY PROCEDURES
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. If a gas alarm is triggered, stop the operation immediately to prevent potential hazards.
            {"\n"}{"\n"}2. In the event of a power failure, close the gas valve to prevent uncontrolled gas release.
            {"\n"}{"\n"}3. If structural damage is detected, drain the system and discontinue use until it has been properly repaired or replaced.
          </Text>

          <Text style={styles.sectionTitle}>
            ENVIRONMENTAL PROTECTION
          </Text>

          <Text style={styles.paragraphNotJustify}>
            1. This system contributes to environmental sustainability by reducing food waste that would otherwise be sent to landfills.
            {"\n"}{"\n"}2. It produces renewable energy in the form of biogas, helping decrease dependence on fossil fuels.
            {"\n"}{"\n"}3. The system generates organic fertilizer from digested waste, which can be safely reused for soil enrichment.
            {"\n"}{"\n"}4. It reduces methane emissions from landfills by capturing and utilizing methane produced during decomposition.
            {"\n"}{"\n"}5. At the end of its service life, all electrical components must be disposed of in accordance with electronic waste disposal regulations to minimize environmental impact.
          </Text>

        </View>
      </ScrollView>
    </View>
  )
}

export default ManualScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', },
  scrollContent: { alignItems: 'center', paddingTop: 30, paddingBottom: 140 },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
    color: '#fff'
  },

  manualContainer: {
    width: '90%',
    backgroundColor: '#242328',
    padding: 20,
    borderRadius: 20,
  },

  header: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },

  subHeader: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#79BAEC',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'center'
  },

  paragraph: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: '#ddd',
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'justify',
  },
  paragraphItalic: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: '#ddd',
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  paragraphNotJustify: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: '#ddd',
    lineHeight: 20,
    marginBottom: 10
  },

  paragraphSteps: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: '#ddd',
    lineHeight: 22,
    marginBottom: 10,
  },
  warningBox: {
    backgroundColor: '#3a1f1f',
    borderLeftWidth: 4,
    borderLeftColor: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  warningText: {
    color: '#ffcccc',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
  },

  tableContainer: {
    width: '90%',
    marginTop: 20,
  },

  row: {
    flexDirection: 'row',
    backgroundColor: '#242328',
    marginBottom: 10,
    borderRadius: 15,
    padding: 12,
    alignItems: 'flex-start',
  },

  leftCol: {
    width: 120,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#79BAEC',
    paddingRight: 10,
  },

  rightCol: {
    flex: 2,
    fontFamily: 'Poppins-Light',
    fontSize: 11,
    color: '#ddd',
    lineHeight: 16,
  },

  tableRowHeader: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#1654ff',
    backgroundColor: '#1f1f1f',
    marginTop: 10,
  },

  tableRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#333',
  },

  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },

  tableCell: {
    flex: 1,
    padding: 10,
    fontFamily: 'Poppins-Light',
    fontSize: 11,
    color: '#ddd',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },

})