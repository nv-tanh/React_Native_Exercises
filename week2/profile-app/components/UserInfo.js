import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';


export default class UserInfo extends React.Component {
    render() {
        return (
            <View style={styles.userInfo}>
                <View style={{
                    flex: 1, flexDirection: "row"
                }}>
                    <View style={{ flex: 0.4, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            width={120}
                            style={styles.avatar}
                            source={require('../assets/avt.jpg')}
                        />
                    </View>
                    <View style={styles.userInfo1}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, opacity: .8 }}>Tanh Nguyen</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ opacity: .6 }}>Dreamer</Text>
                            <AntDesign name="heart" size={13} style={{ marginLeft: 3, opacity: 0.6 }} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => { Alert.alert('followed'); }} >
                                <View style={[styles.btn, styles.btnFollow]}>
                                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 15 }} >Follow</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Alert.alert('message send'); }}>
                                <View style={[styles.btn, styles.btnSend]} >
                                    <Feather name="send" size={20} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    userInfo: {
        flex: 2,
    },
    avatar: {
        width: 120, height: 120,
        borderRadius: 120 / 2,
    },
    userInfo1: {
        flex: 0.6,
        justifyContent: "center",
    }
    ,
    btn: {
        marginTop: 15,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    btnFollow: {
        width: 100,
        backgroundColor: "rgb(71,113,246)",
    }, btnSend: {
        width: 50,
        backgroundColor: "rgb(120,213,250)",
        marginLeft: 10,
    },
})