import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class RelationList extends Component {
  constructor(props) {
    super(props);
    //listInfo包括了
    this.state = {
      listInfo: []
    };
  }
  render() {
    let listItem = this.state.listInfo.map((item, index) => {
      return <ListItem itemId={'rela-' + index} itemName={item} />;
    });
    return <div id="listItem">{listItem}</div>;
  }
}

const ListItem = ({ itemId }, { itemName }) => {
  return (
    <div id={itemId} className="item">
      {itemName}
    </div>
  );
};

export default RelationList;
