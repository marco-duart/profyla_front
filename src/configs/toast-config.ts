import { config } from "../theme/stitches";

const { colors, fontSizes, fontWeights, shadows, radii } = config.theme;

export const toastConfig = {
  position: "top-center" as const,
  className: "payment-gateway-toast",
  duration: 5000,

  style: {
    background: colors.canvasAlt,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.md,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    padding: "14px 22px",
    boxShadow: shadows.medium,
    minWidth: "320px",
    maxWidth: "480px",
    minHeight: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1.4,
  },

  success: {
    iconTheme: {
      primary: colors.success,
      secondary: colors.text,
    },
    style: {
      background: `${colors.successSubtle}`,
      border: `1px solid ${colors.success}`,
      color: colors.success,
    },
  },

  error: {
    iconTheme: {
      primary: colors.error,
      secondary: colors.text,
    },
    style: {
      background: `${colors.errorSubtle}`,
      border: `1px solid ${colors.error}`,
      color: colors.error,
    },
  },

  warning: {
    iconTheme: {
      primary: colors.warningDark,
      secondary: colors.text,
    },
    style: {
      background: `${colors.warningSubtle}`,
      border: `1px solid ${colors.warningDark}`,
      color: colors.warningDark,
    },
  },

  loading: {
    iconTheme: {
      primary: colors.brand,
      secondary: colors.text,
    },
    style: {
      background: colors.brandSoft,
      border: `1px solid ${colors.brand}`,
      color: colors.brandStrong,
    },
  },
};
