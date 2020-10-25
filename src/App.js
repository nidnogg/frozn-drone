import React, {useEffect, useState, useRef} from 'react';
import { gsap } from "gsap";
import Drone from './Drone.js';
import Clock from './Clock.js';
import Controller from './Controller.js';
import Hentai from './Hentai.js';
import Bg from './img/bg.png';
import './css/App.css';


const App = () => {

  const [isActive, setActive] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(0);

  //const timeline = useRef(0);
  const tl = useRef(0);
  const menu = useRef(0);
  const menuHeaderDiv = useRef(0);
  const menuHeader = useRef(0);
  const verNum = useRef(0);
  const menuButton = useRef(0);
  const menuContentDiv = useRef(0);
  const blur = useRef(0);

  // value should be either 0 or 1. These callbacks are passed down to child components
  function setActiveCallback(value) {
    setActive(value);
  }

  function isActiveCallback() {
    return isActive;
  } 

  function setMenuOpenCallback(value) {
    setMenuOpen(value);
  }

  function isMenuOpenCallback() {
    return isMenuOpen;
  }
  
  useEffect(() => {
    if(!tl.current) {
      tl.current = gsap.timeline({defaults: {duration: 0.2, ease:"expo"} })
                       .to(menu.current, {duration: 0.001, zIndex: 9997, ease:"none"})
                      // .add("start", 2)
                       .to(blur.current, {bottom: "-30%", duration: 0.3777}, 0.2) //0.2 could be label start!
                       .set(blur.current, {webkitFilter:"blur(10px)"}, 0.2)
                       .to(menu.current, {opacity:"1"}, 0.4)
                       .to(menuHeaderDiv.current, {opacity:"1"})
                       .to(menuHeader.current, {opacity: "1"}, ">-0.2")
                       .to(verNum.current, {opacity: "1"}, ">-0.1")
                       .to(menuContentDiv.current, {opacity: "1"}, ">-0.2")
                       .to(menuButton.current, {opacity: "1"}, ">-0.2");
    }
  }, []); // crap requirement for using hooks with timelines

  useEffect(() => {
    isMenuOpen ? tl.current.play() : tl.current.reverse();
  }, [isMenuOpen]);  // wonder if isMenuOpen is also required for hooks

  return (
    <section className="main-section">
      <Hentai isMenuOpen={isMenuOpenCallback} setMenuOpen={setMenuOpenCallback} />
      {/*<img className="background-img" src={Bg} alt="background"></img>*/}
      <section ref={menu} className="main-menu-section">
        <div ref={menuHeaderDiv} className="main-menu-header">
            <span ref={menuHeader} className="menu-header">frozn drone</span> <span className="ver-num" ref={verNum}>v1.0</span>     
        </div>
        
        <div ref={menuContentDiv} className="main-menu-content">
          <p>
            Hey! If you like what you're hearing, <br/>
            I'm grateful! I'm relatively new and have just started posting my songs. <br/>
            I'm into rock, hip-hop and EDM. <br/>
            I am producing my first original song and am sharing my journey on <br/>
            <a href="https://www.instagram.com/TheFroznColors/">Instagram</a> (@TheFroznColors) and <a href="https://twitter.com/FroznColors">Twitter</a> (@FroznColors). <br/>
            I'd love for you to join me with my journey! Thanks a lot.
          <br/> <br/>
            sup I'm nidnogg I'm making <a href="https://nidnogg.bandcamp.com/releases">the diagonal mind.</a>
            tip tip @ <a href="https://patreon.com/nidnogg">patreon</a>
            maybe free coffee? @ <a href="https://ko-fi.com/nidnogg">ko-fi</a>   
            thanks for listening, nid. <br />
            check out nidnogg's <a href="https://soundcloud.com/nidnogg">soundcloud!</a> <br/>
            based off Docubyte's phenomenal <a href="https://www.docubyte.com/works/guide-to-computing/">Guide to Computing.</a> <br />
            cheers from #silicon-rio @ the cyber artnet's official discord channel! !
          </p>
        </div>
      </section>

      <div ref={blur} className="drone-wrapper">
        <Drone className="drone" isActive={isActiveCallback} />
          <div className="visor-panel-wrapper">
            <section className="visor">
              <Clock />
            </section>
          </div>
          <Controller isActive={isActiveCallback} setActive={setActiveCallback} 
          />
     </div>
     {/*<Tooltip />*/}
    </section>
  );
}

const Tooltip = () => {
  return (
    <div className="tooltip-container">
      <span className="tooltip">
          Now playing: <br /> songname
      </span>
    </div>
  );
}

export default App;