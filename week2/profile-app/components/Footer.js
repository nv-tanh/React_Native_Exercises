import React, { Component } from 'react'
import { StyleSheet, View, } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';


export default class Footer extends Component {
    render() {
        return (
            <View style={styles.footer}>
                <AntDesign name="paperclip" size={30} style={styles.icon} />
                <Ionicons name="ios-add-circle-outline" size={32} style={styles.icon} />
                <AntDesign name="user" size={30} style={styles.icon} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 0.75,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    icon: {
        marginHorizontal: 5,
        opacity: .6
    },
});