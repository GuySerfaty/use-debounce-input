import styled from 'styled-components';


export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Column = styled.div`
  flex: 1;
`;

export const ListContainer = styled.div`
  margin-top: 20px;
  height: 400px;
  overflow: auto;
  border: 1px solid gray;
  padding: 20px 20px;
`;

export const H2 = styled.div`
  color: black;
  font-size: 20px;
`;
export const H3 = styled.div`
  color: #5d5d5d;
  font-size: 16px;
`;

export const Vs = styled.div`
  display: grid;
  grid-column-gap: 50px;
  grid-template-columns: auto auto;
  margin-bottom: 40px;
  border-bottom: 1px solid #222222;
  padding-bottom: 20px;
`;

export const VsColumn = styled.div`
  /* flex: 1; */
`;