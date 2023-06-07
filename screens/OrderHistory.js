import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    SafeAreaView,
    Pressable,
    Image,
    FlatList,
    StyleSheet,
    TouchableHighlight,
    ImageBackground,
    ScrollView,
    Modal,
    Platform,
    
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import axios, { Axios } from "axios";
import { COLORS, icons, SIZES, images, FONTS } from "../constants";
import axiosInstance from "../axios/axiosInstance";
import { PracticeProvider, ContextP } from "../context";
import { useStateContext } from "../context";


export const OrderHistory=()=>{
    const [OrderList, setOrderList] = React.useState([]);
    
    const { findUser,currentUser, doctors, setDoctors, getDoctors } = useStateContext();
    React.useEffect(() => {
        // const getOrders = async () =>{
        //   try{
        //     const response = await axiosInstance.get("Orders/populate");
        //     console.log(response.data[1])
        //     setOrderList(response.data)
            
        //   }
        //   catch(error){
        //     console.log(error);

        //   }
        // };
        
        
        const getOrders = async () =>{
          const user = await findUser(currentUser?.email);
          if(!user) return;
          console.log('Fetching Orders for user:', user._id); // for debugging purposes only
          await axiosInstance.get(`orders/patient/6414707b96d17ff57f72c672`).then( res => 
          
            {
              console.log("the response we are getting is ",res.data)
              setOrderList(res.data)
              console.log('Orders fetched:', res.data); // for debugging purposes only
          })
        }
        // const userOrders = async () => {
        //   try{
        //     console.log(currentUser.email)
        //     const user = await findUser(currentUser.email)
        //     setMatchedUser(user)
        //     console.log("Matched User: ", matchedUser);
        //   }
        //   catch(error){
        //     console.log(error)

        //   }
          
        // }
        // userOrders();
        //getUser();
        getOrders();
    }, []);
    console.log(OrderList)
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:'row',height:"8%",alignItems:'center',}}>
              <Pressable
                    style={{
                        width: "15%",
                        padding: SIZES.padding * 0,
                        paddingLeft: SIZES.padding * 2,
                        paddingRight: 0,
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: "teal",
                        }}
                    />
                    {/* <Icon name="arrow-back-outline" size={35} color="teal" /> */}
                </Pressable>
                <View style={{width:'80%',alignItems:'center',justifyContent:'center',}}>
                  <Text style={styles.heading}>Orders History</Text>
                </View>
            </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {OrderList && OrderList.map((Order, index) => (
              
              
              
              <View key={Order._id} style={styles.OrderContainer}>
                <View style={{height:"30%",flexDirection:'row',marginBottom:"0%",alignItems:'center',}}>
                  <View style={{height:'60%',borderRadius:13,backgroundColor:'white',alignItems:'center',justifyContent:'center',width:'8%'}}>
                    <Image style={{width:20,height:20}} source={icons.order_id} resizeMode="contain" />
                  </View>
                  <Text style={{fontWeight:'bold',paddingLeft:5}}>ID : </Text>
                  <Text style={{fontWeight:'bold'}}>{Order?.orderId}</Text>
                </View>
                <View style={{height:"30%",flexDirection:'row'}}>
                  <View style={{height:"75%",alignItems:'center',justifyContent:'center',borderRadius:20,backgroundColor:"white",width:'12%'}}>
                    <Icon  name="calendar-outline" style={{color:'teal'}} size={18}/>
                  </View>
                  <View style={{paddingLeft:15,paddingTop:3,flexDirection:'column'}}>
                    <Text style={{fontWeight:'bold'}}>Date</Text>
                    <Text>{new Date(Order?.createdAt).toDateString()}</Text>
                  </View>
                  

                </View>
                <View style={{height:'40%',flexDirection:'column'}}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{}}>
                      <Icon name="pin-outline" style={{color:'teal'}} size={18}/>
                    </View>
                    <Text style={{paddingLeft:5,fontWeight:'bold'}}>{Order?.address}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:'5%'}}>
                      <View style={{flexDirection:"row"}}>
                        <Text style={{}}>Status : </Text>
                        <Text style={{fontWeight:'bold',color:'red'}}>{Order?.status}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text>Total : </Text>
                        <Text style={{fontWeight:'bold'}}>Rs {Order?.orderTotal}</Text>
                      </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
      },
      heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:'teal'
      },
      scrollContainer: {
        paddingVertical: SIZES.padding * 2,
        paddingHorizontal: SIZES.padding,
      },
      OrderContainer: {
        backgroundColor: "#E5F6F2",
        borderRadius: 12,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          height:210,
          padding:20 ,
        
      },
      infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SIZES.base,
        flexWrap: 'wrap',
      },
      title: {
        ...FONTS.h3,
        color: COLORS.gray,
        fontWeight:'bold'
      },
      value: {
        ...FONTS.h3,
        color: COLORS.black,
      },
    });
    
    export default OrderHistory;