import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinksListItems from './LinkListItems';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount linksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links});
    });
  }
  componentWillUnount(){
    console.log('componentWillUnount linksList');
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if(!this.state.links.length){
      return (
          <div className="item">
            <p className="item__status-message">No Links Found</p>
          </div>
      )
    }
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItems key={link._id} shortUrl={shortUrl} {...link}/>

    });
  }

  render() {
    return(
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    )
  }
}
