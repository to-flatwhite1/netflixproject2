const firstContents = document.querySelectorAll(".accordion .content");
firstContents[0].style.display="block";

const titles =document.querySelectorAll(".accordion .title");
titles.forEach((title)=>{
    title.addEventListener("click",() =>{
        document.querySelectorAll(".content").forEach((item)=>{
            item.style.display = "none"; /*처음은 안보이게 선택되어진 거만 보이게 선택 안되면 안보이게*/
        });
        titles.forEach((otherTitle)=>{
            if(otherTitle !== title) otherTitle.classList.remove("active");
        });
        let content = title.nextElementSibling;
        if(title.classList.contains("active")) {
            title.classList.remove("active");
            content.style.display = "none";
        } else {
            title.classList.add("active");
            content.style.display = "block";
        }
        //nextElementSibling 현재 다음번째 형제요소
        //contains() 앞에 그 클래스가 있으면 true고 없으면 false
    });
});

//Gnb Event
const naviItems = document.querySelectorAll(".gnb > ul > li");
const menuBg = document.querySelector(".menu_bg");



naviItems.forEach((naviItem)=>{
    naviItem.addEventListener("mouseover",()=>{
        const submenus = document.querySelectorAll(".submenu");
        submenus.forEach((submenu)=>{
            submenu.style.opacity="1";
            submenu.style.maxHeight="260px";
            menuBg.style.opacity="1";
            menuBg.style.maxHeight="260px";
        });
    });
    naviItem.addEventListener("mouseout",()=>{
        const submenus = document.querySelectorAll(".submenu");
        submenus.forEach((submenu)=>{
            submenu.style.opacity="0";
            submenu.style.maxHeight="0px";
            menuBg.style.opacity="0";
            menuBg.style.maxHeight="0px";
        });
    });


});

/* modal-search event */

const searchBtn = document.querySelector(".fa-magnifying-glass");

searchBtn.addEventListener("click",()=>{

    document.querySelector(".modal-search").classList.add("active");
});

document.querySelectorAll(".close, section").forEach((item)=>{
    item.addEventListener("click",()=>{
        document.querySelector(".modal-search").classList.remove("active");
    });
});

const searchBar = document.querySelector(".search input[type='search']");

searchBar.addEventListener("focus", function() {
    this.parentElement.nextElementSibling.style.opacity="1";
});

searchBar.addEventListener("blur", function() {
    this.parentElement.nextElementSibling.style.opacity="0";
});

const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    /*console.log(e.target[0].value); 입력한 한글을 인코딩 시켜줄것임 */
    const keyword = encodeURIComponent(e.target[0].value);
    

    window.location.href = `searchResult.html?q=${keyword}`
    // %EB%B2%94%EC%A3%84 컴퓨터 언어 인코딩
    // 한글로 보이게 하는것은 디코딩
});

/* 사용자 입력한 text 값을  */


// searchBar 자체를 건드리기 위해 function(){} 함수를 사용 한다
/* 부모 form nextElementSibling form태그의 다음번째에 나오는 형제 그것은 p태그 hash-tag

nextElementSibling 나와 형제인 그 다음번째 요소를 찾아오는 것 */

/* input submit onsubmit 핸들링 주어야 함 */

/* 1)form 태그 안에 action과 input 값으로 value를 보낼수도 있고

2)스크립트에서 제어해서 value를 보낼 수 있다. */

/* slide event*/
import { API_KEY } from "./env.js";

const tmdbCommand = "https://api.themoviedb.org/3";

const fetchMovies = async () =>{
    const URL = `${tmdbCommand}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
    const response = await fetch(URL);
    const {results} = await response.json();

    /* 객체 안에있는게 배열로 있어서 변수로 가져와서 구조분해문법을 사용해서 가져온다  */
    return results; 
}   
/* 이 값을 찾아올 함수를 만든다 */

/* 개봉예정작 */
const fetchMovies1 = async () =>{
    const URL = `${tmdbCommand}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`;
    const response = await fetch(URL);
    const {results} = await response.json();

    /* 객체 안에있는게 배열로 있어서 변수로 가져와서 구조분해문법을 사용해서 가져온다  */
    return results; 
}  


const fetchMovies2 = async () =>{
    const URL = `${tmdbCommand}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`;
    const response = await fetch(URL);
    const {results} = await response.json();
   
    /* 객체 안에있는게 배열로 있어서 변수로 가져와서 구조분해문법을 사용해서 가져온다  */
    return results; 
}  

const getMovies = async () =>{
    const [movies, movies1, movies2] = await Promise.all([
        fetchMovies(),
        fetchMovies1(),
        fetchMovies2(),
    ]);

    //movie section
    /* 전역변수 */
    const ul = document.querySelector(".nowPlaying ul");
    const ul2 = document.querySelector(".upcoming ul");
    const ul3 = document.querySelector(".toprated ul");

    const movieItemcreateElement = (movie, index, category) =>{
        const {adult, id, poster_path,title,release_date,vote_average} = movie; /* 구조분해 할당문법 */
        const li = document.createElement("li");
        const moviePoster = document.createElement("div");
        const movieTitle = document.createElement("div");
        const movieDesc = document.createElement("div");
        const img = document.createElement("img");
        const ageLimit = document.createElement("span");
        const movieNum = document.createElement("span");

        const release = document.createElement("span");/* 개봉일 */
        const vote = document.createElement("span");/* 평점 */

        img.src = `https://image.tmdb.org/t/p/original/${poster_path}`;

        let adultko = adult === false ? "ALL" : "18";

        ageLimit.innerText = adultko;

        movieNum.innerText = index + 1;

        release.innerText = release_date;

        vote.innerText = `⭐${vote_average.toFixed(2)}`;

        

  

        moviePoster.className = "moviePoster";
        movieTitle.className = "movieTitle";
        movieDesc.className = "movieDesc";

        moviePoster.append(img,ageLimit,movieNum);
        movieTitle.innerText = title;
        movieDesc.append(release,vote);

        li.className = id;
        li.setAttribute("data-category",category);
        li.append(moviePoster,movieTitle,movieDesc);
        /* append 한번 여러개 자식 요소 가지고 올 수 있음 */

        if(category === "nowPlaying") ul.appendChild(li);  /* appendchild 한번 한번자식 요소 가지고 올 수 있음 */
        else if (category === "upcoming") ul2.appendChild(li);
        else if (category === "toprated") ul3.appendChild(li);
    }


    movies.forEach((movie, index)=>{
        movieItemcreateElement(movie, index,"nowPlaying");
    });

    movies1.forEach((movie, index)=>{
        movieItemcreateElement(movie, index,"upcoming");
    });

    movies2.forEach((movie, index)=>{
        movieItemcreateElement(movie, index,"toprated");
    });

    /* movieslideer  event*/
    const initializeSlider = (sliderSelector, leftArrowSelector,rightArrowSelector)=>{
        const slider = document.querySelector(sliderSelector);
        const slides = slider.querySelectorAll("li");
        console.log(slides);
        const slideToShow = 5;
        const slideWidth =160;
        const slideMargin = 25;
        let currentIndex = 0;
        let isTransitioning = false;

        /* 클론노드 앞뒤로 5개씩만 복제 할것이다 */
        const clondeCount = slideToShow;
        const firstClones = slides
            .slice(0, clondeCount)
            .map((slide) => slide.cloneNode(true));

        const lastClones = slides
            .slice(-clondeCount)
            .map((slide) => slide.cloneNode(true));

        slider.append(...firstClones);/*append 뒤에 붙는다  */
        slider.prepend(...lastClones);
        /* prepend() 앞에 붙는다 */

        const updateSlider = () => {
            const offset =
                -(slideWidth + slideMargin) * (currentIndex)
        }

    };
    initializeSlider(
        ".nowPlaying ul",
        "#nowPlayingLeftArrow",
         "#nowPlayingRightArrow"
    );/* 첫번째 초기화 */

    initializeSlider(
        ".upcoming ul",
        "#upcomingLeftArrow",
        "#upcomingRightArrow"
    );

    initializeSlider(
        ".toprated ul",
        "#topratedLeftArrow",
        "#topratedRightArrow"
    );



    //mainslider evnet
    const mainSlider = document.querySelector(".mainSlider");
    movies.forEach((movie)=>{
        const figure = document.createElement("figure");
        figure.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path
        }" alt="${movie.title}"/>`;
        mainSlider.appendChild(figure);
    });

    const figures = mainSlider.querySelectorAll("figure");
 
    let currentIndex = 0;

    const showNextSlide = () =>{
        
        figures[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % figures.length;
        figures[currentIndex].classList.add("active");
        
    }

    figures[currentIndex].classList.add("active");
    setInterval(showNextSlide,3000);


};

getMovies();
/* await 예약어 부모요소에 async 있어야 사용 가능 */

/* const URL = `${tmdbCommand}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
fetch(URL)
    .then((response) => response.json())
    .then((data) => console.log(data)); */

/* JSON함수를 써야 객체 변환 가능 // then함수는 data라는 참조변수를 찾아온다 */

/* 자료구조,알고리즘  */







