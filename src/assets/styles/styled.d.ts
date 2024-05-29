import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      white: string;
      white100: string;
      white200: string;
      white300: string;
      lightGrey100: string;
      lightGrey200: string;
      lightGrey300: string;
      lightGrey500: string;
      lightBlue100: string;
      darkBlue100: string;
      darkBlue200: string;
      lightRed100: string;
      lightRed200: string;
      black100: string;
      black200: string;
    };
    gradients: {
      ibcBlue: string;
    },
    weights: {
      normal: string;
      semiBold: string;
      bold: string;
      extraBold: string;
      black: string;
    };
    fontSizes: {
      xsm: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    radius: {
      xm: string;
      sm: string;
      md: string;
      xl: string;
      header1: string;
      header2: string;
    };
    shadows: {
      shadow: string;
      shadow100: string;
    };
    glows: {
      glow: string;
      glow100: string;
    };
    widths: {
      buttons: {
        close: string;
        xsm: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      imputs: {
        xsm: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      cards: {
        xsm: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      forms: {
        xsm: string;
        sm: string;
        md: string;
        lg: string;
      };
    };
    heights: {
      buttons: {
        close: string;
        xsm: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      imputs: {
        xsm: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      cards: {
        xsm: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      forms: {
        xsm: string;
        sm: string;
        md: string;
        lg: string;
      };
    };
    fontFamily: {
      Poppins: string;
      Sora: string;
      Candal: string;
      Roboto: string;
      OpenSans: string;
    };
  }
}
