import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import { PREMADE_FLAVORS } from '../flavors'

class LoadData extends Component {

  render() {
    return (
      <button
        onClick={() => this._loadData(this.props)} >
        Submit
      </button>
    )
  }

  _loadData = function(props) {
    Object.keys(PREMADE_FLAVORS).forEach(function(i) {
      const { name, description, special, backgroundColor, icon, onTap } = PREMADE_FLAVORS[i]
      props.createFlavorMutation({
        variables: {
          name,
          description,
          special,
          backgroundColor,
          icon,
          onTap
        }
      })
    })
  }

}

const CREATE_FLAVOR_MUTATION = gql`
  mutation CreateFlavorMutation($name: String!, $description: String, $special: Boolean $backgroundColor: String, $icon: String, $onTap: Boolean) {
    createFlavor(
      name: $name,
      description: $description,
      special: $special,
      backgroundColor: $backgroundColor,
      icon: $icon,
      onTap: $onTap
    ) {
      id
      createdAt
      name
      description
      special
      backgroundColor
      icon
      onTap
    }
  }
`
export default graphql(CREATE_FLAVOR_MUTATION, { name: 'createFlavorMutation' })(LoadData)
