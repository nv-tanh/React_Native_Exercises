import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
  TextInput
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ArticleItem from "../components/ArticleItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FeedScreen(props) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const API_URL =
    "http://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=15&apiKey=5b752eb37f834b84bb22469b5f662376&page=";

  const onRefresh = async () => {
    setIsFetching(true);
    await getNews();
    setIsFetching(false);
  };

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
  let txtInput = "";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{articles.length}</Text>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "space-around",
            flexDirection: "row"
          }}
        >
          <TextInput
            style={{
              height: 20,
              width: 70,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={text => {
              txtInput = text;
            }}
          />
          <TouchableOpacity
            onPress={() => {
              const newArticleList = articles.filter(article =>
                article.title.toLowerCase().includes(txtInput.toLowerCase())
              );
              setArticles(newArticleList);
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Feather name="search" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={articles}
        refreshing={isFetching}
        onRefresh={onRefresh}
        onEndReached={getNews}
        onEndReachedThreshold={1}
        renderItem={({ item }) => (
          <ArticleItem
            item={item}
            onPressPublisher={() =>
              props.navigation.navigate("Publisher", {
                itemId: 86,
                otherParam: item.source
              })
            }
          />
        )}
        keyExtractor={item => item.title}
        ListFooterComponent={
          lastPageReached ? (
            <Text>No more articles</Text>
          ) : (
            <ActivityIndicator size="large" loading={loading} />
          )
        }
      />
    </View>
  );
}

FeedScreen.navigationOptions = {
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
    width: "0%",
    backgroundColor: "pink"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 10
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
