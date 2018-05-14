import React from 'react';
import PropTypes from 'prop-types';

import './modal.module.scss';
class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    // Render nothing if the "show" prop is false

    return (
      <div className="modal_backdrop">
        <div className="user_modal">
          {this.props.children}

          <div className={"footer"}>
            <div onClick={this.props.onClose} className={"close"}>
              <p className={"cross"}>X</p>
            </div>
          </div>
        </div>
        hej
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;
