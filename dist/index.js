import http from 'http';
const users = [];
const server = http.createServer((req, res) => {
    if (req.method = 'POST') {
        console.log('---------------')
        let data = ''
        req.on("data", (chank) => {
            data += chank.toString()
          //  console.log(data.toString());
          //  users.push()
        });
        req.on("end", () => {
            users.push(JSON.parse(data));
          //  res.writeHead(201, { 'Content-Type': 'application/json' });
        })
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end('userADD');
        // res.end(JSON.stringify(newUser));
    }
    console.log(users)
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
