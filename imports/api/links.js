import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');
//only available on server
if (Meteor.isServer) {
    Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId});
    });
}

Meteor.methods({
    'links.insert'(url){
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      new SimpleSchema({
        url: {
            type: String,
            label: 'Your link',
            regEx: SimpleSchema.RegEx.Url
          }
      }).validate({ url })


      Links.insert({
       _id: shortid.generate(),
        url,
        userId: this.userId,
        visible: true,
        visitCount: 0,
        lastVisitedAt: null
      });
    },

    'links.setVisibility'(_id, visible){
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      new SimpleSchema({
        _id: {
            type: String,
            min: 1
          },
        visible : {
          type: Boolean
        }
      }).validate({ _id })


      Links.update({
        _id: _id,
         userId: this.userId},
        {
          $set: {  visible: visible }
        });
    },

    'link.trackVisit'(_id){
      new SimpleSchema({
        _id: {
            type: String,
            min: 1
          }
      }).validate({ _id })


      Links.update({_id},
        {
          $set: {
              lastVisitedAt: new Date().getTime()
            },
            $inc: {
              visitedCount: 1
            }
        });
    }
});




//
// Meteor.methods({
//   addNumbers(n1, n2){
//     console.log('number:',n1,n2);
//     if(typeof(n1) === 'number' && typeof(n2) === 'number'){
//       return n1+n2;
//     }else{
//         throw new Meteor.Error('invalid argument','Numbers are required')
//     }
//   }
// })
