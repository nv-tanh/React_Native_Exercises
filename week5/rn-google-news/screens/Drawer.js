import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

export default function Drawer(props) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);

  const API_URL =
    "http://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=5b752eb37f834b84bb22469b5f662376&page=";

  const getNews = async () => {
    if (lastPageReached) return;
    try {
      const response = await fetch(API_URL + pageNumber);
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        );
        setArticles(newArticleList);
        setPageNumber(pageNumber + 1);
      } else {
        setLastPageReached(true);
      }
    } catch (error) {
      setHasApiError(true);
    }
    setLoading(false);
  };

  const filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  useEffect(() => {
    getNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" loading={loading} />
      </View>
    );
  }

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text>Error =(</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>List publisher:</Text>
        <Text style={styles.info}>{articles.length}</Text>
      </View>

      <FlatList
        data={articles}
        onEndReached={getNews}
        onEndReachedThreshold={1}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Publisher", {
                itemId: 86,
                otherParam: item.source
              });
            }}
          >
            <View
              style={{
                height: 30,
                backgroundColor: "#00ffff",
                marginVertical: 5,
                borderRadius: 30 / 2,
                justifyContent: "center"
              }}
            >
              <Text style={{ marginHorizontal: 10 }}>{item.source.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.title}
        ListFooterComponent={
          lastPageReached ? (
            <Text>No more Publisher</Text>
          ) : (
            <ActivityIndicator size="large" loading={loading} />
          )
        }
      />
    </View>
  );
}

Drawer.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  header: {
    height: 30,
    width: "100%",
    backgroundColor: "pink"
  },
  row: {
    flexDirection: "row"
  },
  label: {
    fontSize: 16,
    color: "black",
    marginRight: 10,
    fontWeight: "bold"
  },
  info: {
    fontSize: 16,
    color: "grey"
  }
});
