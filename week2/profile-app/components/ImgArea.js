import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

const imgData = [
    { id: 12, imgSource: require('../assets/12.jpg') },
    { id: 7, imgSource: require('../assets/7.jpg') },
    { id: 3, imgSource: require('../assets/3.jpg') },
    { id: 1, imgSource: require('../assets/1.jpg') },
    { id: 2, imgSource: require('../assets/2.jpg') },
    { id: 4, imgSource: require('../assets/4.jpg') },
    { id: 9, imgSource: require('../assets/9.jpg') },
    { id: 5, imgSource: require('../assets/5.jpg') },
    { id: 10, imgSource: require('../assets/10.jpg') },
    { id: 6, imgSource: require('../assets/6.jpg') },
    { id: 8, imgSource: require('../assets/8.jpg') },
    { id: 11, imgSource: require('../assets/11.jpg') },
];
const centerImgData = Math.floor(imgData.length / 2);
const imgWidth = Dimensions.get('window').width / 2 - 15;


export default class ImgArea extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.imgArea}>

                <View style={{ flexDirection: "column" }}>
                    {imgData.slice(0, centerImgData).map(item => {
                        return <Image width={imgWidth} source={item.imgSource} style={styles.imgItem} key={item.id} />
                    })}
                </View>
                <View style={{ flexDirection: "column" }}>
                    {imgData.slice(centerImgData).map(item => {
                        return <Image width={imgWidth} source={item.imgSource} style={styles.imgItem} key={item.id} />
                    })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    imgArea: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    imgItem: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
})
