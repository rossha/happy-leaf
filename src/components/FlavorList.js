import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import Flavor from './Flavor'

class FlavorList extends Component {

  render() {

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.loading) {
      return <div>Loading...</div>
    }

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.error) {
      return <div>Error</div>
    }

    const flavorsToRender = this.props.allFlavorsQuery.allFlavors;

    return (
      <div>
        {flavorsToRender.map(flavor => (
          <Flavor key={flavor.id} flavor={flavor} />
        ))}
      </div>
    )

  }

}

const ALL_FLAVORS_QUERY = gql`
  query AllFlavorsQuery {
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

export default graphql(ALL_FLAVORS_QUERY, { name: 'allFlavorsQuery' }) (FlavorList)
