import React from 'react';
import './App.css';

// Components
import Welcome from './Components/Welcome'
import Ranking from './Components/Ranking'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {'categoria':'gatos', 'image':'http://i63.tinypic.com/2zqzyv6.jpg'},
        {'categoria': 'perros', 'image': 'http://i65.tinypic.com/23r3c61.jpg' },
        {'categoria':'loros', 'image': 'http://i68.tinypic.com/2mqti5z.jpg'}
      ],
      name: '',
      next: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.stringToSheets = this.stringToSheets.bind(this)
  }

  handleChange(e) {
    const {value, name} = e.target
    this.setState({ [name]: value})
  }

  handleClick() {
    this.setState({next: true})
  }

  onDragStart = e => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }


  onDragOver = index => {
    const draggedOverItem = this.state.items[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    // this.setState({ items });
    // console.log(items)
  };

  onDragEnd = () => {
    this.draggedIdx = null;
};

  stringToSheets() {
    const {name, ranking} = this.state
    let string = ''
   
    for(const key in ranking) {
      string += key + '=' + ranking[key] + ', '
    }

    console.log(string + 'name=' + name)
  }

  render() {
    const {next, name, items} = this.state
    return (
      <div className="App">
        {
          next
          ? <Ranking
              items={items}
              onDragStart={this.onDragStart}
              onDragOver={this.onDragOver}
              onDragEnd={this.onDragEnd}/>
          : <Welcome
              name={name}
              handleChange={this.handleChange}
              handleClick={this.handleClick} />
        }
      </div>
    )
  }
}

export default App;
