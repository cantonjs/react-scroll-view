# react-scroll-view [WIP]

[![CircleCI](https://circleci.com/gh/cantonjs/react-scroll-view.svg?style=shield)](https://circleci.com/gh/cantonjs/react-scroll-view)
[![Build Status](https://travis-ci.org/cantonjs/react-scroll-view.svg?branch=master)](https://travis-ci.org/cantonjs/react-scroll-view)

React scroll component

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [References](#references)
  - [ScrollView Component](#scrollview-component)
  - [ScrollObserver Component](#scrollobserver-component)
  - [StickySection Component](#stickysection-component)
- [License](#license)

## Features

- Support sticky for cross browsers (including Mobile Safari)****
- Support refresh control
- Support `onEndReach()`, `onScrollStart()` and `onScrollEnd()` events
- Easy to observe the intersections between scroll view and children

## Installation

By `yarn`

```bash
$ yarn add @cantonjs/react-scroll-view intersection-observer
```

**[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is required. You should include the [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) yourself for cross-browser support**

## Getting Started

```js
import "intersection-observer";
import React, { Component } from "react";
import { ScrollView } from "@cantonjs/react-scroll-view";

export default class App extends Component {
  handleEndReached = () => {
    console.log("load more");
  };

  render() {
    return (
      <ScrollView onEndReached={this.handleEndReached} style={{ height: '100vh' }}>
        <h1>React Scroll View</h1>
        <p>Awseome!</p>
      </ScrollView>
    );
  }
}
```

## References

### ScrollView Component

```jsx
import { ScrollView } from "@cantonjs/react-scroll-view";
```

Scroll view component

#### Props

| Property            | Description                                                                                                                              | Type     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| onScroll            | Fires at most once per frame during scrolling                                                                                            | Function |
| onScrollStart       | Called once when the scroll starts                                                                                                       | Function |
| onScrollEnd         | Called once when the scroll ends                                                                                                         | Function |
| onEndReached        | Called once when the scroll position gets within `endReachedThreshold` of the rendered content                                           | Function |
| endReachedThreshold | How far from the end (in pixels) the bottom to trigger the `onEndReached` callback                                                       | Number   |
| isHorizontal        | When `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column. Defaults to `false`        | Boolean  |
| disabled            | When `true`, the view cannot be scrolled. Defaults to `false`                                                                            | Boolean  |
| onRefresh           | If provided, a refreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the `isRefreshing` prop correctly | Function |
| isRefreshing        | Set this `true` while waiting for new data from a refresh                                                                                | Boolean  |
| refreshControlColor | The refreshControl icon color                                                                                                            | String   |
| refreshControlStyle | The refreshControl style                                                                                                                 | Object   |
| innerRef            | Use this to access the dom (DIV) ref                                                                                                     | Function |

### ScrollObserver Component

```jsx
import { ScrollObserver } from "@cantonjs/react-scroll-view";
```

Wrap any child component and observe it when in scroll view.

#### Props

| Property | Description                                                                               | Type     |
| -------- | ----------------------------------------------------------------------------------------- | -------- |
| onEnter  | Fires once when the children nodes enter                                                  | Function |
| onLeave  | Fires once when the children nodes leave                                                  | Function |
| innerRef | Use this to access the internal ref                                                       | Function |
| children | Children must be a function. Will receive an object with `isIntersecting` and `ref` props | Function |

#### Children function

The `children` prop will receive the following object shape:

| Property       | Description                                                                             | Type     |
| -------------- | --------------------------------------------------------------------------------------- | -------- |
| ref            | Must be passed down to your component's ref in order to obtain a proper node to observe | Function |
| isIntersecting | Will be `true` if the target element intersects with the scroll view                    | Boolean  |

#### Example

```js
import "intersection-observer";
import React, { Component } from "react";
import { ScrollView, ScrollObserver } from "@cantonjs/react-scroll-view";

export default class App extends Component {
  handleEndReached = () => {
    console.log("load more");
  };

  render() {
    return (
      <ScrollView onEndReached={this.handleEndReached} style={{ height: '100vh' }}>
        <h1>React Scroll View</h1>
        <p>Awseome!</p>
        <ScrollObserver>
          {({ ref, isIntersecting }) =>
            <img
              ref={ref}
              src="/img.jpg"
              alt="lazy image"
              style={{ display: isIntersecting ? 'inline-block' : 'none' }}
            />
          }
        </ScrollObserver>
      </ScrollView>
    );
  }
}
```

### StickySection Component

```jsx
import { StickySection } from "@cantonjs/react-scroll-view";
```

Section component with a sticky.

#### Props

| Property | Description         | Type |
| -------- | ------------------- | ---- |
| sticky   | Sticky node element | Node |

The rest of the props are exactly the same as the original [DOM attributes](https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes).

#### Example

```js
import "intersection-observer";
import React, { Component } from "react";
import { ScrollView, ScrollSection } from "@cantonjs/react-scroll-view";

export default class App extends Component {
  render() {
    return (
      <ScrollView style={{ height: '100vh' }}>
        <StickySection sticky={<h1>A</h1>}>
          <ul>
            <li>Adelia Pisano</li>
            <li>Alayna Loredo</li>
          </ul>
        </StickySection>
        <StickySection sticky={<h1>B</h1>}>
          <ul>
            <li>Brant Hunsberger</li>
          </ul>
        </StickySection>
        <StickySection sticky={<h1>C</h1>}>
          <ul>
            <li>Carl Wetzler</li>
            <li>Cherry Greeno</li>
            <li>Cris Kepley</li>
          </ul>
        </StickySection>
      </ScrollView>
    );
  }
}
```

## License

MIT
