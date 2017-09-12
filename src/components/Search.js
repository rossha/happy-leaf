import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import Flavor from './Flavor'

class Search extends Component {

  state = {
    flavors: [],
    searchText: ''
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type='text'
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          <button
            onClick={() => this._executeSearch()}
          >
            OK
          </button>
        </div>
        {this.state.flavors.map((flavor, index) => <Flavor key={flavor.id} flavor={flavor} index={index}/>)}
      </div>
    )
  }

  _executeSearch = async () => {
    const { searchText } = this.state
    const result = await this.props.client.query({
      query: ALL_FLAVORS_SEARCH_QUERY,
      variables: { searchText }
    })
    const flavors = result.data.allFlavors
    this.setState({ flavors })
  }

}

const ALL_FLAVORS_SEARCH_QUERY = gql`
  query AllFlavorsSearchQuery($searchText: String!) {
    allFlavors(filter: {
      OR: [{
        name_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      id
      name
      description
      special
      createdAt
    }
  }
`

export default withApollo(Search)
