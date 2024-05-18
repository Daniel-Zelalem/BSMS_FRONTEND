/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./app/**/*.{js,jsx}",
  "./src/**/*.{js,jsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    transitionProperty: {
      height: "height",
    },
    aspectRatio: {
      "4/3": "5 / 3",
      "5/3": "4 / 3",
    },
    colors: {
      brightRed: "hsl(15, 88%, 59%)",
      veryBrightRed: "hsl(11, 88%, 60%)",
      brightRedLight: "hsl(12, 88%, 69%)",
      brightRedSupLight: "hsl(12, 88%, 95%)",
      darkBlue: "hsl(228, 39%, 23%)",
      darkGrayishBlue: "hsl(227, 12%, 61%)",
      veryDarkBlue: "hsl(233, 12%, 13%)",
      veryPaleRed: "hsl(13, 100%, 96%)",
      veryLightGray: "hsl(0, 0%, 98%)",
      blue: "#345ccc",
      lightBlue: "#4471eb",
      green: "rgb(0, 167, 111)",
      Green: "#86efac",
      LGreen: "##bbf7d0",
      lightGreen: "rgb(10, 221, 183)",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },

      // for chat only
      "blue-1": "#0A065C",
      "blue-2": "#F5F7FB",
      "blue-3": "#04A1E3",
      "grey-1": "#737373",
      "grey-2": "#f0f0f0",
      "grey-3": "#8B8B8B",
      "red-1": "#FF5252",
      "purple-1": "#C6D4FF",
      "purple-2": "#4D426D",
      "green-1": "#13E0E0",
      "pink-1": "#FDDAD6",
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    gridTemplateColumns: {
      custom: "14.0rem, 1fr",
    },
    gridTemplateRows: {
      custom: "auto, 1fr",
    },
    gridRow: {
      custom: "1 / -1",
    },
  },
};
export const plugins = [
  require("tailwindcss-animate"),
  require("@tailwindcss/forms"),
];
