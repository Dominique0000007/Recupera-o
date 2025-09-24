import React, { useEffect, useState } from 'react'

import './App.css';
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {

		//pegando a lista total
		let list = await Tmdb.getHomeList();
		// console.log(list)
		setMovieList(list);


		// pegando o filme em Featured
		let originals = list.filter(i=>i.slug==='originals');
		let randomChose =  Math.floor(Math.random()*(originals[0].items.results.length))

		let chose =originals[0].items.results[randomChose]
		//   console.log(chose)
		let choseInfo =  await Tmdb.getMovieInfo(chose.id, 'tv')
		console.log(choseInfo)

		setFeturedData(choseInfo);

       

    }
    loadAll();
  }, []);

  useEffect(()=>{
	const scrollListener = ()=>{
		if(window.scrollY > 10){
			setBlackHeader(true)
			
		}else{
			setBlackHeader(false)
			
		}
	}
	window.addEventListener('scroll', scrollListener);

	return ()=>{
		window.removeEventListener('scroll', scrollListener);
	}
  },[])


  return (
    <div className="page">

		<Header black={blackHeader}/>

		{featuredData &&  <FeaturedMovie item={featuredData}/>}

		<section className='lists'>
			{movieList.map((item, key) => {
				return (
				<MovieRow key={key} title={item.title} items={item.items} />
				)
			})}
		</section>

		<Footer/>
		{movieList.length <= 0  && 
			<div className='loading'>
				<img src='http://cdn.lowgif.com/full/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif'/>
			</div>
		}
				
	</div>
  );
}

export default App;
