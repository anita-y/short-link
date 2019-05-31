import { Meteor } from 'meteor/meteor';
import {  WebApp} from 'meteor/webapp' /* attach middleware */
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';
import moment from 'moment';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});
    if(link){
      //res.statusCode = 200;
      res.writeHead(200, {"Content-Type": "text/css"})
      res.setHeader('Location', link.url);
      res.setContent
      res.end();
      Meteor.call('link.trackVisit', _id);
    }else{
      next();
    }

  });

});
