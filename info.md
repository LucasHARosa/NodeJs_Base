
## Métodos HTTP
Aula (rotas de criação de listagem)

* GET => Buscar um recurso do back-end
* POST => Criar um recurso no back-end
* PUT => Atualizar um recurso no back-end
* PATCH => Atualizar uma informação específica de um recurso no back-end
* DELETE => Deletar um recurso do back-end


## Headers
Aula (salvando usuários em memória) - Nessa aula prática vamos entender o conceito de statefull para podermos adicionar usuários na memória da aplicação. 
Para passar as informações do cliente para o server o formato deve ser JSON

Os Headers da rota são importantes e são criados da seguinte forma

```js
// Exemplo da rota POST
return res.writeHead(201).end()
```

## Streams no NODE

```js
// A cada um segundo um numero de 1 a 100 é lido(_read) transformado em negativo (_transform) e escrito multiplicado por 10 (_write)
import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++
        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000);
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
      const transformed = Number(chunk.toString()) * -1
  
      callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}
    
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
```

## Recebendo uma informação completa (JSON)

```js
async function json(req, res) {
    const buffers = []
    // Espera a informação chegar completa  
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    // A informação chega em buffer basta transformar para JSON
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
}

```

## Rotas de Aplicação

Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios:

* http://localhost:3333/users?userId=1&name=Diego
 
Route Parameters: Identificação de recurso:

* GET http://localhost:3333/users/1
* DELETE http://localhost:3333/users/1
 
Request Body: Envio de informações de um formulário (HTTPs)

* POST http://localhost:3333/users



