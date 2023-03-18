// Streams

// class OneToHundredStream extends Readable - é uma stream de leitura

import { Readable, Writable, Transform } from 'node:stream'

// Serve para ler uma informação
// extends Readable - tem como método obrigatório "_read()"
class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++
    
    // Readable Streams / Writable Streams
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


// Serve para transformar uma informação
// extends Transform - tem como método obrigatório "_transform(chunk, encoding, callback)"
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
      const transformed = Number(chunk.toString()) * -1
  
      callback(null, Buffer.from(String(transformed)))
    }
}


// Serve para escrever uma informação
// extends Writable - tem como método obrigatório "_write(chunk, encoding, callback)"
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}
    
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())