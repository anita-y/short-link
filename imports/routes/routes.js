import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Link from '../ui/link';
import Signup from '../ui/Signup';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

const history = createBrowserHistory();
const unauthenticatedPages = ['/','/singup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    history.replace('/links');
  }
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    history.replace('/');
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
    history.replace('/links');
  }else if(isAuthenticatedPage && !isAuthenticated){
    history.replace('/');
  }
};

export const routes = (
  <BrowserRouter>
  <Switch>
      <Route exact path="/"  component={Login} onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
      <Route path="*" component={NotFound} />
  </Switch>
  </BrowserRouter>
);
