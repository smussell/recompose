import React from 'react';
import curry from 'lodash/function/curry';
import pick from 'lodash/object/pick';
import wrapDisplayName from './wrapDisplayName';
import createElement from './createElement';

const lifecycle = (lifecycleMethods, BaseComponent) => (
  class Lifecycle extends React.Component {
    static displayName = wrapDisplayName(BaseComponent, 'lifecycle');

    constructor(props, context) {
      super(props, context);
      const whitelist = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUpdate', 'componentDidUpdate', 'componentDidUpdate'];
      Object.keys(pick(lifecycleMethods, whitelist)).forEach((k) => {
        this[k] = function() {
          const updates = lifecycleMethods[k].apply(this, arguments);
          if(typeof updates === 'object') this.setState(updates);
        }
      });
    }

    render() {
      return createElement(BaseComponent, {
        ...this.props,
        ...this.state
      });
    }
  }
);

export default curry(lifecycle);
