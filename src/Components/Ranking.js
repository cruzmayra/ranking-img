import React from 'react'

class Ranking extends React.Component {

  render() {
    const {items, stringToSheets, onDragStart, onDragOver, onDragEnd} = this.props
    return (
      <section id="categories">
        <p>¿Cuál de las siguientes opciones te gusta más?</p>
        <ul className="categoriesContainer">
          {
            items.map(function(item, idx) {
              return (
                <li key={item['categoria']} onDragOver={() => onDragOver(idx)}>
                  <div 
                    className='drag'
                    draggable
                    onDragStart={e => onDragStart(e, idx)}
                    onDragEnd={onDragEnd}>
                    {item['categoria']}
                    {/* <img src={item['image']} alt={item['categoria']} /> */}
                  </div>
                </li>
              )
            })
          }
        </ul>
        <button onClick={stringToSheets}>ENVIAR</button>
      </section>
    )
  }
}

export default Ranking 