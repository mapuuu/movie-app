import fs from 'fs'

const genres = [
  "Action",
  "Adventure",
  "Animated",
  "Biography",
  "Comedy",
  "Crime",
  "Dance",
  "Disaster",
  "Documentary",
  "Drama",
  "Erotic",
  "Family",
  "Fantasy",
  "Found Footage",
  "Historical",
  "Horror",
  "Independent",
  "Legal",
  "Live Action",
  "Martial Arts",
  "Musical",
  "Mystery",
  "Noir",
  "Performance",
  "Political",
  "Romance",
  "Satire",
  "Science Fiction",
  "Short",
  "Silent",
  "Slasher",
  "Sports",
  "Spy",
  "Superhero",
  "Supernatural",
  "Suspense",
  "Teen",
  "Thriller",
  "War",
  "Western"
];

const genresWithTitles = genres.map((genre) => {
  return {
    title: genre,
  };
});

const jsonData = JSON.stringify(genresWithTitles, null, 2);

fs.writeFile('genres.json', jsonData, (err) => {
  if (err) {
    console.error('Lỗi khi ghi tệp JSON:', err);
    return;
  }
  console.log('Đã ghi tệp JSON thành công!');
});