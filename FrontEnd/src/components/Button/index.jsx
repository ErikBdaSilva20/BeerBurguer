import { ButtonComponent } from './styles.js';

import PropTypes from 'prop-types';
export function Button({ children, ...props }) {
  return <ButtonComponent {...props}>{children}</ButtonComponent>;
}

Button.propTypes = {
  children: PropTypes.string,
};
