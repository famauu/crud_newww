// CommonJs
const fastify = require('fastify')({
  logger: true
})

//=========================
const db = require('./connection');
//=========================

// 1. params -> nampilin detail buku (http://localhost:3000/books/100000)
fastify.get('/books/:search', async (request, reply) => {
    const books = await db.query("SELECT sku, judul from books where judul like $1", [
      `%${request.params.search}%`
      ]);
    return books;
  })

// 2. querystring -> nampilin list buku, bisa search by judul (http://localhost:3000/books?search=...)
fastify.get('/books/:idBooks', async (request, reply) => {
    const books = await db.query("select * from books where id = $1", [
      `%${request.query.search}%`
      ]);
    return books;
  })

// 3. payload (post) -> insert buku baru
fastify.post('/books/:idBooks', async (request, reply) => {
    const tambahBooks = request.body;
    const books = await db.query("INSERT INTO books (sku, judul, harga, stock) VALUES ('${addBooks.sku}','${addBooks.judul}','${addBooks.harga}','${addBooks.stock}');")
    return ("berhasil ditambahkan");
  })

// 4. payload (put) -> update buku
fastify.put('/books/:idBooks', async (request, reply) => {
    const updateBooks = request.body;
    const books = await db.query("UPDATE books SET judul = '${updateBooks.judul}' where id = $1", [
      `%${request.body.search}%`
      ]);
    return ("berhasil diupdate" + request.params.idBooks);
  })

// 5. delete (>< payload) -> hapus buku
fastify.delete('/books/:search', async (request, reply) => {
    const books = await db.query("delete from books where id = $1;", [
      `%${request.body.search}%`
      ]);
    return ("behasil dihapus" + request.params.search);
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