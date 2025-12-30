const mysql = require('mysql2/promise');
require('dotenv').config();

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    category: 'Fiction',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    featured: 1
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 14.99,
    category: 'Fiction',
    description: 'A gripping tale of injustice and childhood innocence in the American South during the Great Depression.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    featured: 1
  },
  {
    title: '1984',
    author: 'George Orwell',
    price: 13.99,
    category: 'Science Fiction',
    description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
    featured: 1
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 15.99,
    category: 'Fantasy',
    description: 'A fantasy novel about the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.',
    coverImage: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
    featured: 1
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 11.99,
    category: 'Romance',
    description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    featured: 0
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 13.49,
    category: 'Fiction',
    description: 'The story of teenage rebellion and alienation told through the eyes of Holden Caulfield.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
    featured: 0
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 18.99,
    category: 'Non-Fiction',
    description: 'A brief history of humankind that explores how Homo sapiens came to dominate the world.',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop',
    featured: 1
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 16.99,
    category: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones through tiny changes.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    featured: 1
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    price: 16.99,
    category: 'Science Fiction',
    description: 'Set in the distant future amidst a huge interstellar empire, Dune tells the story of young Paul Atreides.',
    coverImage: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=400&h=600&fit=crop',
    featured: 1
  },
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    price: 15.49,
    category: 'Self-Help',
    description: 'A guide to spiritual enlightenment and living in the present moment.',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop',
    featured: 0
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    price: 17.99,
    category: 'Biography',
    description: 'A memoir about a young woman who leaves her survivalist family and goes on to earn a PhD from Cambridge.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    featured: 0
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 19.99,
    category: 'Psychology',
    description: 'Explores the two systems that drive the way we think and make choices.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    featured: 0
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 14.49,
    category: 'Fiction',
    description: 'A philosophical book that tells the story of Santiago, an Andalusian shepherd boy who yearns to travel.',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
    featured: 0
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 21.99,
    category: 'Technology',
    description: 'A handbook of agile software craftsmanship teaching the principles of writing clean code.',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=600&fit=crop',
    featured: 0
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    price: 18.49,
    category: 'Biography',
    description: 'The memoir of the former First Lady of the United States, chronicling her life experiences.',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
    featured: 0
  }
];

async function seedDatabase() {
  let connection;
  try {
    // Create connection pool
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✓ Connected to database');

    // Create table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        coverImage VARCHAR(500),
        featured TINYINT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createTableQuery);
    console.log('✓ Books table created/verified');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM books');
    console.log('✓ Cleared existing books');

    // Insert books
    for (const book of books) {
      const insertQuery = `
        INSERT INTO books (title, author, price, category, description, coverImage, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      await connection.execute(insertQuery, [
        book.title,
        book.author,
        book.price,
        book.category,
        book.description,
        book.coverImage,
        book.featured
      ]);
    }

    console.log(`✓ Inserted ${books.length} books successfully!`);

    // Verify
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM books');
    console.log(`✓ Total books in database: ${rows[0].count}`);

  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedDatabase();
