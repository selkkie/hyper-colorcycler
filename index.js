exports.decorateConfig = (config) => {

    const brightness = .1; //.1-1 range
    const textContrast = 4;
    
    const randomColor = require('randomcolor'); // import the script
    const Colors = require('simple-color-functions');
    const col = Brightness(brightness, randomColor());
    const opp = ContrastingColor(col);

    return Object.assign({}, config, {
        foregroundColor: opp,
        backgroundColor: col,
        cursorColor: opp,
        css: `
      ${config.css || ''}
      .tabs_nav .tabs_list .tab_text {
        color: ` + col + `;
      }
      .tabs_nav .tabs_title {
        color: ` + col + `;
      }

.hyper-main{
background-color:` + col + `!important;
}
.header_header{
background-color:` + col + `!important;
}
.terms_terms{
background-color:` + col + `!important;
}
.xterm .composition-view {
background-color:` + col + `!important;
}
    .xterm .xterm-viewport {
background-color:` + col + `!important;
}
    `
    });

    function Brightness(input, color) {
        var i = Math.abs(input - .5);
        return input > .5 ? Colors(color).brighten(i * 7).hex() : Colors(color).darken(i * 7).hex();
    }

    function ContrastingColor(bkg) {
        var light = Colors(bkg).brighten(textContrast).hex();
        var dark = Colors(bkg).darken(textContrast).hex();

        return Math.abs(Colors(bkg).luminance() - Colors(light).luminance()) > Math.abs(Colors(bkg).luminance() - Colors(dark).luminance()) ? light : dark;
    }
}
