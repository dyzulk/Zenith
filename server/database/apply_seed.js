import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = 'server/database/local.db';
const sqlPath = 'server/database/seed_master.sql';

if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}`);
    process.exit(1);
}

if (!fs.existsSync(sqlPath)) {
    console.error(`SQL file not found at ${sqlPath}`);
    process.exit(1);
}

try {
    const db = new Database(dbPath);
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Clean up comments and split
    const cleanSql = sql
        .split('\n')
        .filter(line => !line.trim().startsWith('--'))
        .join('\n');
        
    const statements = cleanSql
        .split(/;(?=\s*$)|;(?=\s*\n)/m)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    
    console.log(`Executing ${statements.length} statements...`);
    
    db.pragma('foreign_keys = OFF');
    db.transaction(() => {
        for (const statement of statements) {
            try {
                db.prepare(statement).run();
            } catch (stmtErr) {
                console.warn(`Statement failed: ${stmtErr.message}`);
                // console.warn(`Full statement: ${statement}`);
            }
        }
    })();
    
    console.log('Seed V2 applied successfully!');
    db.close();
} catch (error) {
    console.error('Error applying seed:', error);
    process.exit(1);
}
