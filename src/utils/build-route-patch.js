export function buildRoutePath(path) {
    // REGEX para capturar todo caminho com :algumacoisa
    const routeParametersRegex = /:([a-zA-Z]+)/g
    // Muda o :algumacoisa para o padrão do id unico 
    const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    //Deixando os query params como opcionais e nomendo 
    const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
  }