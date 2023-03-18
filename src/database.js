import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    // Lê o banco de dados, caso não exista ele cria
    constructor() {
        fs.readFile(databasePath, 'utf8')
          .then(data => {
            this.#database = JSON.parse(data)
          })
          .catch(() => {
            this.#persist()
          })
      }
    
    // Cria o arquivo do banco de dados
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
    
    // Retorna os dados salvos
    select(table) {
        const data = this.#database[table] ?? []
    
        return data
    }
    
    // Insere novos dados no arquivo
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()
        return data
    }
}