import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import ProductsOverviewScreen, {screenOptions as productsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {screenOptions as productDetailScreenOptions}  from '../screens/shop/ProductDetailScreen';
import CartScreen, {screenOptions as cartScreenOptions}  from '../screens/shop/CartScreen';
import OrdersScreen, {screenOptions as ordersScreenOptions} from '../screens/shop/OrdersScreen';
import UserProductsScreen, {screenOptions as userProductsScreenOptions} from '../screens/user/UserProductsScreen';
import EditProductScreen, {screenOptions as editProductScreenOptions} from '../screens/user/EditProductScreen';
import AuthScreen, {screenOptions as authScreenOptions} from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen 
                name="ProductsOverview" 
                component={ProductsOverviewScreen}
                options={productsOverviewScreenOptions} />
            <ProductsStackNavigator.Screen 
                name="ProductDetail" 
                component={ProductDetailScreen}
                options={productDetailScreenOptions} />
            <ProductsStackNavigator.Screen 
                name="Cart" 
                component={CartScreen}
                options={cartScreenOptions} />
        </ProductsStackNavigator.Navigator>
    );
};

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
// },{
//     navigationOptions: {
//         drawerIcon: (drawerConfig) => (
//             <Ionicons 
//                 size={23}
//                 name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//                 color={drawerConfig.tintColor}     
//             />
//         )
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen 
                name="Orders"
                component={OrdersScreen}
                options={ordersScreenOptions} />
        </OrdersStackNavigator.Navigator>
    );
};

// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// },{
//     navigationOptions: {
//         drawerIcon: (drawerConfig) => (
//             <Ionicons 
//                 size={23}
//                 name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//                 color={drawerConfig.tintColor}     
//             />
//         )
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen
                name="UserProducts"
                component={UserProductsScreen}
                options={userProductsScreenOptions} />
            <AdminStackNavigator.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={editProductScreenOptions} />
        </AdminStackNavigator.Navigator>
    );
}

// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
// },{
//     navigationOptions: {
//         drawerIcon: (drawerConfig) => (
//             <Ionicons 
//                 size={23}
//                 name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//                 color={drawerConfig.tintColor}     
//             />
//         )
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator 
            drawerContent={props => {
                return (
                    <View style={{flex: 1, paddingTop: 20}}>
                        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                            <DrawerItemList {...props} />
                            <Button title="Logout" color={Colors.primary} onPress={() => {
                                dispatch(authActions.logout());
                            }}/>
                        </SafeAreaView>
                    </View>
                );
            }} 
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }}>
            <ShopDrawerNavigator.Screen 
                name="Products"
                component={ProductsNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            size={23}
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            color={props.color}     
                        />
                    )
                }} />
            <ShopDrawerNavigator.Screen 
                name="Orders"
                component={OrdersNavigator}
                orders={{
                    drawerIcon: props => (
                        <Ionicons 
                            size={23}
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                            color={props.color} 
                        />
                    )
                }} />
            <ShopDrawerNavigator.Screen 
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            size={23}
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            color={props.color}     
                        />
                    )
                }} />
        </ShopDrawerNavigator.Navigator>
    );
};

// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
// },{
//     contentOptions: {
//         activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//         const dispatch = useDispatch();
//         return (
//             <View style={{flex: 1, paddingTop: 20}}>
//                 <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//                     <DrawerItems {...props} />
//                     <Button title="Logout" color={Colors.primary} onPress={() => {
//                         dispatch(authActions.logout());
//                     }}/>
//                 </SafeAreaView>
//             </View>
//         );
//     }
// });

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen 
                name="Auth"
                component={AuthScreen}
                options={authScreenOptions} />
        </AuthStackNavigator.Navigator>
    );
};

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// },
// {defaultNavigationOptions: defaultNavOptions});

// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);