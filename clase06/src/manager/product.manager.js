import FileManager from "./file.manager.js";
import ErrorObject from "../error.js";
export default class ProductManager extends FileManager {
    constructor() {
        super('./products.json')
    }

    create = async(data) => {
        try {
            return await this.set(data)
        } catch (error) {
            throw new ErrorObject('Error setting data', 500)
        }
    }

    list = async () => {
        try {
            return await this.get()
        } catch (error) {
            throw new ErrorObject('Error getting data:', 500);            
        }
    }
    
}
