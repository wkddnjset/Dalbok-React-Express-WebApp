import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
    fontSize:13,
    textAlign:'left',
  },
  div:{
    height:80,
    overflow:'scroll',
    textAlign:'left',
    fontSize:11,
    marginBottom:10,
  }
};

class PersonalInfos extends React.Component {
  state = {
    checked: false,
  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  render() {
    return (
      <div style={styles.block}>
        <div style={styles.div}>
          <p><b>제1조(목적)</b></p>
          <span>이 약관은 주식회사 달려라플라워(이하 회사)이 제공하는 달려라플라워앱의 이용과 관련하여 회사와 소속기관, 그리고 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</span>
          <p><b>제2조(정의)</b></p>
          <span>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br/>
            1. "서비스"라 함은 구현되는 단말기(PC, TV, 휴대형 단말기 등의 각종 유/무선 장치를 포함)와 상관없이 회원이 이용할 수 있는 e알리미 및 e알리미 제반 서비스를 의미합니다.<br/>
            2. "기관"이라 함은 회사와 이용 계약을 체결하고 서비스를 제공 받는 조직, 단체를 의미하며 기관은 기관에 속한 회원 및 서비스 이용에 대한 관리 권한을 가집니다.<br/>
            3. "회원"이라 함은 이 약관에 따라 회사가 제공하는 서비스를 이용하는 사람을 말하며 회원은 회사와 이용계약을 체결한 기관에 가입하여 본 서비스를 이용할 수 있습니다.<br/>
            4. "아이디(ID)"라 함은 회원의 개인 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 회원의 휴대전화번호 또는 e메일 계정을 의미합니다.<br/>
            5. "비밀번호"라 함은 회원이 생성한 아이디와 일치되는 회원임을 확인하고 회원의 서비스 접속 및 정보 보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 의미합니다.<br/>
            6. "게시물"이라 함은 회원이 서비스를 이용함에 있어 서비스 상에 게시한 부호ㆍ문자ㆍ음성ㆍ음향ㆍ화상ㆍ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.
          </span>
        </div>
        <Checkbox
          label="(필수) 개인정보 수집 및 이용에 동의합니다."
          labelPosition="left"
          style={styles.checkbox}
        />
      </div>
    );
  }
}

export default PersonalInfos;