import React, { Component } from 'react';
import './App.css';

const data = [
  {ItemName: "banana",NumberPounds: "2",PricePerPound:"0.50",ExpirationDate:"2014-11-06"},
  {ItemName: "kitkat",NumberPounds: "9",PricePerPound:"1.85",ExpirationDate:"2014-01-16"},
  {ItemName: "almond",NumberPounds: "51",PricePerPound:"7.55",ExpirationDate:"2014-10-03"},
  {ItemName: "curry",NumberPounds: "39",PricePerPound:"53.85",ExpirationDate:"2014-05-30"}
]

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: data,
      sortCol: "ItemName",
      sortDirection: "asc",
      sortArrows: {},
      filterText: ""
   }
  }

  componentWillMount() {
    var fields = Object.keys(this.state.tableData[0]);
    var initalArrows = {};
    for (var i = 0; i < fields.length; i++) {
      initalArrows[fields[i]] = "\\/";
    }

    this.setState({
      sortArrows: initalArrows
    });
  }

  handleClickHeader (colName) {
    //if sort direction set then set it
    //if the sort col is the same as current then swap else asc
    var currSortDir = this.state.sortDirection === "asc" ? "desc" : "asc";

    var arrowDir = Object.assign({}, this.state.sortArrows);
    arrowDir[colName] = arrowDir[colName] === "\\/" ? "/\\" : "\\/";
    
    this.setState({
      sortCol: colName,
      sortDirection: currSortDir,
      sortArrows: arrowDir
    })

  }

  handleType (e) {
    var inputTextNew = e.target.value;

    this.setState({
      filterText: inputTextNew
    });

  }

  sortAndFilterData () {

    var data = this.state.tableData.filter( (row) => {
      return JSON.stringify(row).toLowerCase().match(this.state.filterText.toLowerCase());
    });

    data.sort( (a,b) => {
      if (a[this.state.sortCol]) {
        if ( !isNaN(parseFloat(a[this.state.sortCol])) && !a[this.state.sortCol].match(/-/gi) ) {
          console.log('number sort');
          if (this.state.sortDirection === "asc") return parseFloat(a[this.state.sortCol]) - parseFloat(b[this.state.sortCol]);
          if (this.state.sortDirection === "desc") return parseFloat(b[this.state.sortCol]) - parseFloat(a[this.state.sortCol]);
        } else if ( !isNaN(Date.parse(a[this.state.sortCol])) ) {
          if (this.state.sortDirection === "asc") return Date.parse(a[this.state.sortCol]) - Date.parse(b[this.state.sortCol]);
          if (this.state.sortDirection === "desc") return Date.parse(b[this.state.sortCol]) - Date.parse(a[this.state.sortCol]);
        } else {
          if (a[this.state.sortCol] === b[this.state.sortCol]) return 0;
          if (this.state.sortDirection === "asc") {
            if (a[this.state.sortCol] < b[this.state.sortCol]) return -1;
            if (a[this.state.sortCol] > b[this.state.sortCol]) return 1;
          } else {
            if (a[this.state.sortCol] > b[this.state.sortCol]) return -1;
            if (a[this.state.sortCol] < b[this.state.sortCol]) return 1;
          }
        }
      }
    });

    return data;
  }

  render() {

    var tableHeaders = Object.keys(this.state.tableData[0]).map( (item, index) => {
      return <th key={index} onClick={this.handleClickHeader.bind(this,item)}>{item}<span>{this.state.sortArrows[item]}</span></th>
    })

    var tableData = this.sortAndFilterData().map( (datum, index) => {
      var row = [];
      for (var key in datum) {
        row.push(<td key={key}>{datum[key]}</td>)
      }
      return <tr key={index}>{row}</tr>;
    });

    return (
      <div>
        <h1>Sort Table</h1>

        <input 
          type="text" 
          onKeyUp={this.handleType.bind(this)}
        />
        
        <div style={{height:"35px"}}></div>

        <table>
          <thead>
            <tr>
              {tableHeaders}
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>

      </div>
    );
  }
}

export default App;
