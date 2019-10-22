---
layout: resource
title: When to useMemo and useCallback
url: 'https://kentcdodds.com/blog/usememo-and-usecallback'
date: 2019-10-22T09:59:50.532Z
tags:
  - react
---
An excellent article by Kent C. Dodds that helps me remember when I should and should not worry about callback creation in React components. For example the following is absolutely fine.

```
<input onChange={e => setValue(e.target.value)} />
```

However, if you're doing something like the following, then it may be worth memoizing the onClick callback for an expensive component.

```
<SeriouslyExpensiveComponent onClick={e => updateZoom()} /><input onChange={e => setValue(e.target.value)} />
```
