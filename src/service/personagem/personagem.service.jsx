export class PersonagemService {
    setString(key, value) {
        localStorage.setItem(key, value)
    }

    setObject(key, obj) {
        const objString = JSON.stringify(obj)

        localStorage.setItem(key, objString)
    }

    getString(key) {
        return localStorage.getItem(key)
    }

    getObject(key) {
        const json = localStorage.getItem(key)
        if (json) {
            return JSON.parse(json)
        } else {
            return null
        }
    }
}