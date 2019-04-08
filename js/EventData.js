class EventData {
	constructor(...files) {
		this.fileList = files;
		this.listeners = {
			"data" : function() {}
		};
	}

	init() {
		Promise.all(this.fileList.map(
			function(x) {
				if (/^.*\.csv$/.test(x))
					return d3.csv(x);
				else if (/^.*\.json$/.test(x))
					return d3.json(x);
			}
		)).then(this.listeners.data)
	}

	on(type, f) {
		this.listeners[type] = f
	}
}
