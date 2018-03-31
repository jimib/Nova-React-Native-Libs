export function init( options ){
	options = options || {};

	// instructions for this set up can be found here https://medium.com/the-react-native-log/a-guide-to-react-native-with-redux-and-immutable-js-65a2b795cb6f
	import { createStore, applyMiddleware, compose } from 'redux';
	import { AsyncStorage } from 'react-native';
	import { autoRehydrate, persistStore } from 'redux-persist-immutable';
	import createActionBuffer from 'redux-action-buffer';
	import { REHYRDRATE } from 'redux-persist/constants';
	import { createLogger } from 'redux-logger';
	import ReduxThunk from 'redux-thunk';
	import { Map } from 'immutable';

	const enhancers = [autoRehydrate()];

	// Transform our immutable state object to js for logging purposes
	const logger = createLogger({
		stateTransformer(state) {
			return state.toJS();
		}
	});

	const middleWares = [ReduxThunk, createActionBuffer(REHYRDRATE)];

	// only want logger middleware for dev environemnt
	if (process.env.NODE_ENV === 'development') {
		middleWares.push(logger);
	}

	const composedEnhancers = compose(applyMiddleware(...middleWares), ...enhancers);

	const store = createStore( options.reducers, Map(), applyMiddleware(ReduxThunk));

	// initialize redux-persist-immutable
	persistStore(store, { storage: AsyncStorage });
	
	return store;
}