import React, {PureComponent} from 'react';
import './App.css';
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {checkHelp} from "../actions/helpAction";
import MethodsBlock from "./methodsBlock";
import TestRequestForm from "./testRequestForm";

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.checkHelp = this.checkHelp.bind(this);
  }

  checkHelp(e) {
    this.props.checkHelpAction();
  }

  loadBlocks() {
    if (this.props.help && this.props.help.blocks) {
      return this.props.help.blocks.map((block, i) => {
        return <MethodsBlock key={'_' + i} name={block.name} methods={block.methods}/>
      })
    }

    return [];
  }

  componentDidMount() {
    this.checkHelp();
  }

  render() {

    const {help, method} = this.props;

    return (
      <div className="container-fluid">
        {/**/}
        <div className="mr-top-bottom-10">
          <Button size={"sm"} outline={true} color="primary" onClick={this.checkHelp}
                  disabled={help.isFetching}>
            Check Server Help
          </Button>
          <div className="spinner-border text-primary float-right" style={{width: 25, height: 25}} role="status"
               hidden={!help.isFetching}>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="bg-danger text-white mr-top-bottom-10" hidden={!help.error}>
          {help.error}
        </div>
        {/**/}
        <div className="row">
          <div className="col-4" style={{borderRight: "solid 1px #dfdfdf"}}>
            <ul className="list-group list-group-flush scroll-100vh-50 text-primary" hidden={!help.blocks.length}>
              {this.loadBlocks()}
            </ul>
          </div>
          <div className="col-8">
            <div className="bg-danger text-white" hidden={!method.error}>{method.error}</div>
            <h2 className="text-primary">{method.name}</h2>
            <h3 className="text-secondary">{method.description}</h3>
            <pre style={{backgroundColor: "#dfdfdf"}}
                 className="scroll-100vh-300"
                 dangerouslySetInnerHTML={{__html: method.result}} hidden={!method.name}/>

            <TestRequestForm hidden={!method.name}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    help: store.help,
    method: store.method,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkHelpAction: () => dispatch(checkHelp()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
