import { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Keyboard,
} from "react-native";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import { useSelector } from "react-redux";
import SVGAvatar from "../../assets/icons/avatar.svg";
import getStyles from "./authorsScreenStyles";
import { getTheme } from "../../tools/getTheme";
import LoaderComponent from "../../components/AppLoader";
import { Feather } from "@expo/vector-icons";
import InputComponent from "../../components/UI/InputComponent";
import { fromObjectToArray } from "../../tools/sessions";
import { useIsFocused } from "@react-navigation/native";
import Text from "../../components/TextComponent";

export default AuthorsScreen = ({ route, navigation }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const isFocused = useIsFocused();

  const db = useSelector((state) => state.app.db);
  const lecturers = db?.conference?.db?.lecturers;

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [authors, setAuthors] = useState(fromObjectToArray(lecturers));

  const filterAuthors = (term) => {
    if (!term) {
      return;
    }
    const filteredAuthors = fromObjectToArray(lecturers);
    setAuthors(
      filteredAuthors.filter((aut) =>
        aut.display_name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const inputRef = useRef();

  useEffect(() => {
    if (showSearchInput) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 500);
    }
  }, [showSearchInput]);

  useEffect(() => {
    if (!isFocused) {
      setShowSearchInput(false);
      setAuthors(fromObjectToArray(lecturers));
    }
  }, [isFocused]);

  const navigateToAuthorDetails = (author) => {
    navigation.navigate("AuthorDetails", { author });
  };

  const openSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <WrapperComponent>
      <Pressable style={styles.wrapper} onPress={() => Keyboard.dismiss()}>
        <View style={styles.header}>
          {showSearchInput ? (
            <View style={styles.searchContainer}>
              <>
                <TextInput
                  onChangeText={(term) => {
                    filterAuthors(term);
                  }}
                  ref={inputRef}
                  placeholder="Search authors"
                  style={styles.searchInput}
                />

                <Feather
                  name="search"
                  size={24}
                  style={styles.searchInputIcon}
                />

                <TouchableOpacity
                  onPress={() => {
                    setShowSearchInput(false);
                    setAuthors(fromObjectToArray(lecturers));
                  }}
                >
                  <Text stylesProp={styles.cancelBtnTxt}>Cancel</Text>
                </TouchableOpacity>
              </>
            </View>
          ) : (
            <>
              <Text bold stylesProp={styles.headerTitle}>
                Authors
              </Text>
              {!authors ? null : (
                <TouchableOpacity
                  onPress={openSearchInput}
                  style={
                    showSearchInput
                      ? { ...styles.searchBtn, left: 10 }
                      : styles.searchBtn
                  }
                >
                  <Feather name="search" size={24} style={styles.searchIcon} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={authors}
            contentContainerStyle={styles.flatList}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.lecturer}
                  onPress={() => navigateToAuthorDetails(item)}
                >
                  <View style={styles.imageContainer}>
                    {item.profile_picture ? (
                      <Image
                        resizeMode="cover"
                        source={{ uri: item.profile_picture }}
                        style={styles.lectProfilePic}
                      />
                    ) : (
                      <SVGAvatar width={150} height={175} />
                    )}
                  </View>

                  <View style={styles.lectInfo}>
                    <Text numberOfLines={1} stylesProp={styles.lectName}>
                      {item.display_name}
                    </Text>
                    <Text stylesProp={styles.lectCompany}>
                      {item.company_name ?? ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Pressable>
    </WrapperComponent>
  );
};
