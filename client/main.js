import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

getEnv = new ReactiveVar('teste');

Template.body.onRendered(function bodyOnRendered() {
  console.log(process.env);

  Meteor.call('getEnv', (err, res)=> {
    if (err) {
      console.log(err);
    }
    else {
      getEnv.set(res);
      console.log(getEnv.get());
    }
  });
});

Template.body.helpers({
  getEnv() {
    return getEnv.get();
  }
});

Template.body.events({
});
