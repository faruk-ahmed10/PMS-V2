export function PrintArea(targetDomId: string) {
    //const __td = document.getElementById(targetDomId);
    /*if (__td !== null) {
        const printContents = __td.innerHTML;
        if (printContents !== null) {
            let w = window.open();
            if (w !== null) {
                w.document.body.innerHTML = document.head.innerHTML + printContents
                w.print();
            }
        }
    }*/



    var css: string = `
 @media print{
  body * {
  display: none;
}

#${targetDomId} {   
  display: block;
}
}
    `,
        head: any = document.head || document.getElementsByTagName('head')[0],
        style: any = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

}