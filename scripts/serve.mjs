import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { root } from './validate.mjs';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'public','.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(path.join(root,'public')+path.sep)){res.writeHead(403).end();return;}const data=await readFile(file);res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404).end('Not found');}}).listen(Number(process.env.PORT||8001),'127.0.0.1',()=>console.log('VN BIKE: http://localhost:'+(process.env.PORT||8001)));
