import {Meteor} from 'meteor/meteor';
import ReactDom from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from '../imports/routes/routes';
import app from './main.html';
import '../imports/startup/simple-schema-configuration.js';
import { Session } from 'meteor/session';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});



//stateless functional Component
//presentational Component, faster than ES6, dosen't support life cycle methods, easier to read/update
// import React from 'react';
// const MyComponent = (props) => {
//   return(
//     <div>
//       <h1>MyComponent is  here!{props.name}</h1>
//     </div>
//   )
// }

Meteor.startup(() => {
  //take 2 arguments JSX to render, location to render

  // Meteor.call('addNumbers',1,10 ,(err, res) => {
  //   console.log('Arguments sum',err,res);
  // });
  //Session.set('showVisible', true);
  ReactDom.render(routes, document.getElementById('app'));
});
