import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import MenuIconHome from 'material-ui/svg-icons/action/home';
import MenuIconSignin from 'material-ui/svg-icons/social/person';


class FloatBtn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = (event) => {
    //event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = (event) => {
    //event.preventDefault();
    this.setState({open: false});
  }

  render() {
    return (
    <div>
    <FloatingActionButton 
      className="float_btn_big"
      onClick={this.handleToggle}
    >
    <ContentAdd />
    </FloatingActionButton>
    <Popover
    className="popover"
    open={this.state.open}
    anchorEl={this.state.anchorEl}
    anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
    targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
    onRequestClose={this.handleClose}
    animation={PopoverAnimationVertical}
    >
    <Menu className="float_btn_menu">
    <FloatingActionButton
      className="float_btn_small"
      mini={true}
      href='/'
    >
    <MenuIconHome />
    </FloatingActionButton>
    <FloatingActionButton
      className="float_btn_small"
      mini={true}
      href='/profile'
    >
    <MenuIconSignin/>
    </FloatingActionButton>
    </Menu>
    </Popover>
    </div>
    );
  };
}

export default FloatBtn;
