import { injectGlobal } from 'emotion'
import normalize from 'emotion-normalize'

injectGlobal`
  ${normalize};

  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
  }
`
