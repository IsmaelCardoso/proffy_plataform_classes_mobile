import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import styles from "./styles";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res) {
        const favoritedTeachers = JSON.parse(res);

        setFavorites(favoritedTeachers);
      }
    });
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  console.log("FAVORITE", favorites);

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Favorite;
