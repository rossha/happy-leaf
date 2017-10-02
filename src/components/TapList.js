import React, { Component } from 'react'
import TapFlavor from './TapFlavor'

class TapList extends Component {

  render() {

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.loading) {
      return <div>Loading...</div>
    }

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.error) {
      return <div>error{console.log(this.props.allFlavorsQuery.error)}</div>
    }

    const flavorsToRender = this.props.allFlavorsQuery.allFlavors;

    return (
      <div className="tapList">
        <h2 className="tapList__title">What's On Tap</h2>
        {flavorsToRender.map(flavor => flavor.onTap && (
          <TapFlavor path={this.props.path} key={flavor.id} flavor={flavor} />
        ))}
      </div>
    )

  }

}

export default TapList
