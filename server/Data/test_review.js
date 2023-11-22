import fs from 'fs';

const filmsFilePath = './fomat.json';
const usersFilePath = './Data_user/netflix.users.json';

let usersData = [];

// Đọc file JSON chứa thông tin về người dùng
try {
    const userData = fs.readFileSync(usersFilePath, 'utf8');
    usersData = JSON.parse(userData);
} catch (err) {
    console.error('Lỗi khi đọc file người dùng:', err);
    process.exit(1);
}

// Hàm để thêm một đánh giá ngẫu nhiên vào một phim
function addRandomReview(film) {
    // const randomRating = Math.floor(Math.random() * 5) + 1; // Điểm đánh giá ngẫu nhiên từ 1 đến 5
    const randomRating = Math.floor(Math.random() * 3) + 3;
    const randomUser = getRandomUser(); // Lấy ngẫu nhiên một người dùng từ dữ liệu đã đọc
    const newReview = {
        userName: randomUser.fullName,
        userImage: randomUser.image,
        rating: randomRating,
        comment: `Đánh giá ngẫu nhiên với điểm ${randomRating}`,
        userId: randomUser._id
    };

    // Kiểm tra và khởi tạo mảng reviews nếu chưa tồn tại
    film.reviews = Array.from(film.reviews || []);
    film.reviews.push(newReview);
    film.numberOfRevies++;
}

// Hàm để lấy ngẫu nhiên một người dùng từ dữ liệu người dùng
function getRandomUser() {
    const randomIndex = Math.floor(Math.random() * usersData.length);
    return usersData[randomIndex];
}

// Tính toán tỷ lệ trung bình của phim
function calculateAverageRating(film) {
    let totalRating = 0;
    film.reviews.forEach(review => {
        totalRating += review.rating;
    });

    film.rate = parseFloat((totalRating / film.numberOfRevies).toFixed(2));
}

// Hàm để xử lý dữ liệu phim
function processFilmsData(films) {
    films.forEach(film => {
        const randomNumberOfReviews = Math.floor(Math.random() * 200) + 1; // Số lượng đánh giá ngẫu nhiên từ 1 đến 100
        for (let i = 0; i < randomNumberOfReviews; i++) {
            addRandomReview(film);
        }

        calculateAverageRating(film);
    });

    return films;
}

// Chia nhỏ dữ liệu thành các phần nhỏ
function splitDataIntoChunks(data, chunkSize) {
    const chunks = [];
    let index = 0;

    while (index < data.length) {
        chunks.push(data.slice(index, index + chunkSize));
        index += chunkSize;
    }

    return chunks;
}

// Hàm chính để xử lý dữ liệu phim
function processFilms() {
    try {
        const filmsData = fs.readFileSync(filmsFilePath, 'utf8');
        const films = JSON.parse(filmsData);

        const chunkSize = 200; // Số lượng phim xử lý trong mỗi phần
        const filmChunks = splitDataIntoChunks(films, chunkSize);

        filmChunks.forEach((chunk, index) => {
            const processedFilms = processFilmsData(chunk);

            const outputFilePath = `./Data_films/films_chunk_${index}.json`;
            const jsonData = JSON.stringify(processedFilms, null, 2);

            fs.writeFileSync(outputFilePath, jsonData, 'utf8');
            console.log(`Phần dữ liệu ${index} đã được xử lý và lưu vào tệp JSON thành công: ${outputFilePath}`);
        });
    } catch (err) {
        console.error('Lỗi khi xử lý dữ liệu phim:', err);
    }
}

// Gọi hàm xử lý dữ liệu phim
processFilms();