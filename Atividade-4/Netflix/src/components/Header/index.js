import React from 'react';
import './header.css'


export default ({black})=>{
	return(
		<header className={black ? 'black':''}>
			<div className="header--logo">
				<a href='/'>
					<img src='https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=49'/>
				</a>
			</div>
			<div className="header--user">
				<a href='/'>
					<img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'/>
				</a>
			</div>
		</header>
	)
}
