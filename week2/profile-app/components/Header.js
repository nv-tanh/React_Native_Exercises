import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';




export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <Ionicons name="ios-arrow-back" size={32} style={styles.icon} />
                <AntDesign name="appstore1" size={28} style={styles.icon} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        flex: 0.75,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    icon: {
        marginHorizontal: 5,
        opacity: .6
    },
})
