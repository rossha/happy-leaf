import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'
import Flavor from './Flavor'

class FlavorList extends Component {

  updateFlavor(key, updatedFlavor) {
    const flavors = {...this.state.flavors};
    flavors[key] = updatedFlavor;
    this.setState({ flavors });
  }

  _createFlavor = function(props) {
    console.log('create flavor');
    props.createFlavorMutation({
      variables: {
        name: 'New Flavor',
        special: false,
        backgroundColor: 'pink',
        onTap: false
      }
    })
  }

  _subscribeToNewFlavors = () => {
    this.props.allFlavorsQuery.subscribeToMore({
      document: gql`
        subscription {
          Flavor(filter: {
            mutation_in: [CREATED]
          }) {
            node {
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
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllFlavors = [
          subscriptionData.data.Flavor.node,
          ...previous.allFlavors
        ]
        const result = {
          ...previous,
          allFlavors: newAllFlavors
        }
        return result
      }
    })
  }

  _subscribeToUpdatedFlavors = () => {
    this.props.allFlavorsQuery.subscribeToMore({
      document: gql`
        subscription {
          Flavor(filter: {
            mutation_in: [UPDATED]
          }) {
            node {
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
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const updatedFlavorIndex = previous.allFlavors.findIndex(flavor => flavor.id === subscriptionData.data.Flavor.id)
        const flavor = subscriptionData.data.Flavor
        const newAllFlavors = previous.allFlavors.slice()
        newAllFlavors[updatedFlavorIndex] = flavor
        const result = {
          ...previous,
          allLinks: newAllFlavors
        }
        return result
      }
    })
  }

  _subscribeToDeletedFlavors = () => {
    this.props.allFlavorsQuery.subscribeToMore({
      document: gql`
        subscription {
          Flavor(filter: {
            mutation_in: [DELETED]
          }) {
            node {
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
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        this.props.allFlavorsQuery.refetch()
      }
    })
  }

  componentDidMount() {
    this._subscribeToNewFlavors()
    this._subscribeToUpdatedFlavors()
    this._subscribeToDeletedFlavors()
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
        <div onClick={() => this._createFlavor(this.props)} className="addFlavor b--white-90 b--dashed">&#43; Add Flavor</div>
        {flavorsToRender.map(flavor => (
          <Flavor key={flavor.id} flavor={flavor} />
        ))}
      </div>
    )

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

export default compose(
  graphql(ALL_FLAVORS_QUERY, { name: 'allFlavorsQuery' }),
  graphql(CREATE_FLAVOR_MUTATION, { name: 'createFlavorMutation' })
)(FlavorList)
