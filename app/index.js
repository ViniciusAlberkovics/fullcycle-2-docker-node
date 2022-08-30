const express = require("express")
const app = express()
const mysql = require('mysql2/promise')

const PORT = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const htmlHome = `
</p>

<p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>

<p> 
</p>

<p>- Lista de nomes cadastrada no banco de dados.</p>

<p> 
`
app.get('/', async (req,res) => {
  const conn = await mysql.createConnection(config)
  await conn.query('create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id))')
  const sql = `INSERT INTO people(name) VALUES ('vinicius')`
  await conn.query(sql)
  const [results] = await conn.query('select * from people')
  await conn.end()

  const peoples = results.map(r => {
    return `<p>${r.id} - ${r.name}</p>`
  })

  res.status(200).send(htmlHome.concat(peoples))
});

app.listen(PORT, () => console.log('running:' + PORT))