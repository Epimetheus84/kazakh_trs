import { ImSpinner2 } from 'react-icons/im';

const Spinner = ({ fullScreen = false }) => (
  <div className={`spinner ${fullScreen ? 'spinner--fullscreen' : ''}`}>
    <ImSpinner2 className="spinner__icon" />
  </div>
);

export default Spinner;
