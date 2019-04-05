import * as React from "react";
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {testRequest} from "../actions/testRequestAction";

class TestRequestForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sendTestRequest = this.sendTestRequest.bind(this);
    this.inputParams = this.inputParams.bind(this);
    this.state = {params: ""}
  }

  sendTestRequest() {
    this.props.testRequestAction(this.state.params)
  }

  inputParams(e) {
    this.setState({params: e.currentTarget.value})
  }

  render() {
    const {test} = this.props;

    return (
      <div style={{paddingTop: 10, borderTop: "solid 1px #dfdfdf"}} hidden={this.props.hidden}>
        <div>
          <div className="row">
            <div className="col-2">
              <Button size={"sm"} outline={true} color={"danger"} onClick={this.sendTestRequest}>
                Send Test
              </Button>
            </div>
            <div className="col-10">
              <textarea className="form-control text-danger border-danger"
                        placeholder="method params"
                        rows={2}
                        value={test.params}
                        onChange={this.inputParams}/>
              <small className="text-secondary">use " if string param</small>
            </div>
          </div>
        </div>
        <div className="mr-top-bottom-10" hidden={!test.error}>
          <div className="bg-danger text-white">
            {test.error}
          </div>
        </div>
        <div>
          <pre style={{backgroundColor: "#dfdfdf"}}
               className="scroll-100vh-300"
               dangerouslySetInnerHTML={{__html: test.result}}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    test: store.test,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    testRequestAction: (params) => dispatch(testRequest(params)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(TestRequestForm);