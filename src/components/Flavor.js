import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo'
import '../styles/App.css';

class Flavor extends Component {
  render() {
    return (
      <div className="flavor">
        <h2>{this.props.flavor.name}</h2>
        { !this.props.flavor.onTap &&
          <button onClick={() => this._toggleOnTap(this.props)}>Add to Tap List</button>
        }
        { this.props.flavor.onTap &&
          <button onClick={() => this._toggleOnTap(this.props)}>Remove from Tap List</button>
        }
        <button onClick={() => this._deleteFlavor(this.props)}>&times;</button>
      </div>
    );
  }

  _toggleOnTap = function(props) {
    props.toggleOnTapMutation({
      variables: {
        id: props.flavor.id,
        onTap: !props.flavor.onTap
      }
    })
  }

  _deleteFlavor = function(props) {
    const id = props.flavor.id
    props.deleteFlavorMutation({
      variables: {
        id
      }
    })
  }

}

const TOGGLE_ONTAP_MUTATION = gql`
  mutation updateFlavor($id: ID!, $onTap: Boolean) {
    updateFlavor(id: $id, onTap: $onTap) {
      onTap
    }
  }
`

const DELETE_FLAVOR_MUTATION = gql`
  mutation deleteFlavor($id: ID!) {
    deleteFlavor(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(TOGGLE_ONTAP_MUTATION, { name: 'toggleOnTapMutation' }),
  graphql(DELETE_FLAVOR_MUTATION, { name: 'deleteFlavorMutation' })
)(Flavor)
