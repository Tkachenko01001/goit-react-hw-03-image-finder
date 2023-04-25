import { Component } from "react";
import PropTypes from "prop-types";

class LoadMore extends Component {

    static propTypes = {
        click: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
      }
    
    state = {
        page: 1,
    }

    onClickLoadMore = (e) => {
        this.setState(
          (prevState) => ({
            page: prevState.page + 1,
          }),
          () => {
            this.props.click(this.state.page);
          }
        );
      };
    

    render() {
        return <div className="block-button"><button className="button" onClick={this.onClickLoadMore}>Load more</button></div>
    }
}

export default LoadMore;