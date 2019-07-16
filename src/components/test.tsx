import React, {
  FC,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  useCallback,
} from 'react';
import Button from 'components/common/Button';
import { observer } from 'mobx-react-lite';
import useUpdateTitle from './useUpdateTitle';
import { useDeal } from '../hook';

/* type alias */
type OnChange = (e: ChangeEvent<HTMLTextAreaElement>) => void;
type OnSubmit = (e: MouseEvent<HTMLButtonElement>) => void;

/* 딜 상태 관리하는 컨테이너 컴포넌트 */
const Container: FC = observer(() => {
  const deal = useDeal();
  return deal ? <UpdateTitle initialTitle={deal.userViewDealTitle} /> : null;
});

/* 딜명 수정 페이지 */
const UpdateTitle: FC<{ initialTitle: string }> = ({ initialTitle }) => {
  const { title, max, onChange, onSubmit } = useUpdateTitle(initialTitle);

  return (
    <>
      <Body title={title} max={max} onChange={onChange} />
      <Footer onSubmit={onSubmit} />
    </>
  );
};

interface IProps {
  title: string;
  max: number;
  onChange: OnChange;
}

/* 페이지 내용 */
const Body: FC<IProps> = ({ title, max, onChange }) => {
  return (
    <div className="container switch_name">
      <section className="spc_grid">
        <h1 className="blind">상품 이름 변경</h1>
        <Textarea title={title} max={max} onChange={onChange} />
        <Guide />
      </section>
    </div>
  );
};

/* 제목 수정란 */
const Textarea: FC<IProps> = ({ title, max, onChange }) => {
  /* 엔터 클릭 시 무시 */
  const onKeyPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  }, []);

  return (
    <div className="textarea_wrap">
      <textarea
        className="textarea_write"
        placeholder="상품 이름을 등록해주세요"
        value={title}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
      <div className="textarea_number">
        <span className="text_orange">{title.length}</span> / {max}
      </div>
    </div>
  );
};

/* 제목 수정란 하단의 공지 내용 */
const Guide = () => {
  return (
    <div className="guide_list_wrap">
      <ul className="guide_list">
        <li className="guide_item">
          <p className="text">
            티몬 서비스의 딜리스트와 상세 페이지에 노출됩니다
          </p>
        </li>
      </ul>
    </div>
  );
};

/* 하단 푸터 */
const Footer: FC<{ onSubmit?: OnSubmit }> = ({ onSubmit }) => {
  return (
    <footer className="footer">
      <div className="btn_flex_various">
        <Button text="적용" disabled={!onSubmit} onClick={onSubmit} />
      </div>
    </footer>
  );
};

export default Container;
