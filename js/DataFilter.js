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

  filterEvents(typeFilter) {
    typeFilter = new RegExp(typeFilter);
    this.filteredData = [];

    for (let i = 0; i < this.data.length; i++) {
      if (typeFilter.test(this.data[i].EVENT_TYPE))
        this.filteredData[this.filteredData.length] = this.data[i];
    }
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
