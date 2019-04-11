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
    let commonWords = [];

    for (let i = 0; i < this.filteredData.length; i++) {
      if (!typeFilter.test(this.filteredData[i].EVENT_TYPE))
        continue;

      let description = this.filteredData[i].EVENT_NARRATIVE.split(" ");

      description.forEach(function(entry, index) {
        let match = /[a-zA-Z]+/.exec(this[index]);
        if (match != null) {
          this[index] = match[0].toLowerCase();
        } else {
          this[index] = null;
        }
      }, description);

      description = description.filter(function(entry) {
        return entry != null;
      })

      let shouldAdd = true;
      if (words) {
        let copy = words.slice();
        for (let j = 0; j < description.length; j++) {
          if (words.length == 0)
            break;
          let index;
          if ((index = words.indexOf(description[i])) != -1) {
            words.splice(index, 1);
          }
        }
        if (words.length == 0) {
          shouldAdd = true;
        }
      }

      if (shouldAdd) {
        description.forEach(function(entry) {
          let index = -1;
          if ((index = commonWords.findIndex(function(word) {
            return word.text == entry;
          })) != -1) {
            commonWords[index].size++;
          } else {
            commonWords[commonWords.length] = {
              "text" : entry,
              "size" : 1
            };
          }
        });
        newData[newData.length] = this.filteredData[i];
      }
    }

    this.filteredData = newData;

    return commonWords.sort(function(a,b) {
      return b.size - a.size;
    });
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
