import styled, { css } from 'styled-components';

const basic = function (props: any) {
  const {
    theme: { ci },
  } = props;

  return css`
    padding: 5px;
    border: 1px solid ${ci};
    color: #000;
  `;
};

const Biundle = {
  TEXT: styled.input`
    ${(props) => basic(props)}
  `,
};

export default Biundle;
