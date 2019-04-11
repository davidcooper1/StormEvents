class EventData {
	constructor(...files) {
		this.fileList = files;
		this.listeners = {
			"start" : function() {},
			"file" : function() {},
			"end" : function() {},
			"error" : function() {}
		};
	}

	init() {
		Promise.all(this.fileList.map(this._createPromise.bind(this)))
			.then(this.listeners.end)
			.catch(this.listeners.error);
	}

	_createPromise(fileName) {
		let start = this.listeners.start;
		let file = this.listeners.file;
		return new Promise(function(resolve, reject) {
			if (/^.*\.csv$/.test(fileName)) {
				start(fileName);
				d3.csv(fileName).then((data) => {
					file(fileName);
					resolve(data);
				}).catch((error) => { reject(error) });
			} else if (/^.*\.json$/.test(fileName)) {
				start(fileName);
				d3.json(fileName).then((data) => {
					file(fileName);
					resolve(data);
				}).catch((error) => { reject(error) });
			}
		});
	}

	on(type, f) {
		if (typeof f != "function")
			throw TypeError("Second argument should be a function.");
		this.listeners[type] = f
	}
}
