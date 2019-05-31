import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilter extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        showVisible: true
      };
  }

  componentDidMount() {
    console.log('componentDidMount linksListFilter');
    this.linksFilterTracker = Tracker.autorun(() => {
      this.setState({ showVisible : Session.get('showVisible')})  ;
    });
  }
  componentWillUnount(){
    console.log('componentWillUnount linksListFilter');
    this.linksFilterTracker.stop();
  }

  render() {
    return(
      <div>
        <label className="checkbox">
          <input className="checkbox__box"
              type="checkbox"
              checked= {this.state.showVisible}
              onChange={(e) => {
              const checkValue = e.target.checked;
              Session.set('showVisible', checkValue);
          }}/>
          show hidden links
        </label>
      </div>

    );
  }
}
