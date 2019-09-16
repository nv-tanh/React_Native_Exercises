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

import ArticleItem from "../components/ArticleItem";

export default function PublisherScreen(props) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [jsonDataLength, setJsonDataLength] = useState(0);

  const id = props.navigation.getParam("otherParam", "some default value").id;

  const API_URL =
    "http://newsapi.org/v2/top-headlines?sources=" +
    id +
    "&pageSize=15&apiKey=5b752eb37f834b84bb22469b5f662376&page=";

  const getNews = async () => {
    if (lastPageReached) return;
    try {
      const response = await fetch(API_URL + pageNumber);
      const jsonData = await response.json();
      setJsonDataLength(jsonData.totalResults);
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
        <Text style={styles.label}>
          {props.navigation.getParam("otherParam", "some default value").name}
        </Text>
        <Text style={styles.info}>
          {articles.length}/{jsonDataLength}
        </Text>
      </View>
      <FlatList
        data={articles}
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

PublisherScreen.navigationOptions = {
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
