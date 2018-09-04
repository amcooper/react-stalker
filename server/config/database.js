module.exports = {
	client: 'pg',
	connection: process.env.DATABASE_URL || 'postgres://localhost:5432/react_stalker',
	// connection: {
	// 	host: '127.0.0.1',
	// 	user: 'adamcooper',
	// 	database: 'react_stalker'
	// },
	debug: true
};
