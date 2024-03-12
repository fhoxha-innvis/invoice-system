import './src/styles/global.css'
import Modal from 'react-modal';

export const onClientEntry = () => {
  Modal.setAppElement('body');
};