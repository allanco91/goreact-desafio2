import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      align-self: flex-end;
      text-align: center;
      height: 30px;
      background: #fff;
      border: 0;
    }

    img {
      width: 64px;
      margin-top: 20px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n -1) {
        background: #f5f5f5;
      }
    }
  }

  button {
    margin: 5px 0 5px 0;
    align-self: stretch;
    height: 30px;
    background: #fff;
    border: 0;
  }
`;