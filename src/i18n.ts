import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LocaleConfig } from 'react-native-calendars'; // Імпортуємо конфіг календаря

import en from "./locales/en.json";
import uk from "./locales/uk.json";

LocaleConfig.locales['uk'] = {
  monthNames: ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
  monthNamesShort: ['Січ.','Лют.','Бер.','Квіт.','Трав.','Черв.','Лип.','Серп.','Вер.','Жовт.','Лист.','Груд.'],
  dayNames: ['Неділя','Понеділок','Вівторок','Середа','Четвер','П\'ятниця','Субота'],
  dayNamesShort: ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
  today: "Сьогодні"
};

LocaleConfig.locales['en'] = LocaleConfig.locales['']; 
LocaleConfig.defaultLocale = 'en';

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  LocaleConfig.defaultLocale = lng;
});

export default i18n;