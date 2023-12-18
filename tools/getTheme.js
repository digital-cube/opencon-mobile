import { colors } from "../constants/Colors";
import { useSelector } from "react-redux";

export const getTheme = () => {
  const theme = useSelector((state) => state.app.theme);
  return theme ? colors[theme] : colors["light"];
};
