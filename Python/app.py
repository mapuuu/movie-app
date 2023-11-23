from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import pymongo
from bson import ObjectId
from sklearn.metrics.pairwise import cosine_similarity
import json

app = Flask(__name__)

CORS(app, supports_credentials=True, origins='http://localhost:3000')

app.config['CORS_HEADERS'] = 'Content-Type'

##CLOUD
#mongo_connection_string = "mongodb+srv://commerce:commerce@cluster0.lygmgn5.mongodb.net/netflix?retryWrites=true&w=majority"

##LOCAL
mongo_connection_string = "mongodb://localhost:27017/"

# Kết nối với MongoDB Atlas
client = pymongo.MongoClient(mongo_connection_string)
database = client["netflix"]
movies = pd.DataFrame(list(database["movies"].find()))
movies.sort_values('rate', inplace=True)
popular_movies = movies[movies['numberOfRevies'] >= 150]
final_df = movies[movies['_id'].isin(popular_movies['_id'])]
pt = final_df.pivot_table(index='_id', columns='category', values='numberOfRevies')
print(pt.index)
pt.replace(np.nan, 0, inplace=True)
similarity = cosine_similarity(pt)
def get_top_rated_movies(movie_id):
    movies = pd.DataFrame(list(database["movies"].find()))
    if ObjectId(movie_id) not in movies['_id'].unique():
        print(f"Movie ID {ObjectId(movie_id)} không tồn tại trong danh sách sản phẩm.")
        return None
    target_movie = movies[movies['_id'] == ObjectId(movie_id)]
    target_category = target_movie['category'].iloc[0]
    filtered_movies = movies[(movies['category'] == target_category) & (movies['numberOfRevies'] > 100)]
    filtered_movies = filtered_movies[filtered_movies['_id'] != movie_id]
    top_rated_movies = filtered_movies.sort_values('rate', ascending=False)
    top_10_rated_movies = top_rated_movies.head(10)
    return top_10_rated_movies


#  kiểm tra xem item có phải là sản phẩm phổ biến hay không, nếu phải thì tính toán xem độ tương đồng là bn
#  x[1] là giá trị tương đồng chạy từ -1;1
#  danh sách recommend sẽ trả về các sp có độ tương đồng cao nhất từ trên xuống dưới , cho dù là sp phổ biến nhưng chưa chắc
#  tương đồng
#  có trường hợp chẳng đưa ra được recommend vì sp không có độ tương đồng
def recommedation_system(item):
    recommended_movies_list = []
    if ObjectId(item) in pt.index:
        index = np.where(pt.index == ObjectId(item))[0][0]
        similarity_movies = sorted(list(enumerate(similarity[index])), key=lambda x: x[1], reverse=True)[1:11]
        category_of_item = movies.loc[movies['_id'] == ObjectId(item), 'category'].values[0]
        for i in similarity_movies:
            movie_ID = pt.index[i[0]]
            if movie_ID != ObjectId(item):
                movie_info = movies.loc[movies['_id'] == movie_ID]
                if len(movie_info) > 0:
                    category_of_movie = movie_info['category'].values[0]
                    if category_of_movie == category_of_item:
                        movie_entry= {
                            "_id": str(movie_info['_id'].values[0]),
                            "category": movie_info['category'].values[0],
                            "name": movie_info['name'].values[0],
                            "desc": movie_info['desc'].values[0],
                            "rate": float(movie_info['rate'].values[0]),
                            "image": movie_info['image'].values[0],
                            "numberOfRevies": int(movie_info['numberOfRevies'].values[0])
                        }
                        if movie_entry not in recommended_movies_list:
                            recommended_movies_list.append(movie_entry)
                        # recommended_movies_list = json.dumps(recommended_movies_list, indent=4)
    if len(recommended_movies_list) < 10:
        top_rated_movies = get_top_rated_movies(ObjectId(item)).head(10 - len(recommended_movies_list))
        top_rated_movies_list = top_rated_movies[
            ['_id', 'category', 'name', 'desc', 'rate', 'image', 'numberOfRevies']].to_dict(orient='records')
        for movie in top_rated_movies_list:
            movie_entry = {
                "_id": str(movie["_id"]),
                "category": movie["category"],
                "name": movie["name"],
                "desc": movie["desc"],
                "rate": float(movie["rate"]),
                "image": movie["image"],
                "numberOfRevies": int(movie["numberOfRevies"]),
            }
            if movie_entry not in recommended_movies_list:
                recommended_movies_list.append(movie_entry)
    if len(recommended_movies_list) < 10:
        movie_info = movies.loc[movies['_id'] == ObjectId(item)]
        if not movie_info.empty:
            category = movie_info['category'].values[0]
            category_movie = movies.loc[(movies['category'] == category) & (movies['_id'] != ObjectId(item))]
            category_movie = category_movie.head(10 - len(recommended_movies_list))
            for _, movie in category_movie.iterrows():
                movie_entry={
                    "_id": str(movie['_id']),
                    "category": movie['category'],
                    "name": movie['name'],
                    "desc": movie['desc'],
                    "rate": float(movie['rate']),
                    "image": movie['image'],
                    "numberOfRevies": int(movie['numberOfRevies']),
                }
                if movie_entry not in recommended_movies_list:
                    recommended_movies_list.append(movie_entry)
    recommended_movies_list = json.dumps(recommended_movies_list, indent=4)
    print(recommended_movies_list)
    return recommended_movies_list

@app.route('/')
def home():
    return "Welcome to API Server predict image!!!"

@app.route('/receive', methods=['POST', 'GET', 'PUT'])
def receive():
    if request.method == 'POST':
        data = request.json.get("obj_id")
        print(data)
        file_data = recommedation_system(data)
        return file_data
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)