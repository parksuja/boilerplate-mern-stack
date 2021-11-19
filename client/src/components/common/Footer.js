import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="mt-5 pt-5 pb-5 footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-xs-12 about-company">
            <h2 style={{ fontStyle: "oblique", fontWeight: "bold" }}>
              AI Online HomeTraining
            </h2>
            <p className="pr-3">
              건강한 몸을 만듭시다.
              <br />
              바로 운동을 시작하세요!!!!!!
            </p>
          </div>
          <div className="col-lg-3 col-xs-12 links">
            <h4 className="mt-lg-0 mt-sm-3">
              <i className="fa fa-link mr-3"></i>Quick Links
            </h4>
            <ul className="m-0 p-0">
              <li>
                - <Link to="/todaytr">오늘의 추천 운동</Link>
              </li>
              <li>
                - <Link to="/package">강의 목록</Link>
              </li>
              <li>
                - <Link to="/review">수강 후기</Link>
              </li>
              <li>
                - <Link to="/mypage">내 강의실</Link>
              </li>
            </ul>
            <p></p>
          </div>
          <div className="col-lg-4 col-xs-12 location">
            <h4 className="mt-lg-0 mt-sm-4">
              <i className="fa fa-user-tie mr-3"></i> Contact Us!
            </h4>
            <p>부산시 사하구 다송로 23-0 (롯데캐슬블루 106동703호)</p>
            <p className="mb-0">
              <i className="fa fa-phone mr-3"></i>010-2450-9340
            </p>
            <p className="mb-0">
              <i className="fa fa-envelope mr-3"></i>asd@gmail.com
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col copyright">
            <h4 className="mt-lg-0 mt-sm-4 developer">
              ‍<i class="fas fa-code"></i> Developers
            </h4>
            <p className="m-1 p-1">
              <span className="dev">
                <a href="https://github.com/Parksuja">
                  <i className="fab fa-github-square mr-3"></i>
                </a>{" "}
                박수진
              </span>
              <span className="dev">
                <a href="https://github.com/Parksuja">
                  <i className="fab fa-github-square mr-3"></i>
                </a>{" "}
                박현근
              </span>
              <span className="dev">
                <a href="https://github.com/Parksuja">
                  <i className="fab fa-github-square mr-3"></i>
                </a>{" "}
                송태영
              </span>
            </p>
            <p></p>
            <p>
              © 2021. All Rights Reserved.
              <br />{" "}
              <a
                href="https://github.com/parksuja/Project"
                style={{ color: "#616161" }}
              >
                HomeTraining's Github
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
