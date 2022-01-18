import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="section-content">
          <section className="call-to-action">
            <h2>
              Have food delivered <span>right to your door!</span>
            </h2>
            <form>
              <input className="hollow" type="text" name="location" />
              <select className="filled" name="when">
                <option value="now">Now</option>
                <option value="later">Later</option>
              </select>
              <button className="filled" type="submit">
                <FontAwesomeIcon icon={faSearch} />
                <span>Find a restaurant</span>
              </button>
            </form>
          </section>
          <img
            className="hero-image"
            src="./img/hero-image.png"
            alt="image of a burger"
          />
        </div>
        <div className="scroll-indicator">
          <a href="#info">
            <FontAwesomeIcon icon={faAngleDown} />
          </a>
        </div>
      </section>
      <section id="info" className="info">
        <div className="section-content">
          <div className="article">
            <h3>Lorem, ipsum dolor.</h3>
            <div>
              <img
                className="image"
                src="https://picsum.photos/200/200?random=1"
              />
              <p className="summary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                soluta quaerat atque odio quae consequuntur. Molestiae, unde
                veniam a beatae, corrupti sapiente deleniti debitis nam atque
                excepturi aliquam voluptas accusantium aut sint?
              </p>
            </div>
          </div>
          <div className="article">
            <h3>Lorem ipsum dolor sit.</h3>
            <div>
              <img
                className="image"
                src="https://picsum.photos/200/200?random=2"
              />
              <p className="summary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                soluta quaerat atque odio quae consequuntur. Molestiae, unde
                veniam a beatae, corrupti sapiente deleniti debitis nam atque
                excepturi aliquam voluptas accusantium aut sint?
              </p>
            </div>
          </div>
          <div className="article">
            <h3>Lorem ipsum dolor sit amet.</h3>
            <div>
              <img
                className="image"
                src="https://picsum.photos/200/200?random=3"
              />
              <p className="summary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                soluta quaerat atque odio quae consequuntur. Molestiae, unde
                veniam a beatae, corrupti sapiente deleniti debitis nam atque
                excepturi aliquam voluptas accusantium aut sint?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
