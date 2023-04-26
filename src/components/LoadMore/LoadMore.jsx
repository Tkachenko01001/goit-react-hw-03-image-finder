import { Component } from "react";
import PropTypes from "prop-types";

class LoadMore extends Component {

    static propTypes = {
        page: PropTypes.number.isRequired,
      }

    onClickLoadMore = () => {
        this.setState(
          () => ({
            page: this.props.page + 1,
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