import { definePatch } from "../modUtils.js"

export default definePatch(({ replaceRawCode }) => {
  // keep a rolling history of last 5 replays.
  // using replaceRawCode since minification removes a semi colon before the closing brace
  // so it does not match with replaceCode or insertCode
  replaceRawCode(
    `this.a5h=bC.a5u.a0a()}else{this.a5h=bC.qM.a5t}b1.z.a5v();bt.clear();this.a18=0;bi.a5w();`,
    `this.a5h=bC.a5u.a0a();__fx.replayHistory.save(this.a5h);}else{this.a5h=bC.qM.a5t}b1.z.a5v();bt.clear();this.a18=0;bi.a5w();`
  )
})