# CritterAPI
A simple wrapper around the Box Critters API.

## Usage
Include the `critterapi.js` in your project. After doing this, you should be able to use the [API](#api).

### Web
If your project is a web project, add the following tag to your HTML:
```js
<script src="https://cdn.jsdelivr.net/gh/boxcrittersmods/critterapi/critterapi.min.js"></script>
```
You can also download the file and host it yourself, in that case, change the `src` attribute.

### Node.js
If your project uses Node.js, currently your only option is using a fetch polyfill like `node-fetch`.

## API
CritterAPI exposes the following members and methods through the `CritterAPI` class:

### `constructor(base_url)`
Creates a new instance of the class. The `base_url` argument is optional, and defaults to `"https://boxcritters.com/data"`.

### `get_player_by_id(id)`
Returns a `Promise` that resolves to the data of the requested player. The `Promise` will be rejected if any error occurs, and the [`errno`](#errno) member will be set to the error code.

### `get_errno(id)`
Returns the [`errno`](#errno) member.

### `errno`
The numeric code of the last error:
 + `0`: No errors.
 + `-1`: ID validation failed.
 + `-2`: Invalid path requested.
 + `-3`: Error while parsing JSON.
 + `-4`: Error while fetching data.

## Licensing
All the code of this project is licensed under the [GNU General Public License version 2.0](https://github.com/boxcrittersmods/critterapi/blob/master/LICENSE) (GPL-2.0).

All the documentation of this project is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) (CC BY-SA 4.0) license.

![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)
