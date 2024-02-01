import * as React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from 'react-native-screens/native-stack';
import * as jotai from 'jotai';

import { ScreenStack, Screen } from 'react-native-screens';

type SheetDetent = NativeStackNavigationOptions['sheetAllowedDetents'];
type SheetUndimmedDetent =
  NativeStackNavigationOptions['sheetLargestUndimmedDetent'];

type NavProp = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Stack = createNativeStackNavigator();

// const initialAllowedDetentsArray = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const initialAllowedDetentsArray = [0.3, 0.6, 0.9];

/// Sheet options
// const allowedDetentsAtom = jotai.atom<SheetDetent>('all');
// const largestUndimmedDetentAtom = jotai.atom<SheetDetentTypes | number>('all');

const allowedDetentsAtom = jotai.atom<SheetDetent>(initialAllowedDetentsArray);
const largestUndimmedDetentAtom = jotai.atom<SheetUndimmedDetent>(1);

// const allowedDetentsAtom = jotai.atom<SheetDetent>([0.7]);
// const largestUndimmedDetentAtom = jotai.atom<SheetDetentTypes | number>(0);

const grabberVisibleAtom = jotai.atom(true);
const cornerRadiusAtom = jotai.atom(-1);
const expandsWhenScrolledToEdgeAtom = jotai.atom(false);

const sheetOptionsAtom = jotai.atom(get => ({
  sheetAllowedDetents: get(allowedDetentsAtom),
  sheetLargestUndimmedDetent: get(largestUndimmedDetentAtom),
  sheetGrabberVisible: get(grabberVisibleAtom),
  sheetCornerRadius: get(cornerRadiusAtom),
  sheetExpandsWhenScrolledToEdge: get(expandsWhenScrolledToEdgeAtom),
}));

export default function App(): JSX.Element {
  const sheetOptions = jotai.useAtomValue(sheetOptionsAtom);

  const initialScreenOptions: NativeStackNavigationOptions = {
    stackPresentation: 'formSheet',
    ...sheetOptions,
  };

  // return <RawScreenHome />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerRight: () => <View style={styles.headerView} />,
          headerTitleStyle: {
            color: 'cyan',
          },
          headerShown: true,
          headerHideBackButton: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Second"
          component={Second}
          options={{
            fullScreenSwipeEnabled: true,
          }}
        />
        <Stack.Screen
          name="SheetScreen"
          component={SheetScreen}
          options={{
            headerShown: false,
            ...initialScreenOptions,
          }}
        />
        <Stack.Screen
          name="SheetScreenWithScrollView"
          component={SheetScreenWithScrollView}
          options={{
            headerShown: false,
            ...initialScreenOptions,
          }}
        />
        <Stack.Screen
          name="SheetScreenWithTextInput"
          component={SheetScreenWithTextInput}
          options={{
            ...initialScreenOptions,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({ navigation }: NavProp) {
  return (
    <>
      <Button
        title="Tap me for the second screen"
        onPress={() => navigation.navigate('Second')}
      />
      <Button
        title="Tap me for the second screen"
        onPress={() => navigation.navigate('Second')}
      />
      <Button
        title="Tap me for the second screen"
        onPress={() => navigation.navigate('Second')}
      />
    </>
  );
}

function Second({ navigation }: NavProp) {
  return (
    <View style={{ backgroundColor: 'lightcoral', flex: 1 }}>
      <Button
        title="Open the sheet"
        onPress={() => navigation.navigate('SheetScreen')}
      />
      <Button
        title="Open the sheet with ScrollView"
        onPress={() => navigation.navigate('SheetScreenWithScrollView')}
      />
      <Button
        title="Open the sheet with text input (keyboard interaction)"
        onPress={() => navigation.navigate('SheetScreenWithTextInput')}
      />
    </View>
  );
}

function SheetScreen({ navigation }: NavProp) {
  const [allowedDetents, setAllowedDetents] = jotai.useAtom(allowedDetentsAtom);
  const [largestUndimmedDetent, setLargestUndimmedDetent] = jotai.useAtom(
    largestUndimmedDetentAtom,
  );
  const [grabberVisible, setGrabberVisible] = jotai.useAtom(grabberVisibleAtom);
  const [cornerRadius, setCornerRadius] = jotai.useAtom(cornerRadiusAtom);
  const [expandsWhenScrolledToEdge, setExpandsWhenScrolledToEdge] =
    jotai.useAtom(expandsWhenScrolledToEdgeAtom);

  function nextDetentLevel(detent: SheetDetent): SheetDetent {
    if (Array.isArray(detent)) {
      return 'all';
    } else if (detent === 'all') {
      return 'medium';
    } else if (detent === 'medium') {
      return 'large';
    } else if (detent === 'large') {
      return initialAllowedDetentsArray;
    } else {
      return 'all';
    }
  }

  function nextUndimmedDetentLevel(
    detent: SheetUndimmedDetent,
  ): SheetUndimmedDetent {
    if (typeof detent === 'number') {
      if (Array.isArray(allowedDetents) && detent + 1 < allowedDetents.length) {
        return detent + 1;
      } else {
        return 'all';
      }
    } else if (detent === 'large') {
      if (Array.isArray(allowedDetents)) {
        return 0;
      } else {
        return 'all';
      }
    } else {
      return nextDetentLevel(detent);
    }
  }

  return (
    <View
      style={[
        styles.centeredView,
        { marginTop: 15, backgroundColor: 'darkorange' },
      ]}>
      <Button
        title="Tap me for the first screen"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Tap me for the second screen"
        onPress={() => navigation.navigate('Second')}
      />
      <Button
        title="Change the corner radius"
        onPress={() => {
          const newRadius = cornerRadius >= 150 ? -1.0 : cornerRadius + 50;
          setCornerRadius(newRadius);
        }}
      />
      <Text>radius: {cornerRadius}</Text>
      <Button
        title="Change detent level"
        onPress={() => {
          const newDetentLevel = nextDetentLevel(allowedDetents);
          setAllowedDetents(newDetentLevel);
        }}
      />
      <Text>detent: {allowedDetents}</Text>
      {/*<Button
        title="Change largest undimmed detent"
        onPress={() => {
          const newDetentLevel = nextUndimmedDetentLevel(largestUndimmedDetent);
          setLargestUndimmedDetent(newDetentLevel);
        }}
      />
      <Text>largestUndimmedDetent: {largestUndimmedDetent}</Text>
      <Button
        title="Toggle sheetExpandsWhenScrolledToEdge"
        onPress={() => {
          setExpandsWhenScrolledToEdge(!expandsWhenScrolledToEdge);
        }}
      />
      <Text>
        sheetExpandsWhenScrolledToEdge:{' '}
        {expandsWhenScrolledToEdge ? 'true' : 'false'}
      </Text>
      <Button
        title="Toggle grabber visibility"
        onPress={() => {
          setGrabberVisible(!grabberVisible);
        }}
      />*/}
    </View>
  );
}

function SheetScreenWithScrollView({ navigation }: NavProp) {
  return (
    <>
      <View style={styles.absoluteFillNoBottom}>
        <ScrollView>
          <SheetScreen navigation={navigation} />
          {[...Array(40).keys()].map(val => (
            <Text key={`${val}`}>Some component {val}</Text>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

function SheetScreenWithTextInput({ navigation }: NavProp) {
  const [textValue, setTextValue] = React.useState('text input');

  return (
    <View style={styles.centeredView}>
      <TextInput
        style={[styles.bordered, styles.keyboardTriggerTextInput]}
        value={textValue}
        onChangeText={text => setTextValue(text)}
      />
      <SheetScreen navigation={navigation} />
    </View>
  );
}

function RawScreenHome() {
  const [modalVisible, setModalVisible] = React.useState(true);

  return (
    <View style={[styles.absoluteFill, { marginTop: 100 }]}>
      <ScreenStack>
        <Screen style={[styles.absoluteFill, { backgroundColor: 'red' }]}>
          <View>
            <Button
              title="Show modal"
              onPress={() => setModalVisible(true)}
              color="white"
            />
            <Text>Sometext</Text>
          </View>
        </Screen>
        <Screen
          style={[styles.absoluteFill, { backgroundColor: 'tomato' }]}
          stackPresentation="formSheet"
          sheetCustomDetents={[0.3, 0.6, 0.9]}
          sheetExpandsWhenScrolledToEdge={true}
          sheetGrabberVisible>
          <View
            style={[
              styles.absoluteFillNoBottom,
              { backgroundColor: 'darkorange', marginTop: 15 },
            ]}>
            <View style={styles.centeredView}>
              <Button
                title="Hide modal"
                onPress={() => setModalVisible(false)}
                color="white"
              />
              {[...Array(200).keys()].map(i => (
                <Text key={i}>Sometext</Text>
              ))}
            </View>
          </View>
        </Screen>
      </ScreenStack>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: 20,
    width: 20,
    backgroundColor: 'red',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  absoluteFillNoBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // bottom: 0,
    backgroundColor: 'firebrick',
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'teal',
  },
  bordered: {
    borderColor: 'black',
    borderWidth: 2,
  },
  keyboardTriggerTextInput: {
    paddingVertical: 5,
    paddingHorizontal: 4,
    marginTop: 10,
  },
});
