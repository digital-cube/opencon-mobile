import SVGLogoLight from "../assets/icons/logo_light.svg";
import SVGLogoDark from "../assets/icons/logo_dark.svg";
import { useSelector } from "react-redux";

export default LogoComponent = ({ width, height }) => {
  const theme = useSelector((state) => state.app.theme);
  const render =
    theme === "light" ? (
      <SVGLogoLight width={width || 80} height={height || 55} />
    ) : (
      <SVGLogoDark />
    );
  return render;
};
