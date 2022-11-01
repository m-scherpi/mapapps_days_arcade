# Arcade Executor
The Arcade Executor Bundle allows you to execute Arcade Expressions on FeatureLayer data and add the results as labels to
the layer in the map.

Screenshot Links [TBD]

## Build Status

[TBD]

## Sample App
[TBD]

## Installation Guide
⚠️**Requirement: map.apps 4.14.0**

Readme Links [TBD]

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
   `mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
   Change the mapapps.remote.base in the build.properties file and run:
   `mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
