import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type TextSize = "small" | "medium" | "large";
type FontFamily = "sans" | "serif" | "mono";

type PreferencesContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  textSize: TextSize;
  setTextSize: (textSize: TextSize) => void;
  fontFamily: FontFamily;
  setFontFamily: (fontFamily: FontFamily) => void;
};

const PreferencesContext =
  createContext<PreferencesContextValue | undefined>(undefined);

export function PreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    return localStorage.getItem("campusPilotTheme") === "dark"
      ? "dark"
      : "light";
  });

  const [textSize, setTextSize] = useState<TextSize>(() => {
    const savedTextSize = localStorage.getItem(
      "campusPilotTextSize",
    );

    if (
      savedTextSize === "small" ||
      savedTextSize === "large"
    ) {
      return savedTextSize;
    }

    return "medium";
  });

  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    const savedFontFamily = localStorage.getItem(
      "campusPilotFontFamily",
    );

    if (
      savedFontFamily === "serif" ||
      savedFontFamily === "mono"
    ) {
      return savedFontFamily;
    }

    return "sans";
  });

  useEffect(() => {
    localStorage.setItem("campusPilotTheme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("campusPilotTextSize", textSize);
    document.documentElement.dataset.textSize = textSize;
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem("campusPilotFontFamily", fontFamily);
    document.documentElement.dataset.fontFamily = fontFamily;
  }, [fontFamily]);

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        setTheme,
        textSize,
        setTextSize,
        fontFamily,
        setFontFamily,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const preferences = useContext(PreferencesContext);

  if (!preferences) {
    throw new Error(
      "usePreferences must be used inside PreferencesProvider.",
    );
  }

  return preferences;
}