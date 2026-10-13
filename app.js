import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
};

function getRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = '';
        request.on('data', chunk => body += chunk.toString());
        request.on('end', () => {
            try { resolve(body ? JSON.parse(body) : {}); }
            catch (e) { reject(e); }
        });
    });
}

function serveStaticFile(response, file) {
    fs.readFile(file, (err, data) => {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end('404 - Página Não Encontrada');
        }
        const ext = path.extname(file).toLowerCase();
        response.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
        response.end(data);
    });
}

async function callback(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    const method = request.method;

    if (pathname.startsWith('/api/contatos')) {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        const id = url.searchParams.get('id');

        // CREATE
        if (method === 'POST') {
            try {
                const data = await getRequestBody(request);
                const sql = `INSERT INTO contatos (nome, email, telefone, data_nascimento, cep, logradouro, numero, complemento, bairro, cidade, estado)
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                
                db.run(sql, [
                    data.nome, data.email, data.telefone, data.data_nascimento,
                    data.cep, data.logradouro, data.numero, data.complemento,
                    data.bairro, data.cidade, data.estado
                ], function(err) {
                    if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                    response.writeHead(201).end(JSON.stringify({ id: this.lastID, message: 'Contato salvo com sucesso!' }));
                });
            } catch (err) {
                response.writeHead(400).end(JSON.stringify({ error: 'Erro no payload enviado.' }));
            }
            return;
        }

        // READ
        if (method === 'GET') {
            if (id) {
                db.get(`SELECT * FROM contatos WHERE id = ?`, [id], (err, row) => {
                    if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                    response.writeHead(200).end(JSON.stringify(row || {}));
                });
            } else {
                db.all(`SELECT * FROM contatos`, [], (err, rows) => {
                    if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                    response.writeHead(200).end(JSON.stringify(rows));
                });
            }
            return;
        }

        // UPDATE
        if (method === 'PUT' && id) {
            const data = await getRequestBody(request);
            const sql = `
                UPDATE contatos
                SET nome = ?, email = ?, telefone = ?, data_nascimento = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?
                WHERE id = ?
            `;

            const params = [
                data.nome, data.email, data.telefone, data.data_nascimento,
                data.cep, data.logradouro, data.numero, data.complemento,
                data.bairro, data.cidade, data.estado, id
            ];

            db.run(sql, params, function(err) {
                if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                response.writeHead(200).end(JSON.stringify({ message: 'Contato atualizado com sucesso!' }));
            });
            return;
        }

        // DELETE
        if (method === 'DELETE' && id) {
            db.run(`DELETE FROM contatos WHERE id = ?`, [id], function(err) {
                if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                response.writeHead(200).end(JSON.stringify({ message: 'Contato removido com sucesso!' }));
            });
            return;
        }
    }

    let file = path.join(publicDir, pathname === '/' ? 'index.html' : pathname);
    if (!file.startsWith(publicDir)) {
        response.writeHead(403).end('Proibido');
        return;
    }

    serveStaticFile(response, file);
}

const server = http.createServer(callback);
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Agenda de Contatos iniciada em http://localhost:${PORT}/`);
});

//
//npm install -y
//npm install sqlite3