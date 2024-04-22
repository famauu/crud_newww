// CommonJs
const fastify = require('fastify')({
  logger: true
})

//=========================
const db = require('./connection');
//=========================

// 1. params -> nampilin detail buku (http://localhost:3000/books/100000)
fastify.get('/books/:search', async (request, reply) => {
    const books = await db.query("select sku, judul from books where harga > 100000", [
      `%${request.params.search}%`
      ]);
    return books;
  })

// 2. querystring -> nampilin list buku, bisa search by judul (http://localhost:3000/books?search=...)
fastify.get('/books', async (request, reply) => {
    const books = await db.query("select * from books", [
      `%${request.query.search}%`
      ]);
    return books;
  })

// 3. payload (post) -> insert buku baru
fastify.post('/books', async (request, reply) => {
    const books = await db.query("INSERT INTO books (sku, judul, harga, stock) VALUES ('KUMOLO', 'Siksa Kubur', 22000, 100)", [
      `%${request.body.search}%`
      ]);
    return books;
  })

// 4. payload (put) -> update buku
fastify.put('/books', async (request, reply) => {
    const books = await db.query("update books set judul='Jerry Thomas' where book_id=$1;", [
      `%${request.body.search}%`
      ]);
    return books;
  })

// 5. delete (>< payload) -> hapus buku
fastify.delete('/books', async (request, reply) => {
    const books = await db.query("delete from books where book_id=$1;", [
      `%${request.body.search}%`
      ]);
    return books;
  })

//=========================
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()