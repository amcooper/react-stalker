module.exports = {
	client: 'pg',
	connection: process.env.DATABASE_URL || 'postgres://localhost:5432/react_stalker',
	debug: true
};
