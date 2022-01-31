import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  English: {
    TAB: {
      "SETTING_TITLE": "Setting",
      "DAY_TITLE": "Day",
      "MONTH_TITLE": "Month",
      "YEAR_TITLE": "Year",
    },
    DAY: {
      "TOTAL": "Total: ",
      "ITEM": "Item",
      "ITEM_NAME": "Item Name",
      "ITEM_PRICE": "Item Price",
      "ADD_ITEM": "Add Item",
      "SAVE_EDIT_WARNING": "Save changes",
      "SAVE_EDIT_WARNING_MSG": "Are you sure to save changes?",
    },
    SETTING: {
      "COLOR": "Color",
      "LANGUAGE": "Language",
      "CLEAR_DATA_WARNING": "Clear Data",
      "CLEAR_DATA_WARNING_MSG": "Are you sure to clear all data?",
      "VALID_PRICE_WARNING_MSG": "Please enter a valid price",
      "BEYOND_RANGE_WARNING_MSG": "Total price is beyond max/min range",
    },
    UTILS: {
      "WARNING": "Warning",
      "CANCEL": "Cancel",
      "OK": "OK",
    },
  },
  Chinese: {
    TAB: {
      "SETTING_TITLE": "設定",
      "DAY_TITLE": "日",
      "MONTH_TITLE": "月",
      "YEAR_TITLE": "年",
    },
    DAY: {
      "TOTAL": "總額: ",
      "ITEM": "項目",
      "ITEM_NAME": "項目",
      "ITEM_PRICE": "價格",
      "ADD_ITEM": "新增項目",
      "VALID_PRICE_WARNING_MSG": "請輸入有效價格",
      "BEYOND_RANGE_WARNING_MSG": "總價超出最大/最小值",
      "SAVE_EDIT_WARNING": "保存更改",
      "SAVE_EDIT_WARNING_MSG": "您確定要保存更改嗎？",
    },
    SETTING: {
      "COLOR": "顏色",
      "LANGUAGE": "語言",
      "CLEAR_DATA_WARNING": "清除記錄",
      "CLEAR_DATA_WARNING_MSG": "你確定要清除所有記錄嗎？",
    },
    UTILS: {
      "WARNING": "警告",
      "CANCEL": "取消",
      "OK": "確認",
    },
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'English',
    lng: "English", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;