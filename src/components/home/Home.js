import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./Home.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "./Card";

import Home_Svg from "../../images/home/Home.gif";

import Bubbles from "../bubbles/Bubbles";

import Fade from "react-reveal/Fade";

import upcoming from "./upcoming";

import { scrollToTop } from "../footer/ScrollToTop";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      memberCounter("members", 1680);
      attendeeCounter("attendees", 4205);
      numCounter("organizers", 25, 200);
      numCounter("eventsandworkshops", 45, 100);
    }, 1000);
  }, []);

  const memberCounter = (tagId, maxCount) => {
    var initialNumber = 1000;
    setInterval(() => {
      if (initialNumber < maxCount) {
        initialNumber++;
        const tagid = document.getElementById(tagId);
        if (tagid) tagid.innerText = initialNumber;
      }
    }, 1);
  };

  const attendeeCounter = (tagId, maxCount) => {
    var initialNumber = 3500;
    setInterval(() => {
      if (initialNumber < maxCount) {
        initialNumber++;
        const tagid = document.getElementById(tagId);
        if (tagid) tagid.innerText = initialNumber;
      }
    }, 1);
  };

  const numCounter = (tagId, maxCount, speed) => {
    var initialNumber = 0;
    setInterval(() => {
      if (initialNumber < maxCount) {
        initialNumber++;
        const tagid = document.getElementById(tagId);
        if (tagid) tagid.innerText = initialNumber;
      }
    }, speed);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  let upcoming_events = [];

  const curr_date = new Date();

  upcoming.forEach((event) => {
    const event_date = new Date(event.date);
    if (event_date.getTime() + 18060000 > curr_date.getTime())
      // 157237218
      upcoming_events.push(event);
  });

  const noUpcomingEvents =
    "There are no upcoming events at the moment. Please check again soon.";

  const upcoming_events_map = upcoming_events.map((event) => (
    <Card key={event.id} event={event} />
  ));

  const [eventSlider, setEventSlider] = useState(
    window.screen.width < 800 ? (
      <Slider {...settings}>
        {upcoming_events_map.length === 0 ? (
          <Fade up>
            <h5 className="text-center">{noUpcomingEvents}</h5>
          </Fade>
        ) : (
          upcoming_events_map
        )}
      </Slider>
    ) : upcoming_events_map.length === 0 ? (
      <Fade up>
        <h5 className="text-center">{noUpcomingEvents}</h5>
      </Fade>
    ) : (
      upcoming_events_map
    )
  );

  const responsive = (media) => {
    if (media.matches) {
      setEventSlider(
        <Slider {...settings}>
          {upcoming_events_map.length === 0 ? (
            <Fade up>
              <h5 className="text-center">{noUpcomingEvents}</h5>
            </Fade>
          ) : (
            upcoming_events_map
          )}
        </Slider>
      );
    } else {
      setEventSlider(
        upcoming_events_map.length === 0 ? (
          <Fade up>
            <h5 className="text-center">{noUpcomingEvents}</h5>
          </Fade>
        ) : (
          upcoming_events_map
        )
      );
    }
  };

  const media = window.matchMedia("(max-width: 800px)");
  media.addEventListener("change", responsive);
  window.onload = () => responsive(media);

  return (
    <div className="container-fluid home">
      <div className="contents">
        <div className="row">
          <div
            className="column home-svg mt-lg-4"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-anchor=".example-selector"
            data-aos-anchor-placement="top-center"
          >
            <img className="cursor-pointer" src={Home_Svg} alt="Home_Svg" />
          </div>
          <div
            className="column"
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-anchor=".example-selector"
            data-aos-anchor-placement="top-center"
          >
            <div className="heading-text">
              <div className="text-center">
                <h2 className="animate-character">Google Developer Groups</h2>
              </div>
            </div>

            <p className="member-description">
              If you love to code and develop, you are welcome to the world of
              Google Developer Technologies! GDG provides you a platform to
              enhance your technical skills through our free hands-on workshops,
              study-jams and project building activities. We work together as a
              team to build inspiring solutions to solve real-world problems.
              Not only this, top performers also get a chance to win schwags and
              goodies! Join us and let’s begin this journey of learning and
              growing together as a community!
            </p>
            <ul className="p-0">
              <li className="content-item">
                <button className="other-btns">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="other-btns-link"
                    href="https://gdsc.community.dev/aissms-institute-of-information-technology-pune/"
                  >
                    Be a Member
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Fade up>
          <div className="container d-flex align-items-center justify-content-center mt-5">
            <div className="all-divs mt-lg-5">
              <h1 className="text-center home-headings mt-lg-5">
                Upcoming Events And Workshops
              </h1>
            </div>
          </div>
        </Fade>

        <Fade up>
          <div className="container events mt-2 mt-lg-5">{eventSlider}</div>
        </Fade>

        <div className="btn-section">
          <button className="other-btns">
            <NavLink
              className="other-btns-link"
              onClick={scrollToTop}
              to="/events"
            >
              Check Out All Events
            </NavLink>
          </button>
        </div>

        <div className="container text-center mb-5">
          <NavLink onClick={scrollToTop} to="/events/idea/popup/">
            <span className="cta button">
              <span>Submit Event Idea</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </span>
          </NavLink>
        </div>

        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        <Fade up>
          <section id="counts" className="counts">
            <div className="container">
              <div className="row counters">
                <div className="col-lg-3 col-6 text-center">
                  <span id="members">0</span>
                  <p>Members</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                  <span id="attendees">0</span>
                  <p>Attendees</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                  <span id="organizers">0</span>
                  <p>Organizers</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                  <span id="eventsandworkshops">0</span>
                  <p>Events and Workshops</p>
                </div>
              </div>
            </div>
          </section>
        </Fade>

        <div className="container gdsc-revolve">
          <Fade up>
            <h1 className="text-center about-home-headings home-headings mt-lg-0 mt-5">
              GDG Revolves Around
            </h1>
          </Fade>

          <div className="row stacks pl-lg-5 pr-lg-5 ml-lg-5 mr-lg-5">
            <Fade up>
              <div className="col-lg-4 col-sm-12 stack-name">
                <span className="-button ml-domain">Machine Learning</span>
              </div>
            </Fade>
            <Fade up>
              <div className="col-lg-4 col-sm-12 stack-name">
                <span className="-button web-domain">Web Development</span>
              </div>
            </Fade>
            <Fade up>
              <div className="col-lg-4 col-sm-12 stack-name">
                <span className="-button android-domain">
                  Android Development
                </span>
              </div>
            </Fade>
          </div>

          <div className="row stacks pl-lg-5 pr-lg-5 ml-lg-5 mr-lg-5">
            <Fade up>
              <div className="col-lg-4 col-sm-12 stack-name">
                <span className="-button ai-domain">
                  Artificial Intelligence
                </span>
              </div>
            </Fade>
            <Fade up>
              <div className="col-lg-4 col-sm-12 stack-name">
                <span className="-button dsacp-domain">Design ‎ㅤ</span>
              </div>
            </Fade>
            <Fade up>
              <div className="col-lg-4 col-sm-12 stack-name">
                <span className="-button cloud-domain">Cloud Computing</span>
              </div>
            </Fade>
          </div>
        </div>

        <Fade up>
          <div className="container d-flex align-items-center justify-content-center mt-lg-5 mt-sm-4">
            <div className="all-divs text-center mt-lg-5">
              <Fade up>
                <h1 className="text-center team-home-headings home-headings mt-lg-0">
                  Meet The GDG Lead
                </h1>
              </Fade>

              <Fade up>
                <div id="gdsc_lead" className="row">
                  <div className="col-lg-12 col-sm-12 member-body">
                    <img
                      src="https://i.ibb.co/x5D0mL2/Sidd-Pfp.png"
                      className="img-fluid lead-img"
                      alt="Lead_Image"
                    />
                    <h5>Yash Divekar</h5>
                    <span></span>
                    <div className="social-ico m-0">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.linkedin.com/in/yash-laxman-divekar/"
                      >
                        <i className="fa fa-linkedin ico-link"></i>
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.instagram.com/d_yash19"
                      >
                        <i className="fa fa-instagram ico-insta"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </Fade>

              <div className="btn-section">
                <button className="other-btns">
                  <NavLink
                    className="other-btns-link"
                    onClick={scrollToTop}
                    to="/team"
                  >
                    Meet our Team
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        </Fade>

        <div className="container d-flex align-items-center justify-content-center">
          <div className="row my-lg-5">
            <div className="col-lg-5 offset-lg-1">
              <Fade left>
                <div className="msg-img-home cursor-pointer text-center tab-view-css">
                  <img
                    src="https://res.cloudinary.com/dqf1zqrr9/image/upload/v1645258208/blogs/WhatsApp_Image_2022-02-19_at_1.19.27_PM_2_ko2uxt.jpg"
                    alt="About_Us"
                    className="about_us"
                  />
                </div>
              </Fade>
            </div>
            <div className="col-lg-6">
              <div className="all-divs">
                <Fade right>
                  <h1 className="text-center about-home-headings home-headings mt-lg-0">
                    About The Community
                  </h1>

                  <p className="home_text pr-lg-5">
                    GDG community thrives to spread awareness about technolgies
                    and engage students in multiple events so that they grow as
                    a developer and meet like minded people.
                  </p>
                  <div className="btn-section">
                    <button className="other-btns">
                      <NavLink
                        className="other-btns-link"
                        onClick={scrollToTop}
                        to="/about"
                      >
                        Check Out
                      </NavLink>
                    </button>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>

        <div className="container d-flex align-items-center justify-content-center">
          <div className="row my-lg-5">
            <div className="col-lg-6 offset-lg-1 pl-lg-4">
              <Fade left>
                <div className="all-divs">
                  <h1 className="text-center home-headings">Blogs</h1>

                  <p className="home_text">
                    Find some useful learning resources here and learn about the
                    journey of GDG Community Members. If you want your inspiring
                    content to reach the masses, we welcome you to submit your
                    blog. “Knowledge is most useful when liberated and shared!”
                  </p>

                  <div className="btn-section">
                    <button className="other-btns">
                      <NavLink
                        onClick={scrollToTop}
                        to="/blogs"
                        className="other-btns-link"
                      >
                        Check Out
                      </NavLink>
                    </button>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-4 offset-lg-1 home_blog_image">
              <Fade right>
                <div className="msg-img-home cursor-pointer tab-view-css">
                  <img
                    src="https://i.ibb.co/wrg6y1s/Home-Blog.jpg"
                    alt="Blogs"
                    className="about_us"
                  />
                </div>
              </Fade>
            </div>

            <div className="container text-center">
              <NavLink onClick={scrollToTop} to="/blogs/idea/popup/">
                <span className="cta button">
                  <span>Submit Your Blog</span>
                  <svg width="13px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="container d-flex align-items-center justify-content-center my-5">
          <div className="row mt-lg-5 mt-2">
            <div className="col-lg-5 offset-lg-1">
              <Fade left>
                <div className="msg-img-home cursor-pointer text-center tab-view-css">
                  <img
                    src="https://res.cloudinary.com/dqf1zqrr9/image/upload/v1645258203/blogs/WhatsApp_Image_2022-02-19_at_1.19.28_PM_drgj4s.jpg"
                    alt="Stay Updated"
                    className="about_us"
                  />
                </div>
              </Fade>
            </div>
            <div className="col-lg-6">
              <div className="all-divs">
                <Fade right>
                  <div>
                    <h1 className="text-center home-headings">Stay Updated</h1>
                    <p className="px-lg-5 home_text">
                      Don’t miss out on the exciting happenings at GDG, AISSMS
                      IOIT. Become a member now and get updates about our latest
                      workshops and events!
                    </p>
                    <div className="btn-section mb-0">
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://gdsc.community.dev/aissms-institute-of-information-technology-pune/"
                      >
                        <button className="other-btns">Be a Member</button>
                      </a>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Bubbles />
    </div>
  );
};

export default Home;
