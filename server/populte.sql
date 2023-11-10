DROP TABLE IF EXISTS media CASCADE;

CREATE TABLE media(
    id serial PRIMARY KEY,
    medium_type varchar(200) NOT null);

INSERT INTO media(medium_type)
    VALUES 
    ('Movie / Film'),
    ('Book'),
    ('Music');

    select * from media;

DROP TABLE IF EXISTS recommendations CASCADE;    

CREATE TABLE recommendations (
    rec_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    recommender VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    medium VARCHAR(255) NOT NULL,
    medium_url VARCHAR(255) NOT NULL,
);


INSERT INTO recommendations (user_id, recommender, title, medium, medium_url)
VALUES
    (1, 'Sama', 'Frozen', 'Movie', 'https://m.media-amazon.com/images/M/MV5BOWQ1NjNiZTEtYzc3Zi00Nzk4LTg5MTYtNzc5NmJjYTg1MGQ4XkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg'),
    (1, 'Sama', 'Brave', 'Movie', 'https://lumiere-a.akamaihd.net/v1/images/p_brave_20488_9e833e2b.jpeg'),
    (2, 'Anna', 'Harry Potter and the Order of the Phoenix', 'Movie', 'https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg'),
    (3, 'John', 'LIZZIE', 'Movie', 'https://m.media-amazon.com/images/M/MV5BMTEyNTQ0NzQ3ODVeQTJeQWpwZ15BbWU3MDE2MzU2MTg@._V1_.jpg'),
    (4, 'Ali', 'Mr Bean The Pickpocket!', 'Movie', 'https://www.themoviedb.org/t/p/w500/pUNQV35kDaKuejnXGNiUeEBurNE.jpg'),
    (5, 'Akmal', 'LAST SUN OF THE NIGHT', 'Movie', 'https://m.media-amazon.com/images/I/81w+oTheMVL._AC_UF1000,1000_QL80_.jpg'),
    (6, 'Anu', 'Not Broken', 'Movie', 'https://m.media-amazon.com/images/M/MV5BN2U3ZmJlZjYtZTU5Zi00YzgwLWJkMjAtNjk4NmFiM2M3N2ZiXkEyXkFqcGdeQXVyMTMxNDMyODAy._V1_FMjpg_UX1000_.jpg'),
    (7, 'Joey', 'Good Will Hunting', 'Movie', 'https://www.miramax.com/assets/726_GoodWillHunting_Catalog_Poster-BB_v2_Approved.png'),
    (8, 'Jim', 'Dead Man Running', 'Book', 'https://m.media-amazon.com/images/M/MV5BMTM2NTkyNzkzNF5BMl5BanBnXkFtZTcwODAwNDE5Mg@@._V1_.jpg'), 
    (9, 'Saliha', 'The Holy Quran or Koran', 'Book', 'https://m.media-amazon.com/images/I/913xnc84K9L._SL1500_.jpg'),
    (10, 'Jan', 'Cleopatra’s Needle: Maelstrom', 'Book', 'https://m.media-amazon.com/images/I/51WfJJi6l-L.jpg'),
    (11, 'Naeem', 'Don''t Push the Button!', 'Book', 'https://img1.od-cdn.com/ImageType-100/0174-1/%7BD3F8267F-F5BC-44E0-8F17-4CEC1F4EAC63%7DImg100.jpg'),
    (12, 'Harry', 'Climbing Bubbles: How To Increase Your "Creative IQ"', 'Book', 'https://m.media-amazon.com/images/I/41OO8jc0dsL.jpg'),
    (13, 'Sam', 'What A Smile Can Hide', 'Book', 'https://m.media-amazon.com/images/I/71UdurcDK0L._AC_UF1000,1000_QL80_.jpg'),
    (14, 'David', 'Maher Zain - Guide Me All The Way', 'Music', 'https://i.ytimg.com/vi/MXnRWnVJWGI/maxresdefault.jpg'),
    (15, 'Liza', 'Miley Cyrus - Flowers (Lyrics)', 'Music', 'https://cdn11.bigcommerce.com/s-n6h3dlxzq9/images/stencil/640w/products/91686/536786/SLPTSCRPTSNFLOC95__54083.1665519574.jpg?c=2'),
    (16, 'Laxmi', 'Baby Dance - Scooby Doo Pa Pa (Music Video 4k HD)', 'Music', 'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/86/20/ab/8620abd1-8716-5fd0-c0ed-942594d7bfcd/0617465961656.png/1200x1200bb.jpg'),
    (17, 'Jolly', 'Best songs that make you dance 2023📀 Dance playlist ~ Songs to sing & dance', 'Music', 'https://i.ytimg.com/vi/d_PRgzwdNy0/maxresdefault.jpg'),
    (18, 'Katie', 'Zara Larsson - End Of Time', 'Music', 'https://m.media-amazon.com/images/I/51TkntsRJcL._UXNaN_FMjpg_QL85_.jpg'),
    (1, 'Sama', 'Maher Zain - Insha Allah', 'Music', 'https://i.ytimg.com/vi/KfXIF2Mm2Kc/maxresdefault.jpg');


    select * from recommendations;  


    create table recommendation_moods (
      rec_mood_id SERIAL PRIMARY KEY,
      rec_id INT REFERENCES recommendations(rec_id),
      mood_id INT REFERENCES moods(mood_id)
    );


    INSERT INTO recommendation_moods (rec_id, mood_id)
VALUES
    ('1', '9'),
    ('1', '10'),
    ('2', '10'),
    ('2', '3'),
    ('3', '4'),
    ('3', '7'),
    ('3', '11'),
    ('4', '12'),
    ('4', '15'),
    ('4', '2'),
    ('5', '13'),
    ('6', '1'),
    ('7', '14'),
    ('8', '6'),
    ('9', '12'),
    ('10', '8'),
    ('11', '1'),
    ('11', '12'),
    ('12', '13'),
    ('13', '6'),
    ('14', '5'),
    ('15', '17'),
    ('16', '20'),
    ('17', '13'),
    ('18', '19'),
    ('19', '18'),
    ('20', '17');


DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
);


INSERT INTO users (username)
VALUES 
('Sama'), 
('Anna'), 
('John'), 
('Ali'), 
('Akmal'), 
('Anu'), 
('Joey'), 
('Jim'), 
('Saliha'), 
('Jan'), 
('Naeem'), 
('Sam'), 
('Harry'), 
('David'), 
('Liza'), 
('Laxmi'),
('Jolly'), 
('Katia');

select * from users;


DROP TABLE IF EXISTS moods CASCADE;

CREATE TABLE moods (
    mood_id SERIAL PRIMARY KEY,
    mood_name VARCHAR(50) NOT NULL
);

INSERT INTO moods (mood_name)
VALUES 
    ('Science Fiction'),
    ('Thriller drama'),
    ('Comedy drama'),  
    ('Action drama'),
    ('Horror drama'),
    ('Thoughtful'),
    ('Adventure'),
    ('Prophecy'), 
    ('Magical'),
    ('Animated'),  
    ('Romantic'), 
    ('Horror'), 
    ('Comedy'), 
    ('Drama'), 
    ('Mystery'),
    ('Action'),
    ('Nasheed'),   
    ('Romantic'), 
    ('Party'),
    ('Sad');

    select * from moods;

