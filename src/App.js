import React, { Component } from 'react';
import './App.css';

const data = [
  {ItemName: "banana",NumberPounds: "2",PricePerPound:"0.50",ExpirationDate:"2014-11-06"},
  {ItemName: "kitkat",NumberPounds: "9",PricePerPound:"1.85",ExpirationDate:"2014-01-16"},
  {ItemName: "almond",NumberPounds: "5",PricePerPound:"7.55",ExpirationDate:"2014-10-03"},
  {ItemName: "curry",NumberPounds: "39",PricePerPound:"5.85",ExpirationDate:"2014-05-30"}
]

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: data,
      sortCol: null,
      sortDirection: null
   }
  }

  handleClickHeader (colName) {
    console.log('col name', colName);
    //if sort direction set then set it
    //if the sort col is the same as current then swap else asc
    var currSortDir = this.state.sortDirection === "asc" ? "desc" : "asc";
    
    this.setState({
      sortCol: colName,
      sortDirection: currSortDir
    })

  }

  render() {

    var tableHeaders = Object.keys(this.state.tableData[0]).map( (item, index) => {
      return <th key={index} onClick={this.handleClickHeader.bind(this,item)}>{item}</th>
    })

    var sortedData = this.state.tableData.sort( (a,b) => {
      


      if (a[this.state.sortCol]) {
        if (a[this.state.sortCol] === b[this.state.sortCol]) return 0;
        if (a[this.state.sortCol] < b[this.state.sortCol]) return -1;
        if (a[this.state.sortCol] > b[this.state.sortCol]) return 1;
      }

    });

    var tableData = sortedData.map(function (datum, index) {
      var row = [];
      for (var key in datum) {
        row.push(<td key={key}>{datum[key]}</td>)
      }
      return <tr key={index}>{row}</tr>;
    });

    return (
      <div>
        <h1>Sort Table</h1>

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
