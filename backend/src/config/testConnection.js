const db = require('./db');

async function testConnection() {
  try {
    // Try to make a simple query
    const [result] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connection successful!');
    console.log('Test query result:', result[0].result);
    
    // Test if we can access our database
    const [tables] = await db.query('SHOW TABLES');
    console.log('\nAvailable tables in database:');
    tables.forEach(table => {
      console.log(`- ${Object.values(table)[0]}`);
    });

  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error details:', error.message);
  } finally {
    // Close the connection pool
    process.exit();
  }
}

testConnection(); 