import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DetailProduct from './DetailProduct';
import Navigation_HomeDrawer from './Navigation_HomeDrawer';
import Notifications from './Notifications';
import Settings from './Settings';
import addProduct_informations from '../screens/AddProductScreens/AddProduct_NameAndDescriptionScreen';

// Actions`
import {
  result_updateDoorStatus,
  action_realtimedb_door_firebase,
} from '../src/actions/actions_firebase';

// Redux
import {useSelector, useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const Authenticated = () => {
  const dispatch = useDispatch();
  const {isUser} = useSelector((store) => store.CurrentUserReducer);
  const {settingStatus} = useSelector((store) => store.NotificationReducer);

  const loadData = () => {
    dispatch(action_realtimedb_door_firebase());
  };

  useEffect(() => {
    if (isUser) loadData();
  }, [isUser]);

  useEffect(() => {
    result_updateDoorStatus(settingStatus);
  }, [settingStatus]);

  return isUser ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Stack_HomeDrawer"
        component={Navigation_HomeDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Stack_Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Stack_Setting"
        component={Settings}
        options={({route}) => ({title: route.params.title})}
      />

      <Stack.Screen
        name="Stack_detailProductScreen"
        component={DetailProduct}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Stack_AddProduct_NameAndDescription"
        component={addProduct_informations}
        options={{title: 'Create new wicket', headerTransparent: true}}
      />
    </Stack.Navigator>
  ) : null;
};

export default Authenticated;
