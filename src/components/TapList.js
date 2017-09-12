import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import Flavor from './Flavor'

class TapList extends Component {

  render() {

    if(this.props.onTapFlavorsQuery && this.props.onTapFlavorsQuery.loading) {
      return <div>Loading...</div>
    }

    if(this.props.onTapFlavorsQuery && this.props.onTapFlavorsQuery.error) {
      return <div>error{console.log(this.props.onTapFlavorsQuery.error)}</div>
    }

    const flavorsToRender = this.props.onTapFlavorsQuery.allFlavors;

    return (
      <div>
        {flavorsToRender.map(flavor => (
          <Flavor key={flavor.id} flavor={flavor} />
        ))}
      </div>
    )

  }

}

const ONTAP_FLAVORS_QUERY = gql`
  query onTapFlavorsQuery {
    allFlavors(filter: {
      onTap: true
    }) {
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

export default graphql(ONTAP_FLAVORS_QUERY, { name: 'onTapFlavorsQuery' }) (TapList)
