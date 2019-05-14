import React from 'react'

class Ranking extends React.Component {

  render() {
    const {positions,items, toggleSelected, sendData} = this.props
    return (
      <section id="categories">
        <div className="rankingContainer">
          <p>hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant</p>
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
          <button disabled={positions.length > 0} onClick={sendData}>ENVIAR</button>
        </div>
      </section>
    )
  }
}

export default Ranking 