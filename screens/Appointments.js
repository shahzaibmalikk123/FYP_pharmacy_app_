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

export const Appointments=({ route, navigation })=>{
    
    const [appointmentList, setAppointmentList] = React.useState([]);
    const [textColor , settextColor] =React.useState([]);
    const { appointments } = route.params;
    const { findUser,currentUser, doctors, setDoctors, getDoctors } = useStateContext();
    const [user, setUser]= React.useState({})

    React.useEffect(() => {
        // const getAppointments = async () =>{
        //   try{
        //     const response = await axiosInstance.get("appointments/populate");
        //     console.log(response.data[1])
        //     setAppointmentList(response.data)
            
        //   }
        //   catch(error){
        //     console.log(error);

        //   }
        // };
        
        
        const getAppointments = async () =>{
          const user = await findUser(currentUser?.email);
          if(!user) return;
          console.log('Fetching appointments for user:', user._id); // for debugging purposes only
          await axiosInstance.get(`appointments/${user._id}/patient`).then( res => 
          
            {
              console.log("the response we are getting is ",res.data)
              setAppointmentList(res.data)
              console.log('Appointments fetched:', res.data); // for debugging purposes only
          })
          ;
          switch (appointmentList?.status) {
            case 'missed':
              settextColor("red");
              break;
            case 'completed':
              settextColor("green");
              break;
            case 'pending':
              settextColor("yellow");
              break;
            default:
              settextColor("black");
              break;
          }

         
        }
        // const userAppointments = async () => {
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
        // userAppointments();
        //getUser();
        getAppointments();
    }, []);
    console.log(appointmentList)

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
                  <Text style={styles.heading}>My Appointments</Text>
                </View>
            </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {appointmentList && appointmentList.map((appointment, index) => (
              
              
              
              
              <View key={appointment._id} style={styles.appointmentContainer}>
              <View style={{height:"12%",flexDirection:'row',marginBottom:"0%",alignItems:'center',}}>
                <View style={{height:'70%',borderRadius:13,backgroundColor:'white',alignItems:'center',justifyContent:'center',width:'7%'}}>
                  <Image style={{width:20,height:20}} source={icons.order_id} resizeMode="contain" />
                </View>
                <Text style={{paddingLeft:5}}>Appointment ID : </Text>
                <Text style={{fontWeight:'bold'}}>{appointment?.appointment_id}</Text>
              </View>
              <View style={{height:"22%",flexDirection:'row',}}>
                <View style={{height:"52%",alignItems:'center',justifyContent:'center',borderRadius:20,backgroundColor:"white",width:'10%'}}>
                  <Icon  name="calendar-outline" style={{color:'teal'}} size={18}/>
                </View>
                <View style={{paddingLeft:15,paddingTop:3,flexDirection:'column'}}>
                  <Text style={{fontWeight:'bold'}}>Date & Time</Text>
                  <Text style={{lineHeight:20}}>{new Date(appointment?.createdAt).toDateString()}</Text>
                  <Text style={{lineHeight:20}}>{appointment?.time}</Text>
                </View>
                

              </View>
              <View style={{height:"10%",flexDirection:'row',marginBottom:"0%",alignItems:'center',}}>
                
                <Text style={{fontWeight:'bold',paddingLeft:5}}>Doctor's Info</Text>
                
              </View>
              <View style={{height:"12%",flexDirection:'row',alignItems:'center'}}>
                <View style={{height:"85%",alignItems:'center',justifyContent:'center',borderRadius:20,backgroundColor:"white",width:'9%'}}>
                  <Icon  name="calendar-outline" style={{color:'teal'}} size={18}/>
                </View>
                <View style={{paddingLeft:18,paddingTop:3,flexDirection:'column'}}>
                  <Text style={{fontWeight:'bold'}}>{
                     doctors.find(doctor => doctor._id === appointment.doctor_id)?.name || "Doctor"
                    
                  }</Text>
                  
                </View>
                

              </View>
              <View style={{height:"10%",flexDirection:'row',marginBottom:"0%",alignItems:'center',}}>
                
                <Text style={{fontWeight:'bold',paddingLeft:5}}>Patient's Info</Text>
                
              </View>
              <View style={{height:"12%",flexDirection:'row',alignItems:'center'}}>
                <View style={{height:"85%",alignItems:'center',justifyContent:'center',borderRadius:20,backgroundColor:"white",width:'9%'}}>
                  <Icon  name="calendar-outline" style={{color:'teal'}} size={18}/>
                </View>
                <View style={{paddingLeft:18,paddingTop:3,flexDirection:'row'}}>
                  <Text>ID : </Text>
                  <Text style={{fontWeight:'bold'}}>{appointment?.patient_id}</Text>
                  
                </View>
                

              </View>
              <View style={{height:'20%',alignItems:'center',flexDirection:'row'}}>
                <View style={{height:'2%'}}></View>
                <Text>Status : </Text>
                <Text style={{color : 'red' , fontWeight:'bold' }}>{appointment?.status}</Text>
                

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
      appointmentContainer: {
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
          height:340,
          padding:20,

        
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
    
    export default Appointments;