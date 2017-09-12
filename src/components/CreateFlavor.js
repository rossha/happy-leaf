import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import { GC_USER_ID } from '../constants'

class CreateFlavor extends Component {

  state = {
    name: '',
    description: '',
    special: false,
    backgroundColor: '',
    icon: '',
    onTap: false
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='A name for the flavor'
          />
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the flavor'
          />
          <div>
            Special?
            <span>
              Y
              <input
                className='mb2'
                value={true}
                name='special'
                onChange={(e) => this.setState({ special: e.target.value })}
                type='radio'
                placeholder='YES'
              />
              N
              <input
                className='mb2'
                value={false}
                name='special'
                onChange={(e) => this.setState({ special: e.target.value })}
                type='radio'
                placeholder='NO'
              />
            </span>
          </div>
          <input
            className='mb2'
            value={this.state.backgroundColor}
            onChange={(e) => this.setState({ backgroundColor: e.target.value })}
            type='text'
            placeholder='A background color for the flavor'
          />
          <input
            className='mb2'
            value={this.state.icon}
            onChange={(e) => this.setState({ icon: e.target.value })}
            type='text'
            placeholder='An optional icon image for the flavor'
          />
        </div>
        <div>
          On Tap?
          <span>
            Y
            <input
              className='mb2'
              value={true}
              name='onTap'
              onChange={(e) => this.setState({ onTap: e.target.value })}
              type='radio'
              placeholder='YES'
            />
            N
            <input
              className='mb2'
              value={false}
              name='onTap'
              onChange={(e) => this.setState({ onTap: e.target.value })}
              type='radio'
              placeholder='NO'
            />
          </span>
        </div>
        <button
          onClick={() => this._createFlavor()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createFlavor = async () => {
    const createdById = localStorage.getItem(GC_USER_ID)
    if(!createdById) {
      console.log('Must be logged in to post a link')
      return
    }
    const { name, description, special, backgroundColor, icon, onTap } = this.state
    await this.props.createFlavorMutation({
      variables: {
        name,
        description,
        special,
        backgroundColor,
        icon,
        onTap,
        createdById
      }
    })
    this.props.history.push('/')
  }

}

const CREATE_FLAVOR_MUTATION = gql`
  mutation CreateFlavorMutation($name: String!, $description: String, $special: Boolean $backgroundColor: String, $icon: String, $onTap: boolean, $createdById: ID!) {
    createFlavor(
      name: $name,
      description: $description,
      special: $special,
      backgroundColor: $backgroundColor,
      icon: $icon,
      onTap: $onTap,
      createdById: $createdById
    ) {
      id
      createdAt
      name
      description
      special
      backgroundColor
      icon
      onTap
      createdBy {
        id
        name
      }
    }
  }
`
export default graphql(CREATE_FLAVOR_MUTATION, { name: 'createFlavorMutation' })(CreateFlavor)
