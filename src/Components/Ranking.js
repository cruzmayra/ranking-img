import React from 'react'

class Ranking extends React.Component {

  render() {
    const {positions,items, toggleSelected, sendData} = this.props
    return (
      <section id="categories">
        <div className="rankingContainer">
          <p className="indications">Lorem ipsum dolor amet bespoke street art subway tile, YOLO banjo vexillologist cardigan vape air plant twee pinterest butcher.</p>
          <div className="categoriesContainer">
          {
            items.map(function(item) {
              return (
                <div
                  className='categoria'
                  key={item['categoria']}
                  onClick={toggleSelected}
                  style={{backgroundImage: 'url(' + item['image'] +')'}}>
                  <div
                    className="rank"
                    data-categoria={item['categoria']}>
                  </div>
                </div>
              )
            })
          }
          </div>
          <button className="btn" disabled={positions.length > 0} onClick={sendData}>ENVIAR</button>
        </div>
      </section>
    )
  }
}

export default Ranking 