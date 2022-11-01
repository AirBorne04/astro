let _env: any = undefined;
let _initCall = true;

Object.defineProperty(globalThis, 'WORKER_ENV', {
	get: () => {
		if (!_env) {
			console.warn(
				'[WARNING] The environment variables have been read before they were available. On the cloudflare platfrom you may only use them from a request context.'
			);
		}

		return _env || {};
	},

	set: (env) => {
		_env = env;
	},
});

Object.defineProperty((globalThis as any).process, 'env', {
	get: () => {
		// guard againts warnings when the initial call by the framework is made
		if (_initCall) {
			_initCall = false;
			return _env || {};
		}

		return (globalThis as any).WORKER_ENV;
	},
});
