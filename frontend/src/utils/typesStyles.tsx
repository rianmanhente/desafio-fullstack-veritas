import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      light: string;
      gray: string;
      darkGray: string;
      darker: string;
      black: string;
    };
    background: {
      primary: string;
      secondary: string;
      modal: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: {
      default: string;
    };
    button: {
      primary: {
        background: string;
        color: string;
        hover: string;
      };
      secondary: {
        background: string;
        color: string;
        hover: string;
      };
    };
  }
}
