import { definePatch } from "../modUtils.js";

export default definePatch(({ replaceRawCode }) => {
    replaceRawCode(
        `s0.style.width=s0.style.maxWidth=uS===2?"10em":"9em";s0.style.height=s0.style.maxHeight="1.4em";s0.style.whiteSpace="nowrap";s0.style.overflow="hidden";s0.style.textOverflow="ellipsis";s0.style.font="inherit";s0.style.display="inline-block";bq.lJ.ub(qu)&&(s0.style.textDecoration="underline");`,
        `s0.style.width=s0.style.maxWidth=uS===2?"10em":"9em";s0.style.height=s0.style.maxHeight="1.4em";s0.style.whiteSpace="nowrap";s0.style.overflow="hidden";s0.style.textOverflow="ellipsis";s0.style.font="inherit";s0.style.display="inline-block";
        if (__fx.settings.highlightDuplicateIps) {
            var __fxDupColor = __fx.utils.getDuplicateIpHighlightColor(qu, bq.uT.uU);
            if (__fxDupColor) { s0.style.backgroundColor = __fxDupColor; s0.style.borderRadius = "0.3em"; }
        }
        bq.lJ.ub(qu)&&(s0.style.textDecoration="underline");`
    );
});
