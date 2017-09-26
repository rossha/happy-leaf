import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
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
          <TapFlavor key={flavor.id} flavor={flavor} />
        ))}
      </div>
    )

  }

}

const ALL_FLAVORS_QUERY = gql`
  query allFlavorsQuery {
    allFlavors {
      id
      createdAt
      name
      special
      description
      backgroundColor
      icon
      onTap
    }
  }
`

export default graphql(ALL_FLAVORS_QUERY, { name: 'allFlavorsQuery' }) (TapList)
