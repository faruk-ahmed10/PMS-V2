import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0 ;
    font-family: Open-Sans, Helvetica, Sans-Serif, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #e8e9ec;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  
  .react-datepicker-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
  }
  .react-datepicker__input-container input {
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
  }
  
  
  .grid-action-button {
    font-size: 15px;
    padding: 5px;
    cursor: pointer;
  }
  .grid-action-button:hover {
    opacity: 0.7;
  }
  .grid-action-delete {
    color: red;
  }
  .grid-action-edit {
    color: blue;
  }
`;

export {GlobalStyle};