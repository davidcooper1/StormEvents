function EventData(...files) {
	this.fileList = files
	this.listeners = {
		"data" : function() {}
	}
}

EventData.prototype.init = function() {
	console.log("Started!")
	Promise.all(this.fileList.map(function(x) { return d3.csv(x) })).then(this.listeners.data)
}

EventData.prototype.on = function (type, f) {
	this.listeners[type] = f
}
