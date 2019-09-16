import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default class CountArea extends Component {
    render() {
        return (
            <View style={styles.countArea}>
                <View style={styles.countItem}>
                    <Text style={styles.countItemContent1}>45</Text>
                    <Text style={styles.countItemContent2}>Photos</Text>
                </View>
                <View style={styles.countItem}>
                    <Text style={styles.countItemContent1}>63K</Text>
                    <Text style={styles.countItemContent2}>Followers</Text>
                </View>
                <View style={styles.countItem}>
                    <Text style={styles.countItemContent1}>1</Text>
                    <Text style={styles.countItemContent2}>Following</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    countArea: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"

    },
    countItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    countItemContent1: {
        fontWeight: 'bold',
        fontSize: 25,
        opacity: .8
    },
    countItemContent2: {
        opacity: .6,
        fontSize: 18
    },
})