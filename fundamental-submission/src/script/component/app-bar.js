class AppBar extends HTMLElement {

    constructor() {
      super();
      this.shadowDOM = this.attachShadow({mode: 'open'});
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowDOM.innerHTML = `
        <style>

        @import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          :host {
            display: block;
            width: 100%;
            background-color: #182747;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            text-align: center;
            
          }
          h2 {
            color: #D8D8D8;
            padding: 16px;
            font-family: 'Italiana', serif;
          }
        </style>
        
        <h2>Restaurant</h2>
      `;
    }
  }
  
  customElements.define('app-bar', AppBar);
  