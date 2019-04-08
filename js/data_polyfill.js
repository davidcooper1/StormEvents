String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Date.prototype.getMonthName = function() {
    var names = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return names[this.getMonth()];
};

Date.prototype.getMonthAbbrev = function() {
    return this.getMonthName().slice(0,3);
}
