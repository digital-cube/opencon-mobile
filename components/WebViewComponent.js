import AutoHeightWebView from "react-native-autoheight-webview";
import { Dimensions } from "react-native";
import { getTheme } from "../tools/getTheme";

export default WebViewComponent = ({ source }) => {
  const theme = getTheme();
  return (
    <AutoHeightWebView
      style={{ width: Dimensions.get("window").width }}
      customStyle={`
        p {
          font-size: 16px;
          line-height: 1.7;
          max-width: 87%;
          color: ${theme?.textHTML};
          font-family: 'Source Sans Pro', sans-serif;
        }
      `}
      files={[
        {
          href: "cssfileaddress",
          type: "text/css",
          rel: "stylesheet",
        },
      ]}
      source={{
        html: `<p>${source}</p>`,
      }}
      viewportContent={"width=device-width, user-scalable=no"}
      scrollEnabled={false}
      androidHardwareAccelerationDisabled={true}
    />
  );
};
