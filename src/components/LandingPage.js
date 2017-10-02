import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { graphql, gql, compose  } from 'react-apollo'
import TapList from './TapList'
import FlavorList from './FlavorList'
import { GC_USER_ID } from '../constants'

class LandingPage extends Component {

  constructor() {
    super();

    // Initial State
    this.state = {
      flavors: []
    };
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
        this.props.allFlavorsQuery.refetch()
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

    const flavorsPromise = this.props.allFlavorsQuery.refetch();
    function success(flavors) {
      this.setState({ flavors: flavors.data.allFlavors })
    }
    function failure(reason) {
        console.log('fail')
    }
    flavorsPromise.then(success.bind(this), failure)
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div>
        { userId &&
          <div className="landingPage">
            <div className="fl w-50">
              <TapList path={this.props.location.pathname} allFlavorsQuery={this.props.allFlavorsQuery} />
            </div>
            <div className="fl w-50">
              <FlavorList allFlavorsQuery={this.props.allFlavorsQuery} createFlavorMutation={this.props.createFlavorMutation} />
            </div>
          </div>
        }
        { !userId &&
          <Redirect to="/login"/>
        }
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
) (LandingPage)
