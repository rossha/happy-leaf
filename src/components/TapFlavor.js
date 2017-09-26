import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo'
import '../styles/App.css'
import '../styles/TapFlavor.css'

class TapFlavor extends Component {

   _toggleOnTap = function(props) {
     props.toggleOnTapMutation({
       variables: {
         id: props.flavor.id,
         onTap: !props.flavor.onTap
       }
     })
   }

  render() {
    let cssClasses = `bg-${this.props.flavor.backgroundColor} tap-flavor`
    return (
      <div className={cssClasses} >
        <div className="tap-flavor__title w-80">
          <div className="tap-flavor__title__text">{this.props.flavor.name}</div>
          <div className="tap-flavor__title__border-right"></div>
        </div>
        <div className='tap-flavor__ontap w-20'>
          <div className="tap-flavor__ontap__label">ON TAP</div>
          <input
            name="onTap"
            type="checkbox"
            className="tap-flavor__ontap__checkbox"
            defaultChecked={this.props.flavor.onTap}
            onChange={this._toggleOnTap.bind(null, this.props)} />
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

export default compose(
  graphql(TOGGLE_ONTAP_MUTATION, { name: 'toggleOnTapMutation' }),
)(TapFlavor)
