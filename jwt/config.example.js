module.exports = {
	port: 8000,
	dbConnectionString: 'connection_string',
	saltRounds: 2,
	jwtSecret: 'secret',
	tokenExpireTime: '6h'
}
//don't store this file in repository, it's unsecure
