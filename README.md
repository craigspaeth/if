# if
Website project for a client

## Preprocesser techniques used

### Templates

* Includes
  * Replace all `<%- include x -%>` with `<?php include 'x.php' ?>`

### Stylesheets

* Variables
  1. Replace stylus variable delcarations in main.styl with the equivalent in your preprocessor
  2. Search and replace *.styl files to replace variables names with values
* Math
  * TBD
* Clearfix
  * Search for `clearfix()` in *.styl and replace using main.css as a reference