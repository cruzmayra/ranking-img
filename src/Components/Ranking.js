import React from 'react'

class Ranking extends React.Component {

  render() {
    const {positions,items, toggleSelected, stringToSheets} = this.props
    return (
      <section id="categories">
        <p>¿Cuál de las siguientes opciones te gusta más?</p>
        <div className="categoriesContainer">
        {
          items.map(function(item) {
            return (
              <div
                className='categoria'
                data-categoria={item['categoria']}
                key={item['categoria']}
                onClick={toggleSelected}
                style={{backgroundImage: 'url(' + item['image'] +')'}}>
              </div>
            )
          })
        }
        </div>
        <button disabled={positions.length > 0} onClick={stringToSheets}>ENVIAR</button>
      </section>
    )
  }
}

export default Ranking 