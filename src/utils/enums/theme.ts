export enum Theme {
  RELAXATION = "RELAXATION",
  SPORT = "SPORT",
  ROMANCE = "ROMANCE",
  DISCOVERY = "DISCOVERY",
  FAMILY = "FAMILY",
  LOW_COST = "LOW_COST",
  UNUSUAL = "UNUSUAL"
}

export interface ThemeType {
  value: string;
  label: string;
  imageSource: string;
}

export const THEMES = [
  {
    value: Theme.RELAXATION,
    label: "common.themes.relaxation",
    imageSource: "/img/themes/relaxation.svg"
  },
  {
    value: Theme.SPORT,
    label: "common.themes.sport",
    imageSource: "/img/themes/sport.svg"
  },
  {
    value: Theme.ROMANCE,
    label: "common.themes.romance",
    imageSource: "/img/themes/romance.svg"
  },
  {
    value: Theme.DISCOVERY,
    label: "common.themes.discovery",
    imageSource: "/img/themes/discovery.svg"
  },
  {
    value: Theme.FAMILY,
    label: "common.themes.family",
    imageSource: "/img/themes/family.svg"
  },
  {
    value: Theme.LOW_COST,
    label: "common.themes.lowCost",
    imageSource: "/img/themes/lowCost.svg"
  },
  {
    value: Theme.UNUSUAL,
    label: "common.themes.unusual",
    imageSource: "/img/themes/unusual.svg"
  },
] as ThemeType[];
