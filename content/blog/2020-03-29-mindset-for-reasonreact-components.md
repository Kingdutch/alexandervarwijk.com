---
layout: blog
title: Mindset for ReasonReact components
date: 2020-03-31T18:50:57.197Z
description: >-
  Moving from React in JavaScript to ReasonML can be quite challenging. Figuring
  out how to move your existing code patterns from JavaScript to a strong
  type-system takes some time. In this article we'll explore how to translate a
  common component extension pattern.
featuredImage: /images/blog/always-room-to-grow-grafitti-on-shed.jpg
---
A common pattern in React with JavaScript is to extend a component, add a few arguments, modify another and pass on the rest. Sometimes called ‘rest props’ this pattern provides a nice way to provide some default behaviour on top of a DOM element (or an element from a library). 

When trying to do these same things in ReasonML (a statically typed language) I ran into some difficulties. During a discussion in the Reason discord we came up with some possibilities. However, each had their own drawbacks. Let’s explore the problem and the options we have!

## An example in JavaScript

Lets first explore how such a component would look when written in untyped JavaScript. Below is an example of an image element that renders differently based on the assigned variant. An example of where this may be useful would be in a Bootstrap card element to display an image on the left or top of the card.

```js
/**
 * An image with configurable variants.
 */
const Image = (props) => {
  // Pick out the two props we're interesting in 
  // and gather the rest.
  const { variant='top', className, ...rest} = props;
  
  // Assign classes based on the chosen variant.
  let classes;
  switch (variant) {
    case 'top':
      classes = 'image--top';
      break;
    case 'left':
      classes = 'image--left';
      break;
      // etc.
    default:
      throw new Error('Unsupported variant');
  }

  // If classes were passed, append them to 
  // the variant classes.
  if (className) {
    classes += " " + className;
  } 
  // Set our classes and assign any other properties
  // that may have been set by the calling code.
  return <img className={classes} {...rest} />;
}
```

There is quite a bit going on here. There are three things to take away from this code snippet that will be important later.
1. All props that a DOM `img` element supports are supported by our special `Image` element.
2. We consume an extra prop `variant` that is not forwarded to the `img` but used for internal behaviour.
3. We modify a passed in prop `className` that will be forwarded to the image.

## Recreating our Image component in ReasonML

(This method was suggested to me by [Yawar Amin](https://dev.to/yawaramin/comment/hlmm "Component inheritance by Yawar Amin on dev.to"))

One of the things that you see in the JavaScript version of this element is the use of the spread operator (`...`) to catch and release the properties that our special Image element is not interested in. Unfortunately [the spread operator is not supported in ReasonML](https://reasonml.github.io/reason-react/docs/en/props-spread "Documentation on props spread"). The documentation mentions that if we absolutely need it there is a way to mimic the behaviour.

```ReasonML
module Image = {
  type imageVariant =
    | Top
    | Left;

  [@react.component]
  let make = (~variant=Top, ~className=?, ~children) => {
    let classes =
      switch (variant) {
      | Top => "image--top"
      | Left => "image--left"
      };
    let classes =
      switch (className) {
      | Some(x) => classes ++ " " ++ x
      | None => classes
      };
    ReasonReact.cloneElement(children, ~props={"className": classes}, [||]);
  };
};
```

This component can be used in the following manner:
```ReasonML
<Image variant={Image.Left}>
  <img width="400" src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b" />
</Image>
```

When playing around with this, you will notice that it can be a little cumbersome to remember to pass the element that should be rendered as child to the `Image`. This is quite a bit more verbose than the react equivalent `<Image variant="left" width="400" src="..." />`. It also exposes more of the implementation that may be desired (e.g. changing the implementation to use a `picture` element instead of an `img` element would require changing calling code, instead of simply changing the `Image` component).

Another issue is that if you were to set a className on the `img` element itself, it would be overwritten by the classes from our `Image` component. A developer using our component must remember to specify classNames on the outer component.

### Removing the extra element

There is a way to make our `Image` work without having to pass in an extra `img` element. to do this we make use of the `ReactDOMRe.domProps` type that includes all the attributes that are allowed on a DOM element. This can be done by defining `makeProps` directly. Something that is normally done through the `[@React.component]` annotation.

```ReasonML
module Image = {
  let makeProps = ReactDOMRe.domProps;
  let make = (props: ReactDOMRe.domProps) => {
    let classProps = {
      "className": "image--top " ++ Obj.magic(props)##className,
    };
    let myProps = Js.Obj.assign(Js.Obj.empty(), Obj.magic(props));
    let myProps = Js.Obj.assign(myProps, classProps);
    ReactDOMRe.createDOMElementVariadic(
      "img",
      ~props=Obj.magic(myProps),
      [||],
    );
  };
};
```
_Note when using the above code: `let makeProps = ReactDOMRe.domProps;` will copy the entire domProps generation function into your output JS. This may be undesireable._

This element can be used in the following manner:
```ReasonML
<Image width="400" src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b" />
```

This implementation no longer requires the use of an extra `img` element within our custom `Image`. However, as you can see the `variant` property has disappeared. This is a limitation of using the `ReactDOMRe.domProps` type directly. This type does not include a `variant` property. This can be solved by creating a React components for each variant but that duplicates some more logic.

_(Astute readers may also observe that not specifying `className` on our `Image` element would cause the class `undefined` to be added to the list of classes.) This can be solved by checking for its existence making the example a bit more verbose._

Both implementations have some drawbacks, so what are we to do.

## A change of mindset

JavaScript is a weakly typed language. This provides us with lots of creativity. However, typed programming languages [are used for good reasons](https://www.alexandervarwijk.com/blog/2020-01-13-a-comparison-of-javascript-typesystems/ "A comparison of JavaScript typesystems"). They let the compiler catch mistakes before the user is running our application. This means we have to work with some restrictions and can not be as free as in JavaScript when adding a property to our component.

Let’s try to recreate our component without needing a child element while still allowing for our variant class. Instead of extending `ReactDOMRe.domProps` this will require us to spell out all the properties that our `Image` component can handle. This may feel overly restrictive when coming from JavaScript — this article came from a two day discord conversation before I budged from this standpoint — but it also provides some benefits.

```ReasonML
module Image = {
  type imageVariant =
    | Top
    | Left;

  [@react.component]
  let make = (~variant=Top, ~className=?, ~src, ~width=?) => {
    let classes =
      switch (variant) {
      | Top => "image--top"
      | Left => "image--left"
      };
    let classes =
      switch (className) {
      | Some(x) => classes ++ " " ++ x
      | None => classes
      };

    <img className=classes src ?width />;
  };
};
```

This element can be used in the following manner:
```ReasonML
<Image width="400" src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b" />
<Image variant={Image.Left} src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b" />
```

This brings us back to the simple calling convention of a single component. This means if we wanted to we could easily implement our Image component as a picture element without changing any of our calling code. Our Image component also supports our variant property which is not passed on the the img element.

I would like to argue that being this explicit about the properties that our custom component accepts is a good thing. If we run into a situation where another property must be supported it’s relatively trivial to add. In addition, if we decide that we should not support some properties then these can be easily removed from the component. For example in case this image component should not have a `width` property because it must always be full-width, when removing the property the Reason compiler will tell us of any location in our application where it was used, forcing us to find a solution.

My problem of trying to add an optional prop to all the other possible properties of an image element started when I tried to recreate the behaviour of the [Bootstrap card component](https://getbootstrap.com/docs/4.0/components/card/ "Bootstrap V4 card component documentation"). The layout depended on classes on its child elements. In this article I’ve shown a couple of ways how you could get to such behaviour, each with their own trade-offs. 

While writing this article I’ve had some ideas of how you could utilise Reason’s type-system to implement component nesting as used in Bootstrap cards in a different way altogether. I hope to explain this in a future article.

Have you run into this problem already? How have you solved it? Do you see any ways to improve any of these solutions? Let me know on [Twitter](https://twitter.com/Kingdutch/ "Find me on Twitter!")!

_Thanks to alex.fedoseev, yawaramin, jaap, ryppy, johnridesabike, davesnx for their feedback in the ReasonML discord and their patience while I asked endless questions. Thanks to [Yawar Amin](https://dev.to/yawaramin/ "Read Yawar Amin's great articles about ReasonML and oCaml on dev.to") for providing feedback on a draft of this article._
