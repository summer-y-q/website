import React, { Component } from 'react';


let Home = () => {
    return (
        <div className="home-content">
            <TextContentSummary />
        </div>
    )
}


let TextContentSummary = () => {
    return (
        <div className="text-content">
            <h1>WELCOME TO</h1>
            <h2>MY CHANNEL</h2>

            <article>
                <p>I'm Summer.</p>
                {/* <p>A desiner in ShenZhen.</p>
                <p>I like to do some interesting</p>
                <p>designs in my free time</p>
                <p>Oh I also like photography and</p>
                <p>diving.</p> */}
            </article>
        </div>
    )
}




export default Home;