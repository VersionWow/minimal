/** @type {import('stylelint').Config} */

import { propertyGroups } from "stylelint-config-clean-order";

const customPropertiesOrder = {
  noEmptyLineBefore: true,
  emptyLineBefore: "never",
  properties: ["syntax", "inherits", "initial-value"],
};

const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBefore: true,
  emptyLineBefore: "never",
  properties,
}));

propertiesOrder.unshift(customPropertiesOrder);

export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-clean-order"],
  ignoreFiles: ["node_modules", "dist/**/*"],

  rules: {
    "order/properties-order": [
      propertiesOrder,
      {
        severity: "warning",
        unspecified: "bottomAlphabetical",
      },
    ],
    "selector-class-pattern": [
      "^[a-z]+(-[a-z0-9]+)*(__[a-z0-9]+)?(--[a-z0-9]+)?$",
      {
        resolveNestedSelectors: true,
        message:
          "Class selectors: Follow BEM and Client-First naming conventions",
      },
    ],
  },
};
