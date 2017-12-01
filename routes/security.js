/** Extracts the username and password passed in the HTTP request.
* @param {Object} request The request object sent by the client.
* @returns {Object} An object with the supplied username and password.
* @throws {Error} if the username and/or password are missing.
*/
exports.getCredentials = (request) => {
	if (request.authorization === undefined || request.authorization.basic === undefined)
		throw new Error('authorization header missing')
	const auth = request.authorization.basic

	if (auth.username === undefined || auth.password === undefined)
		throw new Error('missing username and/or password')
	return {username: auth.username, password: auth.password}
} 