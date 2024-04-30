import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import myImage from '../img/logo.png'; 
import '../css/LandingPage2.css';
function LandingPage() {
  const navigate = useNavigate();
  const navigateToDetailPage = () => {
    // 디테일 페이지로 이동하는 함수
    navigate('/detail');
  };

  return (
    <div className='landing-page2'>
    
      <div className='container-landing'>

        <div className='landing-content'>

          <div className='landing-img'>
          <Link to="/detail"><img src={myImage} alt="My Image" 
          style={{ width: '700px', height: 'auto' }} /></Link>
          </div>

          <div className='landing-text'>
            <h1> Nutri Guide?</h1>
            <h2>
              AI 기술을 활용하여
            <br />
            <br />
            간편한 정보 입력만으로
            <br />
            <br />
            최적의 영양제를 추천해드립니다!
          </h2>
            <button
            className="custom-button2"
            onClick={navigateToDetailPage}
            >
              <span>영양성분 설명</span>
            </button>

          </div>
        </div>
      </div>
    
  </div>
  );
}
export default LandingPage;
