import 'styled-components';

import { standardTheme } from './themes/standard.js';

type ThemeType = typeof standardTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
