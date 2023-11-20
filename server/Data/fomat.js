import fs from 'fs';

const movies = './movie.json';

const jsonData = JSON.parse(fs.readFileSync(movies, 'utf8'));

const fomatmovie = jsonData.map((movie) => {
  return {
    name: movie.title,
    desc: movie.extract,
    titleImage: movie.thumbnail,
    image: movie.thumbnail,
    category: movie.genres[0],
    language: "English",
    year: "2023",
    time: 3,
    video: "https://firebasestorage.googleapis.com/v0/b/netflixweb-d850a.appspot.com/o/875dd38e-1a05-456f-a86f-89a780517e0d.mp4?alt=media",
    rate: 5,
    casts: movie.cast,
  };
});

const json = JSON.stringify(fomatmovie, null, 2);

fs.writeFile('movie_fomat.json', json, (err) => {
    if (err) {
      console.error('Lỗi khi ghi tệp JSON:', err);
      return;
    }
    console.log('Đã ghi tệp JSON thành công!');
  });