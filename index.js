class ItemSelector extends HTMLElement {
    constructor() {
        super() ;
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            @import "./css/style.css";
        </style>
        <div class="selector">
            <a href="google.com">
                <img class="card-image" src= ""> 
            </a>
            <div class="card-pane selecting">
                <div class="flex"></div>
                <div class="btn mini btn-raised btn-accent">  
                    <span>select</span> 
                </div>
            </div>
            <div class="card-pane canceling">
                    <div class="btn cancel-btn txt-caption"> cancel </div>
                    <div class="flex"></div>
                    <div class="btn mini btn-float btn-green"> 
                        <img class="mdi mdi-check" src="./img/check.svg">  
                    </div>
            </div>
        </div>
           `       
    }

    set selected(value) {
        this.setAttribute("selected", value);
    }

    get selected() {
        return this.getAttribute("selected");
    }

    set width(value) {
        this.setAttribute("width", value);
    }

    get width() {
        return this.getAttribute("width");
    }

    set height(value) {
        this.setAttribute("height", value);
    }

    get height() {
        return this.getAttribute("height");
    }

    set imgSrc(value) {
        this.setAttribute("img-src", value);
    }

    get imgSrc() {
        return this.getAttribute("img-src");
    }

    set id(value) {
        this.setAttribute("id", value);
    }

    get id() {
        return this.getAttribute("id");
    }

    set itemLink(value) {
        this.setAttribute("item-link", value);
    }

    get itemLink() {
        return this.getAttribute("item-link");
    }

    connectedCallback() {
        this._selected= this.getAttribute("selected");
        this._height= this.getAttribute("height");
        this._width=this.getAttribute("width");
        this._imgSrc= this.getAttribute("img-src");
        this._id= this.getAttribute("id");
        this._itemLink= this.getAttribute("item-link");

        this.shadowRoot.querySelector(".btn span")
        .addEventListener("click", this.selecting.bind(event,this.shadowRoot, this));

        this.shadowRoot.querySelector(".cancel-btn")
        .addEventListener("click", this.canceling.bind(event, this.shadowRoot, this));
        
        this.render() ;
    }

    selecting(shadowRoot, domEl) {
        shadowRoot.querySelector(".selecting").style.display= "none";
        shadowRoot.querySelector(".canceling").style.display= "flex";
        domEl.selected= "true";
        domEl.dispatchEvent(new CustomEvent("select-item"))
    }

    canceling(shadowRoot, domEl) {
        shadowRoot.querySelector(".canceling").style.display= "none";
        shadowRoot.querySelector(".selecting").style.display= "flex";
        domEl.selected= "flase";
        domEl.dispatchEvent(new CustomEvent("deselect-item"))
    }

    render() {
        this.shadowRoot.querySelector(".card-image").style.width= this._width;
        this.shadowRoot.querySelector(".card-image").style.height= this._height;
        this.shadowRoot.querySelector(".card-pane").style.width= this._width;
        this.shadowRoot.querySelector(".card-image").src= this._imgSrc;
    }

    static get observedAttributes() {
        return [
            "selected",
            "width", 
            "height", 
            "img-src", 
            "id", 
            "item-link"
        ] ;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(name == "width")
           this._width= newVal;
        else if(name == "height")
            this._height= newVal;
        else if(name == "selected") {
            this._selected= newVal;
        }
        else if(name == "img-src")
            this._imgSrc= newVal;
        else if(name == "id")
            this._id= newVal;
        else if(name == "item-link")
            this._itemLink= newVal;

        this.render() ;
    }
}

window.customElements.define("item-selector", ItemSelector);

