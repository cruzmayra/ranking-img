import React from 'react';
import './App.scss';

// Components
import Welcome from './Components/Welcome'
import Ranking from './Components/Ranking'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {'categoria':'loros', 'image': 'http://i68.tinypic.com/iwjddz.jpg'},
        {'categoria':'gatos', 'image':'http://i63.tinypic.com/2wpow9t.jpg'},
        {'categoria': 'perros', 'image': 'http://i65.tinypic.com/5eddvk.jpg' }
      ],
      name: '',
      next: false,
      positions: [1,2,3],
      ranking:{}
    }
  }

  componentDidMount () {
    this.calcHeight()

    window.addEventListener('resize', () => {
      this.calcHeight()
    })
  }

  calcHeight = () => {
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    document.querySelector('#root').style['min-height'] = height + 'px'
  }

  handleChange = (e) => {
    const {value, name} = e.target
    this.setState({ [name]: value})
  }

  handleClick = () => {
    this.setState({next: true})
  }

  toggleSelected = (e) => {
    e.stopPropagation()
    const elem = e.target
    elem.classList.toggle('selected')
    this.assignPosition(elem)
  }

  assignPosition = (elem) => {
    const selected = elem.classList.contains('selected')
    const categoria = elem.dataset.categoria
    const {positions,ranking} = this.state
    if(selected) {
      let position =  positions.shift()
      this.setState({
        ranking: {
          ...ranking,
          [categoria]: position
        },
        positions
      })
      this.styleWithPosition(elem,position)
    } else {
      let position = ranking[categoria]
      positions.push(position)
      positions.sort()
      delete ranking[categoria]
      this.setState({
        positions,
        ranking
      })
      this.styleWithPosition(elem,position)
    }
  }

  styleWithPosition = (elem,position) => {
    elem.classList.toggle('position-' + position)
  }

  sendData = () => {
    const {name, ranking} = this.state
    let string = ''

    for(const key in ranking) {
      string += key + '=' + ranking[key] + ','
    }

    console.log(string + 'name=' + name)

    // const url = process.env.REACT_APP_GOOGLE_URL
    // const search = this.props.location.search + '&name=' + name

    // this.sendToGoogle(url, search)
  }

  // sendToGoogle = (url, search) => {
  //   console.log(url, search)
  // }

  render() {
    const {next, name, positions, items} = this.state
    return (
      <div className="App">
        {
          next
          ? <Ranking
              items={items}
              positions={positions}
              sendData={this.sendData}
              toggleSelected={this.toggleSelected} />
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
