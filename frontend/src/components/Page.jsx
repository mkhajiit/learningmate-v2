import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Page({ children }) {
  return <Container>{children}</Container>;
}

Page.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Page;
