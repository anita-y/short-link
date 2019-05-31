import React from 'react';
import PropTypes from 'prop-types';
import Clipboard  from 'clipboard';
import Links from '../api/links';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinkListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  componentDidMount(){
      this.clipboard = new Clipboard(this.refs.copy);
      this.clipboard.on('success', () => {
          this.setState({copied:true});
          setTimeout(() => this.setState({copied: false}),1000);
      }).on('error', () =>{
          alert('Unable to copy');
      })
  }

  componentWillUnount() {
    this.clipboard.destory();
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if(typeof this.props.lastVisitedAt === 'number'){
      visitedMessage = `(visted ${ moment(this.props.lastVisitedAt).fromNow()})`
    }
      return <p className="item__message">{this.props.visitedCount} {visitMessage} - {visitedMessage}</p>
  }

  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
          visit
        </a>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
        {this.state.copied ? 'copied' : 'copy'}
        </button>
        <button className="button button--pill" onClick={() =>{
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
            {this.props.visible ? 'Hide' : 'Unhide' }
        </button>
      </div>
    )
  }
};

LinkListItems.propTypes = {
  _id           :  PropTypes.string.isRequired,
  url           :  PropTypes.string.isRequired,
  userId        :  PropTypes.string.isRequired,
  shortUrl      :  PropTypes.string.isRequired,
  visible       :  PropTypes.bool.isRequired,
  visitedCount  :  PropTypes.number.isRequired,
  lastVisitedAt :  PropTypes.number
}
