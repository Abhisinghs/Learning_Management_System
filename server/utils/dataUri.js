import DataURIParser from 'datauri/parser.js'
import path from 'path';

const getDatauri = (file) =>{
    const parser = new DataURIParser();
    const extName= path.extName(file.originalName).toString();
    console.log(extName);

    return parser.format(extName,file.content)
}