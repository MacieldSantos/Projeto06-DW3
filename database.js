import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao abrir o DB: ", err.message);
    } else {
        console.log("Conectado ao DB SQLITE da Agenda de Contatos.");
        db.run(`CREATE TABLE IF NOT EXISTS contatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT, 
            email TEXT, 
            telefone TEXT,
            data_nascimento TEXT,
            cep TEXT, 
            logradouro TEXT, 
            numero TEXT,
            complemento TEXT, 
            bairro TEXT, 
            cidade TEXT, 
            estado TEXT  
        )`);
    }
});

export default db;