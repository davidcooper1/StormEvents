class DataFilter {
  constructor(data) {
    this.data = data;
    this.filteredData = data;
  }

  listEventTypes() {
    let types = [];
    for (let i = 0; i < this.data.length; i++) {
      let type = this.data[i].EVENT_TYPE;
      if (types.indexOf(type) == -1)
        types[types.length] = type;
    }
    return types.sort();
  }

  filterEvents(typeFilter, words) {
    typeFilter = new RegExp(typeFilter.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
    let newData = [];

    for (let i = 0; i < this.filteredData.length; i++) {
      if (!typeFilter.test(this.filteredData[i].EVENT_TYPE))
        continue;

      if (!words) {
        newData[newData.length] = this.filteredData[i];
        continue;
      }

      let description = this.filteredData[i].EVENT_NARRATIVE.split(" ");

      description.forEach(function(entry, index) {
        let match = /[a-zA-Z]+/.exec(this[index]);
        if (match != null) {
          this[index] = match[0].toLowerCase();
        } else {
          this[index] = null;
        }
      }, description);

      description.filter(function(entry) {
        return entry != null;
      })

      let shouldAdd = true;
      for (let j = 0; j < words.length; j++) {
        if (description.indexOf(words[j]) == -1) {
          shouldAdd = false;
          break;
        }
      }

      if (shouldAdd) {
        newData[newData.length] = this.filteredData[i];
      }
    }

    this.filteredData = newData;
  }

  reset() {
    this.filteredData = this.data;
  }

  get heatMap() {
    let heatData = [];
    for (let i = 0; i < this.filteredData.length; i++) {
      let stateFips = this.filteredData[i].STATE_FIPS;
      let czFips = this.filteredData[i].CZ_FIPS;

      if (heatData[stateFips]) {
        if (heatData[stateFips][czFips] == undefined)
          heatData[stateFips][czFips] = 1;
        else
          heatData[stateFips][czFips]++;
      } else {
        heatData[stateFips] = [];
        heatData[stateFips][czFips] = 1;
      }
    }
    return heatData;
  }

}
