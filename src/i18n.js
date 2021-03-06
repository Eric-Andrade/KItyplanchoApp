'use strict'
import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.translations = {
  'es': require('./translations/es'),
  'en': require('./translations/en'),
  'fr': require('./translations/fr')
};

export default I18n;