import { useRef } from 'react';

export default function ClickableArea({
  className,
  children,
  as: Element = 'div',
}) {
  const clickableElemTypes = ['a', 'button', 'input'];
  const refExpandedArea = useRef();

  function handleClick(e) {
    const clickableElems = [
      ...refExpandedArea.current.querySelectorAll('[data-expand-click-area]'),
    ];
    if (clickableElems.length !== 1) {
      throw new Error(
        `Expected one clickable element but found ${clickableElems.length}`
      );
    }
    const clickableElem = clickableElems[0];
    const targetIsClickable = clickableElemTypes.includes(
      e.target.tagName.toLowerCase()
    );

    if (clickableElem !== e.target && !targetIsClickable) {
      clickableElem.click();
    }
  }

  return (
    <Element
      ref={refExpandedArea}
      className={`${className} cursor-pointer`}
      tabIndex="0"
      onClick={handleClick}
    >
      {children}
    </Element>
  );
}
