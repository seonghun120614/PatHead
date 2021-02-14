const mongoose = require('mongoose');
const { Schema } = mongoose;

// book 에서 사용할 서브다큐먼트의 스키마

// db의 가장 기초는 스키마를 탄탄히 정밀하게 설정하는 것

const Author = new Schema({
    name : String, 
    email : String
});

const Book = new Schema ({
    title : String,
    authors : [Author], //위에서 만든 Author를 배열형태로 설정
    publishedDate : Date,
    price : Number,
    tags : [String],
    createdAt : { // 기본값을 설정할땐 객체로 설정
        type : Date,
        default : Date.now //기본값은 현재 날짜.
    }
});

// mongoose.model(스키마 이름, 스키마 객체, 실제 db에 생성되는 컬렉션 이름)
module.exports = mongoose.model('Book', Book);
//스키마로 만든 Book을 이름이 Book인 모델에 적용하여 내보냄