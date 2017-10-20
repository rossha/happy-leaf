import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { graphql, gql, compose  } from 'react-apollo'
import FlavorList from './FlavorList'
import SortableTapList from './SortableTapList'
import { GC_USER_ID } from '../constants'

class Admin extends Component {

  constructor() {
    super();
    this.toggleOnTap = this.toggleOnTap.bind(this);
    this.updateTaplistState = this.updateTaplistState.bind(this);
    this.updateTapIndex = this.updateTapIndex.bind(this);
    this.refetchAndSetFlavors = this.refetchAndSetFlavors.bind(this);
    this.refetchAndSetTaplist = this.refetchAndSetTaplist.bind(this);

    // Initial State
    this.state = {
      flavors: [],
      taplist: []
    };
  }

  componentDidMount() {
    this._subscribeToNewFlavors()
    this._subscribeToUpdatedFlavors()
    this._subscribeToDeletedFlavors()

    this.refetchAndSetFlavors()
    this.refetchAndSetTaplist()
  }

  refetchAndSetTaplist() {
    const taplistPromise = this.props.onTapFlavorsQuery.refetch();
    function success(taplist) {
      this.setState({ taplist: taplist.data.allFlavors })
    }
    function failure(reason) {
      console.log('fail')
    }
    taplistPromise.then(success.bind(this), failure)
  }

  refetchAndSetFlavors() {
    const flavorsPromise = this.props.allFlavorsQuery.refetch();
    function success(flavors) {
      this.setState({ flavors: flavors.data.allFlavors })
    }
    function failure(reason) {
      console.log('fail')
    }
    flavorsPromise.then(success.bind(this), failure)
  }

  updateTaplistState(updatedArray) {
    this.setState({ taplist: updatedArray })
  }

  updateTapIndex(flavor, index) {
    this.props.updateTapIndexMutation({
      variables: {
        id: flavor.id,
        tapIndex: index
      }
    })
  }

  toggleOnTap(flavor) {
    let tapIndex;
    if(!flavor.onTap) {
      tapIndex = this.state.taplist.length;
    }

    this.props.toggleOnTapMutation({
      variables: {
        id: flavor.id,
        onTap: !flavor.onTap,
        tapIndex
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
              tapIndex
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        this.refetchAndSetFlavors();
        this.refetchAndSetTaplist();
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
              tapIndex
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        this.refetchAndSetFlavors();
        this.refetchAndSetTaplist();
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
              tapIndex
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        this.refetchAndSetFlavors();
        this.refetchAndSetTaplist();
      }
    })
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID)

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.loading) {
      return <div>Loading...</div>
    }

    if(this.props.allFlavorsQuery && this.props.allFlavorsQuery.error) {
      return <div>error{console.log(this.props.allFlavorsQuery.error)}</div>
    }

    return (
      <div>
        { userId &&
          <div className="admin">
            <div className="fl admin__list">
              <SortableTapList
                flavors={this.state.flavors}
                taplist={this.state.taplist}
                updateTaplistState={this.updateTaplistState}
                toggleOnTap={this.toggleOnTap}
                updateTapIndex={this.updateTapIndex} />
            </div>
            <div className="fl admin__list">
              <FlavorList
                allFlavorsQuery={this.props.allFlavorsQuery}
                createFlavorMutation={this.props.createFlavorMutation} />
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

const UPDATE_TAPINDEX_MUTATION = gql`
  mutation updateFlavor($id: ID!, $tapIndex: Int) {
    updateFlavor(id: $id, tapIndex: $tapIndex) {
      id,
      tapIndex
    }
  }
`

const TOGGLE_ONTAP_MUTATION = gql`
  mutation updateFlavor($id: ID!, $onTap: Boolean, $tapIndex: Int) {
    updateFlavor(id: $id, onTap: $onTap, tapIndex: $tapIndex) {
      id,
      onTap,
      tapIndex
    }
  }
`

const CREATE_FLAVOR_MUTATION = gql`
  mutation CreateFlavorMutation($name: String!, $description: String, $special: Boolean $backgroundColor: String, $icon: String, $onTap: Boolean, $tapIndex: Int) {
    createFlavor(
      name: $name,
      description: $description,
      special: $special,
      backgroundColor: $backgroundColor,
      icon: $icon,
      onTap: $onTap,
      tapIndex: $tapIndex
    ) {
      id
      createdAt
      name
      description
      special
      backgroundColor
      icon
      onTap
      tapIndex
    }
  }
`

const ON_TAP_FLAVORS_QUERY = gql`
  query onTapFlavorsQuery {
    allFlavors(
      filter: {
        onTap: true
      },
      orderBy: tapIndex_ASC
    ) {
      id
      createdAt
      name
      special
      description
      backgroundColor
      icon
      onTap
      tapIndex
    }
  }
`

const ALL_FLAVORS_QUERY = gql`
  query AllFlavorsQuery {
    allFlavors (orderBy: createdAt_DESC) {
      id
      createdAt
      name
      special
      description
      backgroundColor
      icon
      onTap
      tapIndex
    }
  }
`

export default compose(
  graphql(ALL_FLAVORS_QUERY, { name: 'allFlavorsQuery' }),
  graphql(ON_TAP_FLAVORS_QUERY, { name: 'onTapFlavorsQuery' }),
  graphql(CREATE_FLAVOR_MUTATION, { name: 'createFlavorMutation' }),
  graphql(UPDATE_TAPINDEX_MUTATION, { name: 'updateTapIndexMutation' }),
  graphql(TOGGLE_ONTAP_MUTATION, { name: 'toggleOnTapMutation' })
) (Admin)
