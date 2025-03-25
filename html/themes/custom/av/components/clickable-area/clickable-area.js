/**
 * @file
 * Implements the logic for a clickable area.
 *
 * Adapted from https://eng.wealthfront.com/2020/10/01/building-a-truly-accessible-clickable-div/.
 */
((Drupal) => {
  const clickableElemTypes = ['a', 'button', 'input'];

  function handleClick(refExpandedArea, e) {
    const clickableElems = [
      ...refExpandedArea.querySelectorAll('[data-expand-click-area]')
    ];
    if (clickableElems.length !== 1) {
      throw new Error(
        `Expected one clickable element but found ${clickableElems.length}`
      );
    }
    const clickableElem = clickableElems[0];
    const targetIsClickable = clickableElemTypes.includes(e.target.tagName.toLowerCase());

    if (clickableElem !== e.target && !targetIsClickable) {
      clickableElem.click();
    }
  }

  Drupal.behaviors.clickable_area = {
    attach(context) {
      context.querySelectorAll('.clickable-area').forEach((el) => {
        // We bind the element to simulate the React element reference.
        el.addEventListener('click', e => handleClick(el, e))
      });
    },
  };
})(Drupal);
