import { useMemo } from "react";
import { View } from "react-native";
import HeaderComponent from "../../components/Header/HeaderComponent";
import { getTheme } from "../../tools/getTheme";
import Link from "../../components/Link";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import getStyles from "./linksScreenStyles";

export default LinksScreen = ({ navigation }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const links = [
    {
      link: "https://www.sfscon.it/about/",
      label: "About",
      placeholder: "https://www.sfscon.it/about",
    },
    {
      link: "https://www.sfscon.it/venue/",
      label: "Venue",
      placeholder: "https://www.sfscon.it/venue",
    },
    {
      link: "https://www.sfscon.it/programs-archive/",
      label: "Past editions",
      placeholder: "https://www.sfscon.it/programs-archive",
    },
  ];

  const goBack = () => {
    navigation.navigate("MoreScreen");
  };

  return (
    <WrapperComponent>
      <View style={styles.container}>
        <HeaderComponent
          renderWithButton
          handleGoBack={goBack}
          title={"Links"}
        />
        <View style={styles.linksContainer}>
          {links.map(({ label, link, placeholder }, idx) => (
            <Link
              key={idx}
              label={label}
              link={link}
              placeholder={placeholder}
            />
          ))}
        </View>
      </View>
    </WrapperComponent>
  );
};
