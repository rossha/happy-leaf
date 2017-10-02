import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo'
import { debounce } from 'lodash'
import '../styles/App.css'

class Flavor extends Component {

  constructor() {
    super();
    this._updateFlavor = this._updateFlavor.bind(this);

    // Initial State
    this.state = {
      flavor: {}
    };
  }

  _toggleOnTap = function(props) {
    props.toggleOnTapMutation({
      variables: {
        id: props.flavor.id,
        onTap: !props.flavor.onTap
      }
    })
  }

  _handleChange(e, props) {
    const flavor = {...this.state.flavor,
      [e.target.name]: e.target.value
    }
    this.setState({ flavor });
    if(e.target.name === 'backgroundColor') {
      props.updateFlavorMutation({
        variables: {
          id: flavor.id,
          name: flavor.name,
          onTap: flavor.onTap,
          backgroundColor: flavor.backgroundColor
        }
      });
    }
  }

  _updateFlavor = function(props) {
    let flavor = this.state.flavor;

    props.updateFlavorMutation({
      variables: {
        id: flavor.id,
        name: flavor.name,
        onTap: flavor.onTap,
        backgroundColor: flavor.backgroundColor
      }
    });
  }

  _deleteFlavor = function(props) {
    const id = props.flavor.id
    props.deleteFlavorMutation({
      variables: {
        id
      }
    })
  }

  componentWillMount() {
    this.setState({ flavor: this.props.flavor })
  }

  componentDidMount() {
    const nameInput = document.querySelector(`.${this.state.flavor.id} .flavor__name`);
    nameInput.addEventListener('keyup', debounce(this._updateFlavor.bind(null, this.props), 500));
  }

  render() {
    let cssClasses = `bg-${this.state.flavor.backgroundColor} flavor ${this.state.flavor.id}`

    return (
      <div className="flavor-container">
        <div className={cssClasses} >
          <div className="flavor__name">
            <input
              name="name"
              type="text"
              value={this.state.flavor.name}
              onChange={(e) => this._handleChange(e, this.props)}
              placeholder="Flavor Name" />
          </div>
          <div className="flavor__fields">
            <div className="flavor__field fl w-33">
                <div className="flavor__field__label">
                  On Tap
                </div>
                <div className="flavor__field__content">
                  <input
                    name="onTap"
                    type="checkbox"
                    checked={this.props.flavor.onTap}
                    onChange={this._toggleOnTap.bind(null, this.props)} />
                </div>
            </div>
            <div className="flavor__field fl w-33">
              <div className="flavor__field__label">
                Color
              </div>
              <div className="flavor__field__content">
                <select name="backgroundColor" value={this.props.flavor.backgroundColor} onChange={(e) => this._handleChange(e, this.props)} >
                  <option value="pink">pink</option>
                  <option value="orange">orange</option>
                  <option value="yellow">yellow</option>
                  <option value="green">green</option>
                  <option value="blue">blue</option>
                  <option value="purple">purple</option>
                </select>
              </div>
            </div>
            <div className="flavor__field fl w-33">
                <div className="flavor__field__label">
                  Delete
                </div>
                <div className="flavor__field__content">
                  {this.props.className !== 'onTap' && <div onClick={() => this._deleteFlavor(this.props)}>&times;</div>}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const TOGGLE_ONTAP_MUTATION = gql`
  mutation updateFlavor($id: ID!, $onTap: Boolean) {
    updateFlavor(id: $id, onTap: $onTap) {
      id,
      onTap
    }
  }
`

const UPDATE_FLAVOR_MUTATION = gql`
  mutation updateFlavor($id: ID!, $name: String!, $backgroundColor: String!) {
    updateFlavor(id: $id, name: $name, backgroundColor: $backgroundColor) {
      id,
      name,
      backgroundColor
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
  graphql(UPDATE_FLAVOR_MUTATION, { name: 'updateFlavorMutation' }),
  graphql(DELETE_FLAVOR_MUTATION, { name: 'deleteFlavorMutation' })
)(Flavor)
