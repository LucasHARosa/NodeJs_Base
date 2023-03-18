import http from 'http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'


// req => ReadableStream (Estou lendo de algum lugar)
// res => WritableStream (Estou enviando par aser escrito)

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })
    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)