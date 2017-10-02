import React, { Component } from 'react'
import Flavor from './Flavor'

class FlavorList extends Component {
  
  createFlavor(props) {
    props.createFlavorMutation({
      variables: {
        name: 'New Flavor',
        special: false,
        backgroundColor: 'pink',
        onTap: false
      }
    })
  }

  render() {

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.loading) {
      return <div>Loading...</div>
    }

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.error) {
      return <div>Error</div>
    }

    const flavorsToRender = this.props.allFlavorsQuery.allFlavors;

    return (
      <div className="flavorList">
        <h2 className="flavorList__title">Edit Flavors</h2>
        <div onClick={() => this.createFlavor(this.props)} className="addFlavor b--white-90 b--dashed">&#43; Add Flavor</div>
        {flavorsToRender.map(flavor => (
          <Flavor key={flavor.id} flavor={flavor} />
        ))}
      </div>
    )
  }

}

export default FlavorList
