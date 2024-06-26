import React from 'react';
import '../css/DetailPage.css';
// import { useNavigate,useParams } from 'react-router-dom';

import { useState } from 'react';

function DetailPage() {
  // let { id } = useParams();
  let [modal,setModal]=useState(false);
  let [title,setTitle]=useState(0);
  const nutrition = [
    { id: 1,  name : '포스트바이오틱스' },
    { id: 2,  name : '오메가3'},
    { id: 3,  name : '프로바이오틱스(유산균)'},
    { id: 4,  name : '비타민C' },
    { id: 5,  name : '가르시니아캄보지아'},
    { id: 6,  name : '레시틴'},
    { id: 7,  name : '코엔자임Q10'},
    { id: 8,  name : '비타민B1' },
    { id: 9,  name : '비타민A' },
    { id: 10, name : '칼슘'},
    { id: 11, name : '루테인'},
    { id: 12, name : '바나나잎'},
    { id: 13, name : '비타민D' },
    { id: 14, name : '글루코사민'},
    { id: 15, name : '옥타코사놀'},
    { id: 16, name : '쏘팔메토' },
    { id: 17, name : '비타민B6' },
    { id: 18, name : '셀레늄(셀렌)'},
    { id: 19, name : '폴리코사놀'},
    { id: 20, name : '엽산'},
    { id: 21, name : '공액리놀레산' },
    { id: 22, name : '비타민K'},
    { id: 23, name : '스페인감초추출물(글라브리딘)' },
    { id: 24, name : '크롬'},
    { id: 25, name : '녹차추출물'},
    { id: 26, name : '비타민E'},
    { id: 27, name : '비타민B12'},
    { id: 28, name : '잔티젠'},
    { id: 29, name : '시서스'},
    { id: 30, name : '아연'},
    { id: 31, name : '홈삼'},
    { id: 32, name : '밀크씨슬(실리마린)'},
    { id: 33, name : '베타카로틴'},
    { id: 34, name : '판토텐산'},
    { id: 35, name : '마그네슘'},
    { id: 36, name : '감마리놀렌산(GLA)'},
    { id: 37, name : '히알루론산'},
    { id: 38, name : '비타민B2'},
    { id: 39, name : '홍국'},
    { id: 40, name : '칼륨'},
    { id: 41, name : '프로폴리스'},
    { id: 42, name : '지아잔틴'},
    { id: 43, name : '감태'},
    { id: 44, name : '아스타잔틴'},
    { id: 45, name : '빌베리' },
    { id: 46, name : '허니부쉬추출물'},
    { id: 47, name : '인삼'},
    { id: 48, name : 'MSM'},
    { id: 49, name : '유단백가수분해물' },
    { id: 50, name : '철'},];
  
    let [exp,setExp] = useState(['프로바이오틱스는 유산균과 마찬가지로 장 건강에 도움이 될 수 있으며, 일부 균주는 혈중 콜레스테롤 수치 개선에 도움을 줄 수 있습니다.', '오메가 3는 혈중 중성지질 개선, 기억력 개선에 도움을 주거나 건조한 눈을 개선하여 눈 건강에 도움을 줄 수 있습니다.','프로바이오틱스(유산균)은 체내에 들어가서 건강에 좋은 효과를 주는 살아있는 균입니다. 유해균을 억제하거나 배변활동을 원활하게 합니다.','비타민 C는 세포를 늙게 만드는 활성산소를 없애주는 대표적인 항산화제입니다. 또한 철분의 흡수율을 높이는 데 도움을 줄 수 있습니다.','가르시니아캄보지아 추출물은 탄수화물이 지방으로 합성되는 것을 억제하여 체지방 감소에 도움을 줍니다.','레시틴은 세포막의 구성 물질이면서 영양의 흡수 및 노폐물의 배설 등 생명의 기초대사에 관여합니다. 레시틴에서 떨어져 나온 콜린으로부터 신경전달물질이 되는 아세틸콜린이 만들어져 두뇌 활동을 도와줍니다.','코엔자임 Q10은 비타민E와 유사작용을 하며, 피로회복과 항산화 작용에 도움을 줍니다. 인체 내의 모든 세포의 에너지 생성에 대한 중요 역할을 하기 때문에 무력감, 의욕 저하 등의 증상에도 도움을 줍니다.','비타민B1은 에너지 생성을 돕고, 근육과 신경이 건강하게 활동하도록 도와줍니다.','비타민 A는 시력 유지, 신체의 저항력 강화 생체막 조직의 구조와 기능을 조절합니다. ','칼슘은 뼈와 치아의 구성 요소이며 근육, 신경 기능 조절, 혈액 응고에 도움이 됩니다.','루테인은 노화로 인해 감소될 수 있는 황반색소밀도를 유지하여 눈 건강에 도움을 주며, 과다 섭취 시 일시적으로 피부가 황색으로 변할 수 있습니다.','바나바 잎의 추출물은 인슐린과 같은 활성이 있어 당뇨 치료에 쓰여 왔으며 특히 콩팥 결석을 녹이고 콩팥 건강에 도움을 주는 것으로 인식되고 있습니다.','비타민D는 체내에 흡수된 칼슘, 뼈와 치아에 축적 흉선에서 면역세포 생산에 작용합니다.','글루코사민은 아미노산과 당의 결합물인 아미노당의 하나로, 연골을 구성하는 필수 성분입니다.','옥타코사놀은 식물 밀랍의 주요 성분이며 콜레스테롤 수치에 영향을 주는 것으로 알려져 있습니다.','쏘팔메토는 대서양 해안에서 자생하는 톱 야자수의 열매로 약용 허브로 사용되어 왔습니다. 대표적인 효능은 전립선 건강에 효과가 있으며 요도 관련 증상과 전립선염 완화에 도움이 됩니다.','비타민B6은 단백질 대사에 중요한 효소 구성 성분 헤모글로빈의 구성 성분인 헴 합성 과정에 관여합니다.','셀레늄(셀렌)은 강력한 항산화력으로 활성산소 제거 신체 조직의 노화와 변성을 막거나 속도를 지연시킵니다.','폴리코사놀은 식물에서 추출한 천연 지방 알코올 혼합물로, 주로 사탕수수에서 추출합니다. 혈중 콜레스테롤 수치 개선에 도움을 준다고 알려져 있습니다.','엽산은 비타민 B의 일종으로 수용성 비타민입니다. 폴산이라고도 불리며 체내에서 DNA와 아미노산의 합성과 적혈구 형성에 필요합니다.','공액리놀레산은 과체중인 성인의 체지방 감소에 도움을 줄 수 있는 건강기능식품의 기능성 성분입니다.','비타민K는 기름에 용해되는 지용성 비타민이며 혈액응고에 필수적인 비타민으로 항출혈성 비타민으로 불립니다. 케일, 양배추의 녹엽, 콜리플라워, 브로콜리, 시금치, 상추와 같은 녹엽채소에 많으며, 간에서 혈액응고인자의 합성에 관여힙니다.','스페인감초추출물(글라브리딘)은 위 점막에 있는 헬리코박터균의 성장을 억제해, 점막을 보호하고 위건강에 도움이 됩니다.','크롬은 포도당 대사의 항상성 유지에 필요 지방 대사에 필수적, 인슐린의 보조인자로 작용합니다.','녹차추출물은 항산화력이 높아, 노화를 촉진하는 활성산소를 없애며, 콜레스테롤과 혈당을 낮추는 효과가 있습니다.','비타민E는 세포 노화를 막고 세포막 유지 항산화 물질로 활성산소 무력화합니다.','비타민B12는 핵산 합성과 조혈 작용에 관여하며 적혈구 형성에 보조적 역할을 합니다.','잔티젠은 칼로리를 저장하는 백색지방이 에너지를 연소시키는 갈색지방으로 바뀔 수 있도록 돕는 역할을 하여 체지방 감소에 도움을 줄 수 있습니다.','시서스는 체지방 감소에 도움을 줄 수 있습니다.','아연은 면역 세포의 활성을 조절해 면역력을 높여줍니다.','홍삼은 피로회복, 면역력 증진, 혈소판 응집억제를 통한 혈액 흐름에 도움을 줍니다.','밀크씨슬(실리마린)은 활성산소로부터 간 세포를 보호하는 항산화 작용이 있어서 간 건강에 도움을 줄 수 있습니다.','베타카로틴은 녹황색 채소와 과일, 조류에 많이 함유되어 있으며, 항산화 작용, 유해산소 예방, 피부 건강 유지 등의 효과가 있습니다.','판토텐산은 뇌의 콜린 성분이 신경전달 물질인 아세틸콜린으로 전환되도록 도우며, 세포벽에 형성되는 지방산의 합성에 중요한 역할을 합니다.','마그네슘은 근육이 편안하게 이완할 수 있도록 해주고, 신경 안정에 도움을 줄 수 있습니다.','감마리놀렌산(GLA)은 오메가6에 해당하는 지방산의 한 종류로, 우리 몸에서 일어나는 염증반응을 조절하는데 도움을 줄 수 있습니다.','히알루론산은 각종 안과 수술의 보조제, 관절 내 주사제, 인공눈물, 상처치유 등의 목적으로 사용됩니다.','비타민B2는 에너지 생성을 도와 활력을 더해주는 영양소입니다.','홍국은 콜레스테롤 저하, 중성지방 감소의 효과가 있습니다.','칼륨은 나트륨과 균형을 이루어 정상 혈압 을 유지하며 몸속 노폐물을 처리하고, 에너지 대사 및 뇌기능 활성화 등의 효능이 있습니다.','프로폴리스는 항염·항산화·면역증강 등의 효능이 있습니다.','지아잔틴은 시력에 중요한 황반색소 밀도를 유지해, 눈 건강에 도움이 됩니다.','감태는 수면의 질이 좋아지도록 도움을 줄 수 있습니다.','아스타잔틴은 눈의 모세혈관을 건강하게 하고 혈액 순환이 원활해져, 눈의 피로 개선에 도움을 줄 수 있습니다.','빌베리 열매에는 콜레스테롤 개선, 죽상동맥경화 개선, 시력 향상 및 노화 방지 효과가 있습니다.','허니부쉬추출물은 자외선으로부터 피부를 보호해, 피부 건강에 도움을 줄 수 있습니다.','인삼에는 원기 회복, 면역력 증진, 자양 강장, 항암 등의 효능이 있습니다.','MSM은 항산화 작용을 통해 노화를 막고, 피부에 콜라겐을 공급할 수 있습니다.','유단백가수분해물은 스트레스를 낮추고, 긴장을 완화하도록 도움을 줄 수 있습니다.','철은 건강한 적혈구를 만들기 위해 꼭 필요하며, 에너지 생성을 돕습니다.']);  
  // const navigate = useNavigate();
  // const navigateToDetailPage = () => {
  //   // 영양성분 상세 페이지로 이동
  //   navigate("/detaial"+id);
  // };
  
  return (
    <div className="detail-page">
      {nutrition.map((item,i)=> (
        <div onClick={()=>{setModal(true); setTitle(i);}} className="minibox" >
          <h4>{item.name}</h4>
        </div>
      ))}
    {
      modal==true? <Modal title={title} setModal={setModal} exp={exp}/>:null
    }
    </div>
    
  );
  }

 function Modal(props){
  return(
    <div className="modal">
      <p>{props.exp[props.title]}</p>
      <span style={{cursor : 'pointer'}}onClick={()=>{props.setModal(false)}}>X</span>
    </div>
  )
 }
  



export default DetailPage;

//원본--모달 없는거.상세페이지 undefined로 연결.
// return (
    
//   <div className="product-page">
//     {nutrition.map(item => (
//       <div onClick={() => navigateToDetailPage(item.id)} 
//         key={item.id} 
//         className="minibox" >

//         <h4>{item.name}</h4>
        
//       </div>
//     ))}
//   </div>
// );
// };


//두번째.
// return (
    
//   <div className="product-page">
//     {nutrition.map(item => (
//       <div onClick={() => {}} 
//         key={item.id} 
//         className="minibox" >

//         <h4>{item.name}</h4>
        
//       </div>
//     ))}
//   </div>
// );
// };