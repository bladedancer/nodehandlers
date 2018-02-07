# nodehandler-gm-mustache

## About

This module installs the [Mustache](http://mustache.github.io) flow-node to be used within [Axway API Builder's](https://www.axway.com/en/datasheet/axway-api-builder)
flow editor.

The Mustache flow-node allows the evaluation of [Mustache](http://mustache.github.io) templates using values from the flow.

### Format string
The _Format string_ method evaluates the template given with the data supplied. This allows complex values to be constructed from values that exist in the flow's context.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| data | object | y | The data to evaluate the template with. Use $ to access the entire context. |
| template | string | y | The template being evaluated. |

### Format object
The _Format object_ method is similar to the _Format string_ method. It evaluates the template given with the data supplied. However the resulting string value is then JSON parsed. This allows the creation of JavaScript values and objects from the evaluated template.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| data | object | y | The data to evaluate the template with. Use $ to access the entire context. |
| template | string | y | The doT template being evaluated. |

### Mustache Templates
The Javascript implementation of Mustache being used is https://github.com/janl/mustache.js.


TODODOODODODODODODODO

#### Example
In the examples the Flow is going to be attached to an API that has three parameters, firstname, lastname and gender.

##### Basic interpolation {{= }}
The template can be used to quickly concatenate values.

| | |
| - | - |
| Request | <http://localhost:8080/api/example?firstname=Clark&lastname=Kent&gender=m> |
| _data_ | $ |
| _template_ | {{=it.params.firstname}} {{=it.params.lastname}} |
| Output | Clark Kent |


##### Conditionals {{? }}
The template evaluation supports conditional logic to tailor the output based on the input.

| | |
| - | - |
| Request | <http://localhost:8080/api/example?firstname=Clark&lastname=Kent&gender=m> |
| _data_ | $ |
| _template_ | Hello {{? it.gender=="m"}}Mr {{?}}{{? it.gender=="f"}}Ms {{?}}{{= it.surname}} |
| Output | Hello Mr Kent |

| | |
| - | - |
| Request | <http://localhost:8080/api/example?firstname=Lois&lastname=Lane&gender=f> |
| _data_ | $ |
| _template_ | Hello {{? it.gender=="m"}}Mr {{?}}{{? it.gender=="f"}}Ms {{?}}{{= it.surname}} |
| Output | Hello Ms Lane |


##### Array Iteration {{~ }}
The template engine can also iterate over arrays, creating content for each element in the array.


| | |
| - | - |
| Request | <http://localhost:8080/api/example?names=Tom,Dick,Harry> |
| _data_ | $ |
| _template_ | {{~it.params.names :value:index}}{{=index}}={{=value}};{{~}} |
| Output | 0=Tom;1=Dick;2=Harry; |


## Getting started

1.  Go to [platform.axway.com](https://platform.axway.com) and create an account
1.  Install [API Builder](https://docs.axway.com/bundle/API_Builder_allOS_en/page/api_builder.html)
1.  Follow the [Getting Started Guide](https://docs.axway.com/bundle/API_Builder_allOS_en/page/api_builder_getting_started_guide.html)

## Install

After creating your API Builder project (`appc new -t arrow`), you can install this flow-node handler
using npm:

```
npm install --save nodehandler-dot
```

The "Compose" flow-node will then be available in the tools panel when creating or editing Flows.
