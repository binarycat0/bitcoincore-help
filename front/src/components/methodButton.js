import {Button} from "reactstrap";
import React from "react";
import {connect} from "react-redux";
import {getMethodHelp} from "../actions/methodHelpAction";

class MethodButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getMethodHelp = this.getMethodHelp.bind(this);
  }

  getMethodHelp(e) {
    this.props.getMethodHelpAction(this.props.name);
  }

  render() {
    return (
      <Button id={'btn_' + this.props.name}
              className="list-group-item list-group-item-action"
              onClick={this.getMethodHelp}
              title={this.props.description}>
        <code>{this.props.name}</code> {" "}
        {
          this.props.description && this.props.description.toLowerCase().includes('deprecated') ?
            <span className="badge badge-pill badge-warning">deprecated</span>
            : null
        }
      </Button>
    )
  }
}

const mapStateToProps = store => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    getMethodHelpAction: (name) => dispatch(getMethodHelp(name)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MethodButton);
