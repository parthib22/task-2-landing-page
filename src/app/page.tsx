"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";

const ScrollReveal = (props: any) => {
  const {
    threshold = 1,
    rootMargin = "0px 0px 0px 0px",
    animationType = "fade-in",
    finalStage = "appear",
  } = props;
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const appearOptions = {
      threshold: threshold,
      rootMargin: rootMargin,
    };

    const appearOnScroll = new IntersectionObserver(function (
      entries,
      appearOnScroll
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add(finalStage);
          appearOnScroll.unobserve(entry.target);
        }
      });
    },
    appearOptions);

    if (elementRef.current) {
      appearOnScroll.observe(elementRef.current);
    }

    // Cleanup the observer on component unmount
    return () => appearOnScroll.disconnect();
  }, [finalStage, rootMargin, threshold, animationType]);
  return (
    <div ref={elementRef} className={`${animationType}`}>
      {props.children}
    </div>
  );
};

const NavBar = () => {
  return (
    <>
      <nav>
        <div className="logo">
          <Image height={50} width={50} src={"/logo_bird_2.svg"} alt="pic" />
          <Link href={"#"}>TechVista</Link>
        </div>
        <div className="options">
          <Link href={"#about"}>About</Link>
          <Link href={"#service"}>Services</Link>
          <Link href={"#contact"}>Contact</Link>
        </div>
      </nav>
    </>
  );
};
const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      class: "hero1",
      title: "Software Development",
      subtitle:
        "Tailor-made software solutions designed to meet the unique needs and requirements of your business. From conception to deployment, we turn your ideas into powerful, scalable, and user-friendly applications.",
      hyperlink: "Get Your Custom Solution",
    },
    {
      class: "hero2",
      title: "Cybersecurity Solutions",
      subtitle:
        "Protect your business from evolving cyber threats with our comprehensive cybersecurity solutions. We offer a robust suite of services including threat detection, vulnerability assessments, and security awareness training.",
      hyperlink: "Secure My Business",
    },
    {
      class: "hero3",
      title: "Cloud Consulting",
      subtitle:
        "Unlock the full potential of cloud computing. Our experts provide strategic cloud consulting, seamless migration services, and ongoing support to optimize your operations and enhance scalability.",
      hyperlink: "Migrate to the Cloud",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="hero-container">
      <button id="prev" onClick={prevSlide} aria-label="previous">
        <Image
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6UlEQVR4nO3WwQoBURTG8X9KVnZKWVl4ABtLKytbNrwDXsJ4CCteYR6AbJSRZ1CUleykRGg0U9NpLM+5lK/u5m5+3du55x7450eSBwLgGa25BZoB/AQaro0FPBLoCahoo23gkUBvQEMbrQJncdqeNloE9gKdaKNZYCHQJZDThscC3UU3oJqBQC9ATRttRFUbo2E1d7TRMnAUpx1ikLVA/ahjqSdwBZdTrtrDKHXgKoqra4X3XTynTw3kAJQwSNZVywxTALYCn2KUasq3GNaASVpiELgDTSvcczH6OB324vF2lYBn791/vikvhQ9rMP7mWfoAAAAASUVORK5CYII="
          }
          height={30}
          width={30}
          alt="pic"
        />
      </button>
      <span id="dots">
        {slides.map((item, id) => (
          <button
            key={id}
            onClick={() => setCurrentSlide(id)}
            className={`${id == currentSlide && "active"}`}
            aria-label="dots"
          >
            {" "}
          </button>
        ))}
      </span>
      <button id="next" onClick={nextSlide} aria-label="next">
        <Image
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6UlEQVR4nO3WwQoBURTG8X9KVnZKWVl4ABtLKytbNrwDXsJ4CCteYR6AbJSRZ1CUleykRGg0U9NpLM+5lK/u5m5+3du55x7450eSBwLgGa25BZoB/AQaro0FPBLoCahoo23gkUBvQEMbrQJncdqeNloE9gKdaKNZYCHQJZDThscC3UU3oJqBQC9ATRttRFUbo2E1d7TRMnAUpx1ikLVA/ahjqSdwBZdTrtrDKHXgKoqra4X3XTynTw3kAJQwSNZVywxTALYCn2KUasq3GNaASVpiELgDTSvcczH6OB324vF2lYBn791/vikvhQ9rMP7mWfoAAAAASUVORK5CYII="
          }
          height={30}
          width={30}
          alt="pic"
        />
      </button>
      <div className={`hero-section ${slides[currentSlide].class}`}>
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].subtitle}</p>
        <div>
          <Link href={"#"}>{slides[currentSlide].hyperlink}</Link>
          <Link href={"#"}>Read More</Link>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="about-container" id="about">
      <div>
        <ScrollReveal>
          <h1>About Us</h1>
        </ScrollReveal>
        <div id="paragraph">
          <ScrollReveal>
            <strong>
              Fifteen years, we are passionate about acheiving better results
              for our clients
            </strong>
          </ScrollReveal>

          <br />
          <br />
          <ScrollReveal>
            At TechVista Solutions, we are at the forefront of innovation,
            driving digital transformation for businesses of all sizes. With a
            passion for technology and a commitment to excellence, we specialize
            in crafting custom software solutions, providing robust
            cybersecurity measures, and offering expert guidance in cloud
            consulting and migration. Our dedicated team of professionals brings
            a wealth of experience to the table, ensuring that every project is
            a success.
          </ScrollReveal>
        </div>
      </div>
      <ScrollReveal>
        <div className="image-container">
          <Image height={1495} width={1080} src={"/lexica.webp"} alt="pic" />
        </div>
      </ScrollReveal>
    </section>
  );
};

const Services = () => {
  return (
    <>
      <section className="services-container" id="service">
        <ScrollReveal>
          <h1>Our Services</h1>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            Discover a range of comprehensive IT services designed to propel
            your business forward. From custom software development to
            cybersecurity solutions, we have you covered.
          </p>
        </ScrollReveal>

        <div>
          <ScrollReveal rootMargin="0px 0px 0px 0px" animationType="fade-left">
            <div className="services">
              <span>Software Development</span>
              <Image
                height={500}
                width={500}
                src={"/a.webp"}
                alt="pic
        "
              />
            </div>
          </ScrollReveal>
          <ScrollReveal rootMargin="0px 0px -50px 0px">
            <div className="services">
              <span>Cyber Security</span>
              <Image
                height={500}
                width={500}
                src={"/b.webp"}
                alt="pic
        "
              />
            </div>
          </ScrollReveal>
          <ScrollReveal
            rootMargin="0px 0px -100px 0px"
            animationType="fade-right"
          >
            <div className="services">
              <span>Cloud Computing</span>
              <Image
                height={500}
                width={500}
                src={"/c.webp"}
                alt="pic
        "
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., sending data to a server
    console.log("Form submitted:", formData);
  };
  return (
    <>
      <section className="contact-container" id="contact">
        <div className="container-1">
          <h1>Get in Touch</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              id="message"
              name="message"
              rows={4}
              cols={24}
              placeholder="type your messege here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <div className="checkbook">
              <input type="checkbox" id="check" />
              <label htmlFor="check">Sign up for newsletter</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="container-2">
          <h1>Contact Us</h1>
          <p>
            Have a question or interested in our services? Reach out to us
            today.
          </p>

          <br />
          <ul>
            <li>
              <Image
                height={20}
                width={20}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUElEQVR4nO2Wv0rDUBSHvyxqF4ud1Ih7R/EJ9BUEZ7W7OJmi+Dq6SA24KL6BIv4BoS4q6CIuLRX/gKIEbiAE6zn35jYufvCDkHDOBzcnh8A//akBK0AMtIFnk+R6D1gGxvBIBdgEusCXkA6wYWoKMQkcK4T5nAHTrtIp4MFBmuYeCG2lFeC0gDTNCTBiI97yIE3T1EprykHSpqOd9oZHaZoljTgWmrwD62bik0Tm3m81LY34WmiSiPJEQk1bI+4JTSZ+qBkXanoa8ZvQJDnePKFQ86IR3zkcdVOoudWIW4rhiiyHa1cjXhzA57SgEQ8DTx6lj8AQShplL4+UADjyID0wvawYBS4KSK+K/JGEwKWD9LzP925FFdi3kMbmtLwQAGvAq7CdVl3eqYa62UJ56Y15NlBmgc+M9AOYoSR2MuJtSmQ+I54rUxwAh64L4k/5Bk2pcY91HooZAAAAAElFTkSuQmCC"
                }
                alt="pic"
              />{" "}
              123 Tech Street, Innovate City, MB 500091
            </li>
            <li>
              <Image
                height={20}
                width={20}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUUlEQVR4nO2Uq07EQBSGPy4hJCQIFAn7ACQs70CCBQWOBAEOHIZXQCBxu6vA4UChsCtBgAK70H0ALlluKTkdTofOtJSp2fRP/nQ658z55vQyUKvWMGsWuAI+K/It0LChy3KdAboVQLtSW7O+9Qqsy3gKuAgIvQSmpfYq8KzBccIbsCX3E8BpAOgZMCk1N4CBzKfAsT+APZkbA9r/gB4D41JrF3hXsV/gxAcyPwIcloAeAaNSYz8j7gQXWexykU0buYqcqMe1Yz0u2/Zr6nhyjXwdtH7S2FQfiPZAYolaOTWNXAl9YJG0VoAnlfMCrFk580CvLDgCmhJvyq+RHAJLwD1wJ2Mkdg4sqDXRX8F91Wm8+weZvwHmyD5urx1re0XBdqf2rh/loGmItzNyopzOjfI6LWNf50ahoXlwoyqgPriR752GcGQxUgrdqa/zWrWGUF8oNX9XHfqvQQAAAABJRU5ErkJggg=="
                }
                alt="pic"
              />{" "}
              info@techvistasolutions.com
            </li>
            <li>
              <Image
                height={20}
                width={20}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABr0lEQVR4nO2WzytFQRTHPxZEL+WJkr9AZGdDyc9/gFJsSLGSjdKzpbCWPWtKZCUKUV4oRIqF5JW3kl9JNq+nqSPTbe7cH91u0fvWWczMmfncOXPmzIWC/ogOgQ/gBlgHhoFkXOC8w16AKaA0zIJlwCLwDsx6+CaAOmAE2NY+4ASoDQItAfa0BXJAU4D5rRJ6NTcTBD5pCN8RUGQ54zNgBqiW/gpgX+Ye+w37tQGsbNAFrPu8Ab0yppLsVvpTfsCfLuAsUO5yxu3AhnY0PTLWpiVc0guccQErm/CYmxK/V6BK+nakb8gLvGwB9xtC/QjMS1IqbYrvtLRHpb3mBe50gZoSTD/jOenrkLZKOOSq5SXTPaXfxx/rcvFtkXG1cyQP8lIDTG2rGoEvB7jP4q92fhCgbdW44aqoD4pFqw74PVATBzgBpB3w87jglcCVYef1mo/K9gG556YiE1qq0N854M+ScN2OqGSlvJpqeyip8F5YiovTToFmIgx7OgA8J69WZAm3EgD+FA32V2OGImOyhajBSg3AlgW6G/bfy6/Ue7wEPEhNvpSrVex7hYL+nb4BowPNRzVzfnsAAAAASUVORK5CYII="
                }
                alt="pic"
              />{" "}
              +91 (033) 1234-5678
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="info">
        <strong>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </strong>
        <p>123 Tech Street, Innovate City, MB 500091</p>
        <p>info@techvistasolutions.com</p>
        <p>+91 (033) 1234-5678</p>
      </div>

      <div className="social">
        <p>Connect With Us</p>
        <ul>
          <li>
            <Link
              href={"https://linkedin.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                height={30}
                width={30}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFklEQVR4nO2Wu0rEQBSGZ0U7L4WNnS9gY6WVVoKL+hb2voaVz+ED2FkENGJyzne6lFaJiKVYiIjuSCArg42LZLJe8sNfzD9n5ptbMc71+ncC9lT1FvAtuRKR4STgqkXo2OUkYB/D7hvgB+ASeOoS/Ghmq3UuIuvAaydgVb3+1Fd2BX4GNurczA5UddTZHavqG3A3jcd13Pikad8H2RlwAxwB+8AhcNUK2Hs/qPOiKOabzILaTWApHO+9nwHOo4LHyvN8+aPhnFPVnahg7/1AVS+at3AaLGQlKlhE1oLalyRJZps55qKCzWwrrE3TdCE47lHMHW+HtVmWLfZgft1R05LdTwZXU/n6iMiwZXhpZrtfgnv9Ob0DimuIVg4aVaIAAAAASUVORK5CYII="
                }
                alt="pic"
              />
            </Link>
          </li>
          <li>
            <Link
              href={"https://x.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                height={30}
                width={30}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbUlEQVR4nO2WvUrEQBSFAzb+YaUgNoJoI4iFIPgAiqtYC9YuPoON2thb6SMIi6jbCFYBi5idc+6wxRYWNu6Kilj5g6BiJDoLYQm4yMwimgOnuQnzMfecQDwv078TyXkAlyQjS64ppXLNgGsWoXVXmwFHLuxl4EY1rgjAbalU6m94ZzllnRKGYQ+AfZurLhYKhTaSuySPy+VyF8nDxPMLERkAsOUi47yITJB8IblNspfkNcl7rfU4gBUn5QLwICLDJNcBvAOYM54WkQWSb85aDeDU9/12AAHJG611n9Z6FMBjKz6nNaXUULxikkcm77NWgF9JjiWanQcwaebuwABOKpVKN8lOkgdx9lrrkTh7l+DzOFfT6h3T7CsADIKgw2RvHXxnbrZan5k2z5iWbySytwZ+FpEpEVmMIYn5Z7MBbJIMRWQwztwKGF+gJVOgp5RDiyln7LlodfQTexn41/z6KKVyluFVEZn9Fpzpz+kD3IUfMWEEHWMAAAAASUVORK5CYII="
                }
                alt="pic"
              />
            </Link>
          </li>
          <li>
            <Link
              href={"https://facebook.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                height={30}
                width={30}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABxElEQVR4nO2WO0sDQRSF06hgZ6PiI1prYSF2+gMsfCHWapFKo/4dlWgv2vlIaSEkO+fMbggp4oJ/wBeYBJWYqAwksAnZySQbIYUXLizLnPn23JnZuaHQf3RbkAwDiAKIk8wCKKisPMcB7AohxjsGdBxnFMAhyRLJH10CKJM8cxxnMqjLVQD5ZsAGmRNCLLcL3a84aBXqdb/XjtNyC6A3kh+N4MbOk8nkmEl5ATxKKbfT6fRAVeu6bh/Ju/qySylHTNzGDBy+W5Y17aO/bTD+uBk0bLh7j+p0PbZtz0gpZ0nKBpqSqqQvWJ1TwzXd8ED7AbgGmh0d+MYQPF/VCCEWDTVXulLfm0wihJjzaDYNwVmd43wb4C3Dc53XgQsa8YKvsHYOv/XO6Ur9EAScyWR6SX75OHZ14OsgYNu2pzT6Sx34QLc5AFClAlQ1Usql6nvd5gQQ9QVLKSdIFv9gcxWb3tUATjsNrv/T6TqN1w6CX7S/S28IIdYBfAcFqzkArBhBPRNG/O5kE3BFG2kJ6nVO8rkN8BPJtVCQsCxrGMAJgM9m4MqYWCKRGAoErf8A1UMBuPA2AapNInmuerRUKjVYI/qPbohfMMFW+sRnFUwAAAAASUVORK5CYII="
                }
                alt="pic"
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" href="/1.avif" as="image" />
        <link rel="preload" href="/2.avif" as="image" />
        <link rel="preload" href="/3.avif" as="image" />
        <link rel="preload" href="/a.webp" as="image" />
        <link rel="preload" href="/b.webp" as="image" />
        <link rel="preload" href="/c.webp" as="image" />
        <link rel="preload" href="/lexica.webp" as="image" />
        <link rel="preload" href="/logo_bird_2.svg" as="image" />
      </Head>
      <NavBar />
      <CarouselComponent />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
