import React, { Component } from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import '../styles/App.css'
import '../styles/TapFlavor.css'

const SortableFlavor = SortableElement(({ flavor, toggleOnTap }) => {

  let cssClasses = `bg-${flavor.backgroundColor} tap-flavor`

  return (
    <div className={cssClasses}>
      <div>
        <div className="tap-flavor__title w-80">
          <div className="tap-flavor__title__text">{flavor.name}</div>
          <div className="tap-flavor__title__border-right"></div>
        </div>
        <div className='tap-flavor__ontap w-20'>
          <div className="tap-flavor__ontap__label">ON TAP</div>
          <input
            name="onTap"
            type="checkbox"
            className="tap-flavor__ontap__checkbox"
            checked={flavor.onTap}
            onChange={() => toggleOnTap(flavor)} />
        </div>
      </div>
    </div>
  )
});

const SortableFlavors = SortableContainer(({ taplist, toggleOnTap }) => {
  return (
    <div className="tapList">
      <h2 className="tapList__title">What's On Tap</h2>
      <div>
        {taplist.map((value, index) => ( value.onTap &&
          <SortableFlavor key={`item-${index}`} index={index} flavor={value} toggleOnTap={toggleOnTap} />
        ))}
      </div>
    </div>
  );
});

class SortableTapList extends Component {

  constructor() {
    super();
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.updateTaplistState(arrayMove(this.props.taplist, oldIndex, newIndex))
    this.props.taplist.map((flavor, index) => this.props.updateTapIndex(flavor, index))
  };

  render() {
    return <SortableFlavors
              flavors={this.props.flavors}
              taplist={this.props.taplist}
              updateTaplistState={this.props.updateTaplistState}
              toggleOnTap={this.props.toggleOnTap}
              onSortEnd={this.onSortEnd} />;
  }
}

export default SortableTapList
