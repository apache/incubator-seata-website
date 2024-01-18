---
id: redirect
title: redirect
---

import {Route} from '@docusaurus/router';

<Route
path={'/*'}
component={() => {
global.window && (global.window.location.href = '/docs/v123');
return null;
}}
/>
