import React, { useState } from "react";
// import { MdOutlineDone } from "react-icons/md";
// import { VscWarning } from "react-icons/vsc";
// import {
//   BsWhatsapp,
//   BsFacebook,
//   BsTelegram,
//   BsTwitter,
//   BsSkype,
//   BsLinkedin
// } from "react-icons/bs";
// import { SlSocialVkontakte } from "react-icons/sl";
// import { FaViber } from "react-icons/fa";

export default function Hero() {
  //./main3 -a ':8080' -b 'http://localhost:8080'
  const [message, setMessage] = useState("");
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  //Checking URL function
  const validURL = (str) => {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };
  //Putting input to state
  const handleChange = (event) => {
    event.target.value =
      event.target.value.length === 1
        ? "https://" + event.target.value
        : event.target.value;
    setInputValue(event.target.value);
  };
  //Handling submit btn
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validURL(inputValue)) {
      setMessage(
        <p className="message-content">
          {/* <MdOutlineDone /> */}
          <span className="message-text">Link has successfully generated.</span>
        </p>
      );
      setIsMessageShown(true);
      setTimeout(() => {
        setIsMessageShown(false);
      }, 3000);
      fetch("http://localhost:8080/api/shorten", {
        method: "post",
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify({
          url: inputValue
        })
      })
        .then((res) => res.json())
        .then((res) => setResultUrl(res));
    } else {
      setMessage(
        <p className="message-content">
          {/* <VscWarning /> */}
          <span className="message-text">Please enter correct URL</span>
        </p>
      );
      setIsMessageShown(true);
      setTimeout(() => {
        setIsMessageShown(false);
      }, 2000);
      setResultUrl("");
    }
    event.target.reset();
    setInputValue("");
  };
  //Setting logic for copying a link
  const handleClick = () => {
    setMessage(
      <p className="message-content">
        {/* <MdOutlineDone /> */}
        <span className="message-text">Short link copied to clipboard.</span>
      </p>
    );
    setIsMessageShown(true);
    setTimeout(() => {
      setIsMessageShown(false);
    }, 2000);
    const copiedUrl = resultUrl.result;
    console.log(copiedUrl);
    navigator.clipboard.writeText(`${copiedUrl}`);
  };

  return (
    <main>
      <div className="container">
        <h1>Link shortening service</h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              onChange={handleChange}
              type="text"
              placeholder="Enter long URL"
            />
            <button className="form-button">Cut</button>
          </form>
        </div>
        <div className={!isMessageShown ? "message" : "message active"}>
          {message}
        </div>
        {resultUrl && (
          <div className="link-container">
            <div className="link-description">
              <div className="link">
                <a
                  href={resultUrl.result}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resultUrl.result}
                </a>
              </div>
              <button onClick={handleClick} className="copy-btn">
                Copy
              </button>
            </div>
            <div className="link-buttons">
              {/* <button className="link-button">
                <BsTelegram size={"2em"} />
              </button>
              <button className="link-button">
                <BsWhatsapp size={"2em"} />
              </button>
              <button className="link-button">
                <SlSocialVkontakte size={"2em"} />
              </button>
              <button className="link-button">
                <BsFacebook size={"2em"} />
              </button>
              <button className="link-button">
                <BsTwitter size={"2em"} />
              </button>
              <button className="link-button">
                <BsSkype size={"2em"} />
              </button>
              <button className="link-button">
                <BsLinkedin size={"2em"} />
              </button> */}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
