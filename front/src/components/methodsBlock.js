import {Button, Collapse} from "reactstrap";
import React from "react";
import MethodButton from './methodButton';

export default class MethodsBlock extends React.PureComponent {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false, tooltipOpen: false};
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <li className="list-group-item">
        <Button color={"link"} onClick={this.toggle}><strong>{this.props.name}</strong></Button>
        <Collapse isOpen={this.state.collapse}>
          <ul className="list-group" id={'_' + this.props.name}>
            {
              this.props.methods.map((method, ii) => {
                return <MethodButton key={'__' + ii} name={method.name} description={method.description}/>
              })
            }
          </ul>
        </Collapse>
      </li>
    )
  }
}