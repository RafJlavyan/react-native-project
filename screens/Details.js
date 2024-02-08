import {
  Image,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  FlatList,
  Platform,
} from "react-native";
import { COLORS, SIZES, FONTS, assets, SHADOWS } from "../constants";
import {
  CircleButton,
  RectButton,
  SubInfo,
  FocusedStatus,
  DetailsDesc,
  DetailsBid,
} from "../components";
import React from "react";

const ios = Platform.OS === "ios";
const android = Platform.OS === "android";
const DetailsHeader = ({ data, navigation }) => (
  <View style={{ width: "100%", height: 373 }}>
    <Image
      source={data.image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={
        ios
          ? StatusBar.currentHeight + 15
          : android
          ? StatusBar.currentHeight - 15
          : ""
      }
    />
    <CircleButton
      imgUrl={assets.heart}
      handlePress={() => navigation.goBack()}
      right={15}
      top={
        ios
          ? StatusBar.currentHeight + 15
          : android
          ? StatusBar.currentHeight - 15
          : ""
      }
    />
  </View>
);

export default function Details({ route, navigation }) {
  const { data } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatus
        barStyle="dark-content"
        backgroundColor="transparent"
        transLucent={true}
      />
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 30,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.5",
        }}
      >
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>
      <FlatList
        data={data.bids}
        renderItem={({ item }) => <DetailsBid bid={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.extraLarge * 3 }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc data={data} />
              {data.bids.length > 0 && (
                <Text style={{ fontSize: SIZES.font, color: COLORS.primary }}>
                  Current Bids
                </Text>
              )}
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
}
