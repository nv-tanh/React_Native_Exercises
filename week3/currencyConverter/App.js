import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import "intl";
import "intl/locale-data/jsonp/en";

const ConversionTypeButton = props => {
  const backgroundColor =
    props.fromCurrency === props.from && props.toCurrency === props.to
      ? "lightblue"
      : null;
  const buttonStyle = { backgroundColor: backgroundColor };

  const fromFlag = props.from === "usd" ? "🇺🇸" : "🇻🇳";
  const toFlag = props.to === "usd" ? "🇺🇸" : "🇻🇳";

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={() => props.setConversionCurrencies(props.from, props.to)}
    >
      <Text style={styles.buttonText}>
        {fromFlag} to {toFlag}
      </Text>
    </TouchableOpacity>
  );
};

const FormattedCurrency = props => {
  const format = props.type === "usd" ? "us" : "vn";
  const currency = props.type === "usd" ? "USD" : "VND";
  const flag = props.type === "usd" ? "🇺🇸" : "🇻🇳";

  const formatter = new Intl.NumberFormat(format, {
    currency,
    style: "currency"
  });

  return (
    <Text style={styles.currencyText}>
      {formatter.format(props.value)} {flag} {currency}
    </Text>
  );
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fromCurrency: "usd",
      toCurrency: "vnd",
      currentCurrencyValue: 0,
      convertCurrencyValue: 0
    };
  }

  setConversionCurrencies = async (from, to) => {
    await this.setState({ fromCurrency: from, toCurrency: to });

    this.convertCurrency(this.state.currentCurrencyValue);
  };

  convertCurrency = value => {
    if (value == "") value = 0;
    let convertedValue;
    if (this.state.fromCurrency === "vnd") {
      convertedValue = value / 23000;
    } else {
      convertedValue = 23000 * value;
    }
    this.setState({
      currentCurrencyValue: value,
      convertCurrencyValue: convertedValue
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Please enter the value of the currency you want to convert</Text>
        <TextInput
          autoFocus
          textAlign="center"
          selectionColor="red"
          keyboardType="number-pad"
          placeholder="100,000,000 VND"
          onChangeText={value => {
            this.convertCurrency(value);
          }}
          style={styles.txtInput}
        />
        <ConversionTypeButton
          from="usd"
          to="vnd"
          toCurrency={this.state.toCurrency}
          fromCurrency={this.state.fromCurrency}
          setConversionCurrencies={this.setConversionCurrencies}
        />
        <ConversionTypeButton
          from="vnd"
          to="usd"
          toCurrency={this.state.toCurrency}
          fromCurrency={this.state.fromCurrency}
          setConversionCurrencies={this.setConversionCurrencies}
        />
        <Text>Current currency:</Text>
        <FormattedCurrency
          type={this.state.fromCurrency}
          value={this.state.currentCurrencyValue}
        />
        <Text>Conversion currenecy:</Text>
        <FormattedCurrency
          type={this.state.toCurrency}
          value={this.state.convertCurrencyValue}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  txtInput: {
    height: 60,
    padding: 5,
    width: 300,
    fontSize: 35,
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 30,
    marginVertical: 10
  },
  button: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    borderColor: "lightblue",
    justifyContent: "center"
  },
  currencyText: {
    fontSize: 30,
    color: "green",
    fontWeight: "bold"
  }
});
