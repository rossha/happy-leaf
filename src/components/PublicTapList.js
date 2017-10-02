import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'
import TapList from './TapList'
import gearIcon from '../images/icons/gear.png'

class PublicTapList extends Component {

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
  }

  render() {

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.loading) {
      return <div>Loading...</div>
    }

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.error) {
      return <div>error{console.log(this.props.allFlavorsQuery.error)}</div>
    }

    return (
      <div className="public-taplist fl w-100">
        <TapList path={this.props.location.pathname} allFlavorsQuery={this.props.allFlavorsQuery} />
        <Link to="/login"><img className="admin-gear" alt="admin" src={gearIcon} /></Link>
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

export default graphql(ALL_FLAVORS_QUERY, { name: 'allFlavorsQuery' })(PublicTapList)
