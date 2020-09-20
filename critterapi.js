/*
 * critterapi.js
 * 
 * Copyright 2020 Alvarito050506 <donfrutosgomez@gmail.com>
 * Copyright 2020 The Box Critters Modding Community
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; version 2 of the License.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */

class CritterAPI
{
	constructor (base_url)
	{
		/* Temporary error code. */
		this.errno = 0;

		/* Base API URL. */
		this.base_url = base_url;
		if (!!base_url != true)
		{
			this.base_url = "https://boxcritters.com/data";
		}
	}

	__validate_id(id, len)
	{
		var regex;
		var tmp_len = Number(len);

		/* Perform basic checks. */
		if (!!tmp_len != true)
		{
			tmp_len = 15;
		}
		if (!!id != true || (typeof(id) != "string" && !(id instanceof String)))
		{
			this.errno = -1;
			return false;
		}

		/* Real checks. */
		regex = new RegExp(`^[a-fA-F0-9]{${tmp_len}}$`, "i");
		return id.match(regex) != null;
	}

	/* Simple wrapper to the Fetch API. */
	__resolve_fetch(path, res, rej)
	{
		var ret_data = new Object();
		var self = this; /* For callbacks and promises. */
		this.errno = 0;

		if (!!path != true)
		{
			this.errno = -2;
			ret_data = {
				"error": this.errno,
				"desc": "Invalid path.",
				"extra": null
			};
			rej(ret_data);
			return this.errno;
		}

		fetch(`${this.base_url}/${path}`).then(function (res) {
			return res.text();
		}).then(function (data) {
			try
			{
				ret_data = JSON.parse(data);
				res(ret_data);
			} catch
			{
				self.errno = -3;
				ret_data = {
					"error": self.errno,
					"desc": "Error while parsing JSON.",
					"extra": res_data
				};
				rej(ret_data);
			}
			return self.errno;
		}).catch(function (err) {
			self.errno = -4;
			ret_data = {
				"error": self.errno,
				"desc": "Error while fetching data.",
				"extra": err
			};
			rej(ret_data);
			return self.errno;
		});
		return this.errno;
	}

	get_player_by_id(id)
	{
		var self = this; /* For callbacks and promises. */
		var ret_data = new Object();

		return new Promise(function (res, rej) {			
			if (!self.__validate_id(id, 15))
			{
				ret_data = {
					"error": self.errno,
					"desc": "Invalid ID.",
					"extra": id
				};
				rej(ret_data);
				return self.errno;
			}
			self.__resolve_fetch(`player/${id}`, res, rej);
		});
	}

	/* IDK why I made this, I think this is only for C++ devs... */
	get_errno()
	{
		return this.errno;
	}
}

if (!!module == true)
{
	module.exports = CritterAPI;
}
