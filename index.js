// CommonJs
const fastify = require('fastify')({
  logger: true
})

//=========================
const db = require('./connection');
//=========================

// 1. params -> nampilin list buku, bisa search by judul (http://localhost:3000/books?search=...)
fastify.get('/books/:search', async (request, reply) => {
    const books = await db.query("SELECT sku, judul FROM books WHERE sku LIKE $1", [
      `%${request.params.search}%`
      ]);
    return books;
  })

// 2. querystring -> nampilin detail buku (http://localhost:3000/books)
fastify.get('/books', async (request, reply) => {
    const books = await db.query("SELECT * FROM books WHERE sku = $1", [
      `%${request.query.search}%`
      ]);
    return books;
  })

// 3. payload (post) -> insert buku baru
fastify.post('/books/:idBooks', async (request, reply) => {
    const addBooks = request.body;
    const books = await db.query("INSERT INTO books (sku, judul, harga, stock) VALUES ('${addBooks.sku}','${addBooks.judul}','${addBooks.harga}','${addBooks.stock}');")
    return ("berhasil ditambahkan");
  })

// 4. payload (put) -> update buku
fastify.put('/books/:idBooks', async (request, reply) => {
    const updateBooks = request.body;
    const books = await db.query("UPDATE books SET judul = '${updateBooks.judul}' WHERE judul = $1", [
      `%${request.body.search}%`
      ]);
    return ("berhasil diupdate" + request.params.search);
  })

// 5. delete (>< payload) -> hapus buku
fastify.delete('/books/:search', async (request, reply) => {
    const books = await db.query("DELETE books WHERE sku = $1", [
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